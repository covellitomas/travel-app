app.service('PlaceService', ['$http', function($http) {

    function getPlaceName(url) {

        const config = {
            params: {
                url: url
            }
        }

        return $http.get('http://localhost:3000/api/place/name', config).then(function(response) {
            return response.data;
        });

    }
     
    return {
        getPlaceName: getPlaceName
    }

}]);