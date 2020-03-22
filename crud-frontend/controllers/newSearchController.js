app.controller('NewSearchController', ['$scope', '$window', 'PlaceService', 'CriteriaService' , function($scope, $window, PlaceService, CriteriaService) {

    var vm = $scope;
    init();
    //app.validateUser($location);

    function init() {
        vm.placesToCompare = [];
    }

    vm.onAddNewPlaceClicked = function() {
        vm.$emit('load');
        if (vm.hotelsUrl) {
            PlaceService.getPlaceName(vm.hotelsUrl).then(place => {
                vm.placesToCompare.push(place.name);
                vm.$emit('unload');
            });
        }
    }

}]);