app.service('CriteriaService', ['$http', function($http) {

    function getAllCriterias() {

        return $http({
            url: 'http://localhost:3000/api/criteria/all',
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            return response.data;
        });

    }
     
    return {
        getAllCriterias: getAllCriterias
    }

}]);