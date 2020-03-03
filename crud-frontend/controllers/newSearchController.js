app.controller('NewSearchController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    var vm = $scope;
    init();
    //app.validateUser($location);

    function init() {
        vm.placesToSelect = ['Buenos Aires', 'La Pampa', 'Misiones', 'Santa Cruz', 'Jujuy', 'Cordoba'];
        vm.placesToCompare = [];
        vm.criterias = ['Precio', 'Ubicacion'];
    }

    vm.onPlaceDropdownClicked = function(placeSelected, index) {
        vm.placesToSelect.splice(index, 1);
        vm.placesToCompare.push(placeSelected);
    }

}]);