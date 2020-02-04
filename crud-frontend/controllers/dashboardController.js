app.controller("DashboardController", ['$scope', '$location', '$routeParams', 'UserService', function($scope, $location, $routeParams, UserService) {

    var vm = $scope;
    init();

    function init() {

        vm.searchHistory = [];
        vm.searchHistory.push({
            places: ['arg','bol','par'],
            criteria: ['cash', 'stars', 'air'],
            convenience: ['arg', 'par', 'bol']
        });
          
    }

}]);