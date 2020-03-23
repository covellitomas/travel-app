app.controller("LoadingController", ['$scope', function($scope) {

    $scope.$on('load', () => $scope.loading = true);
    $scope.$on('unload', () => $scope.loading = false);

}]);