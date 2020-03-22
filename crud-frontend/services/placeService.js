app.service('PlaceService', ['$http', function($http) {

    function getAllPlaces() {

        return $http({
            url: 'http://localhost:3000/api/place/all',
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            return response.data;
        });

    }
     
    return {
        getAllPlaces: getAllPlaces
    }

}]);