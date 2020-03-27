var express = require('express');
var router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const AHP = require('ahp');

const hotelsURL = "https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaAyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AqmblfMFwAIB&sid=335822906070625de1e89bdedfedd6e5&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaAyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AqmblfMFwAIB%3Bsid%3D335822906070625de1e89bdedfedd6e5%3Bsb_price_type%3Dtotal%26%3B&ss=Miami+Beach&is_ski_area=0&ssne=Miami+Beach&ssne_untouched=Miami+Beach&dest_id=20023182&dest_type=city&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1#map_opened-map-header-cta";
const attractionsURL = "https://www.tripadvisor.com/Attractions-g34439-Activities-Miami_Beach_Florida.html";

const rankCriteria =
    [
        ['3 stars', 'Hilton Hotels & Resorts', 1/5],
        ['3 stars', 'Tours', 1/5],
        ['3 stars', 'Nightlife', 1/3],
        ['Hilton Hotels & Resorts', 'Tours', 1/9],
        ['Hilton Hotels & Resorts', 'Nightlife', 1],
        ['Tours', 'Nightlife', 5]
    ]
;


function _getValidCriteriaName(criteriaName) {
    if (criteriaName !== 'Landmarks' && criteriaName !== 'Neighborhood') {
        if (criteriaName.includes('Distance from center')) {
            return 'Distance from center';
        };
        return criteriaName;
    }
};

/**
 * Para calcular el peso de las diferentes alternativas se calcula a traves de una tecnica de porcentajes.
 *      - Si los valores son iguales -> 1 en cada casilla.
 *      - Si el porcentaje de val2 respecto a val1 es entre 75 y 100 -> 1/3 en val2, y 3 en val1.
 *      - Si el porcentaje de val2 respecto a val1 es entre 50 y 75 -> 1/5 en val2, y 5 en val1.
 *      - Si el porcentaje de val2 respecto a val1 es entre 25 y 50 -> 1/7 en val2, y 7 en val1.
 *      - Si el porcentaje de val2 respecto a val1 es entre 0 y 25 -> 1/9 en val2, y 9 en val1.
 * Si quiereCalor es true, el peso retornado equivale a val1 y el inverso a val2. Sino, el caso contrario.
 * criterio nos indica con que criterio estamos trabajando.
 */
function _getPeso(val1, val2) {

    if (val1 == val2)
        return 1;

    // Calculo una regla de 3 simple.
    const porcentajeVal2RespectoVal1 = (val1>val2) ? (100*val2/val1) : (100*val1/val2);
    let result = 0;

    if (porcentajeVal2RespectoVal1 >= 0 && porcentajeVal2RespectoVal1 < 25) {
        result = 9;
    } else if (porcentajeVal2RespectoVal1 >= 25 && porcentajeVal2RespectoVal1 < 50) {
        result = 7;
    } else if (porcentajeVal2RespectoVal1 >= 50 && porcentajeVal2RespectoVal1 < 75) {
        result = 5;
    } else {
        result = 3;
    }
    
    return val1 > val2 ? result : (1/result);
}

router.get('/hotel-criterias', function (req, res, next) {
    const hotelCriterias = [];

    axios.get(req.query.hotelUrl).then(siteHtml => {
        const $ = cheerio.load(siteHtml.data);

        const allFilters = $('.filterbox');

        allFilters.each((index, filterBox) => {

            const criteria = _getValidCriteriaName($(filterBox).find('.filtercategory-title').text().replace(/\r?\n|\r/g, ''));

            if (criteria) {
                const newCriteria = {
                    name: criteria,
                    children: [],
                    count: 0
                };

                const categories = $(filterBox).find('.filteroptions .filter_item');

                categories.each((index, category) => {
                    const categoryText = $(category).find('.filter_label').text().replace(/\r?\n|\r/g, '');
                    const categoryCount = $(category).find('.filter_count').text().replace(/\r?\n|\r/g, '');
                    newCriteria.count += categoryCount;
                    newCriteria.children.push({
                        name: categoryText,
                        count: categoryCount
                    });
                });

                hotelCriterias.push(newCriteria);
            }   
        });

        const placeName = $('#ss').attr('value');

        res.json({
            name: placeName,
            criterias: hotelCriterias
        });
    });
    
});

router.get('/attractions-criterias', function (req, res, next) {

    const attractions = [];

    axios.get(req.query.attractionsUrl).then(siteHtml => {
        const $ = cheerio.load(siteHtml.data);

        const allAttractions = $('._1HD-0hcQ').first().find('span');
        
        allAttractions.each((index, attraction) => {
            const nameAndCount = $(attraction).text().replace(')', '').split(' (');
            if (nameAndCount[1]) {
                attractions.push({
                    name: nameAndCount[0],
                    count: parseInt(nameAndCount[1].replace(',', ''))
                });
            }
        });
        res.json(attractions);

    });
});

router.post('/run', function (req, res, next) {

    const ahpContext = new AHP();
    const places = req.body.data.places;
    const criterias = req.body.data.criterias;

    const placesNames = places.map(place => place.name);
    console.log('Places: ', placesNames);
    ahpContext.addItems(placesNames);

    const criteriasNames = criterias.map(criteria => criteria.name);
    console.log('Criterias: ', criteriasNames);
    ahpContext.addCriteria(criteriasNames);

    criterias.forEach(criteria => {

        const matrix = [];
        
        places.forEach((place, i) => {
            
            const placeCriteria = place.criterias.find(placeCriteria => placeCriteria.name === criteria);
            const count = placeCriteria ? placeCriteria.count : 0;
            
            for (let index = i+1; index < places.length; index++) {
                const otherPlace = places[index];

                const otherPlaceSameCriteria = otherPlace.criterias.find(placeCriteria => placeCriteria.name === criteria);
                const otherPlaceCount = otherPlaceSameCriteria ? otherPlaceSameCriteria.count : 0;
                
                const peso = _getPeso(count, otherPlaceCount);

                matrix.push([place.place, otherPlace.place, peso]);              
            }

        });

        ahpContext.rankCriteriaItem(criteria, matrix);
        console.log(matrix);

    });

    ahpContext.rankCriteria(rankCriteria);

    let output = ahpContext.run();
    res.json(output.rankedScoreMap);
    
});

router.get('/picture', function (req, res, next) {

    axios.get(attractionsURL).then(siteHtml => {
        const $ = cheerio.load(siteHtml.data);

        const picture = $('.attractions-attraction-overview-pois-PoiPicture__big_card_picture--jLqHX picture').first();
        const img = picture.html().match(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/g);
        
        if (img && img.length) {
            res.json({img: img[0]});
        }
        res.json({img: []});
    });
    
});

module.exports = router;