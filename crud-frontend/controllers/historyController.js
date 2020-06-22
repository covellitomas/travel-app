app.controller("HistoryController", ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    var vm = $scope;
    app.validateUser($location);
    init();

    function init() {

        vm.searches = app.userLogged.searches;

        vm.criterias = vm.searches.map(
            (search) => search.criteria.map(criteria => criteria.name)
        );

        vm.places = vm.searches.map(
            (search) => search.places.map(place => place.name)
        );

        vm.convenience = vm.searches.map(
            (search) => search.convenience
        );

    }

}]);