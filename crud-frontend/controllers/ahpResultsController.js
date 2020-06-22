app.controller("AhpResultsController", ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    var vm = $scope;
    app.validateUser($location);
    init();

    function init() {
        vm.results = app.lastResults;
    }

}]);