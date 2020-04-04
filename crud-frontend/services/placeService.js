app.service('PlaceService', ['$http', function($http) {

    function savePlace(place) {
        return $http.post('http://localhost:3000/api/place', place, {}).then(function(response) {
            return response.data;
        });
    }

    function getAllPlacesNames() {
        return $http.get('http://localhost:3000/api/place/all').then(function(response) {
            return response.data;
        });
    }
     
    return {
        savePlace: savePlace,
        getAllPlacesNames: getAllPlacesNames
    }

}]);