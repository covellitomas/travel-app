app.service('CriteriaService', ['$http', function($http) {

    function saveCriteria(newCriteria) {
        return $http.post('http://localhost:3000/api/criteria', newCriteria, {}).then(function(response) {
            return response.data;
        });
    }

    function getAllCriterias() {
        return $http.get('http://localhost:3000/api/criteria/all').then(function(response) {
            return response.data;
        });
    }
     
    return {
        saveCriteria: saveCriteria,
        getAllCriterias: getAllCriterias
    }

}]);