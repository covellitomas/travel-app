app.controller('NewSearchController', ['$scope', '$location', 'PlaceService', 'CriteriaService' , function($scope, $location, PlaceService, CriteriaService) {

    var vm = $scope;
    const criterias = [
        { id: 'price', description: 'Precio', children: [
            {id: 'price', description: 'Precio por noche'},
            {id: 'paymentID', description: 'Cantidad de cuotas'}
        ] },
        { id: 'stars', description: 'Estrellas' },
        { id: 'amenities', description: 'Amenities', children: [
            {id: 'GIM', description: 'Gimnasio'},
            {id: 'PISCN', description: 'Piscina'},
            {id: 'AIR', description: 'Aire acondicionado'},
            {id: 'INGRAH', description: 'WiFi'}
        ] },
        { id: 'rating', description: 'Rating', children: [
            {id: 'review_count', description: 'Cantidad de comentarios'},
            {id: 'overall_rating', description: 'Rating general'}
        ] },
        { id: 'distance', description: 'Distancia al centro' }
    ];
    init();
    //app.validateUser($location);

    function init() {
        vm.placesToCompare = [];
        vm.criterias = criterias.map(criteria => criteria.description);

        PlaceService.getAllPlaces().then(places => {
            vm.placesToSelect = places.map(place => place.place);
        });


    }

    vm.onPlaceDropdownClicked = function(placeSelected, index) {
        vm.placesToSelect.splice(index, 1);
        vm.placesToCompare.push(placeSelected);
    }

}]);