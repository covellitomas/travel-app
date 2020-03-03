app.controller("UserChooseTableController", ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    var vm = $scope;
    app.validateUser($location);

    vm.onNewSearchClicked = function() {

        const prueba = 0;
    }

}]);