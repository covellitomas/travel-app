app.controller("LoadingController", ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    $scope.$on('load', () => $scope.loading = true);
    $scope.$on('unload', () => $scope.loading = false);

}]);