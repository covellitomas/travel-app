app.service('AhpService', ['$http', function($http) {

    function getHotelCriterias(url) {

        const config = {
            params: {
                hotelUrl: url
            }
        };
        return $http.get('http://localhost:3000/api/ahp/hotel-criterias', config).then((response) => response.data);

    }

    function getAttractionsCriterias(url) {

        const config = {
            params: {
                attractionsUrl: url
            }
        }
        return $http.get('http://localhost:3000/api/ahp/attractions-criterias', config).then((response) => response.data);

    }

    function runAlgorithm(settings) {
        const config = {
            data: settings
        };
        return $http.post('http://localhost:3000/api/ahp/run', config).then((response) => response.data);
    }
     
    return {
        getHotelCriterias: getHotelCriterias,
        getAttractionsCriterias: getAttractionsCriterias,
        runAlgorithm: runAlgorithm
    }

}]);