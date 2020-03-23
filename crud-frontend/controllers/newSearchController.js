app.controller('NewSearchController', ['$scope', 'PlaceService', 'AhpService', function($scope, PlaceService, AhpService) {

    var vm = $scope;
    init();
    //app.validateUser($location);

    function init() {
        vm.placesToCompare = [];
        vm.criterias = [];
    }

    vm.onAddNewPlaceClicked = function() {
        vm.$emit('load');
        if (vm.hotelsUrl) {
            AhpService.getHotelCriterias(vm.hotelsUrl).then(place => {
                AhpService.getAttractionsCriterias(vm.attractionsUrl).then(attractionsCriterias => {
                    place.criterias = place.criterias.concat(attractionsCriterias);
                    vm.placesToCompare.push(place);

                    place.criterias.forEach(criteria => {
                        if (!vm.criterias.some(c => c.name === criteria.name)) {
                            vm.criterias.push(criteria);
                        }
                    });

                    vm.$emit('unload');
                });
            });
        }
    }

    vm.onDeleteCriteriaClicked = function(index) {
        vm.criterias.splice(index, 1);
    }

}]);