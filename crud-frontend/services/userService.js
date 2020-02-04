app.service('UserService', ['$http', function($http) {

    function getUsers() {

        return $http({
            url: 'http://localhost:3000/api/user',
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            return response.data;
        });

    }

    function getUser(name, password) {

        const url = '/user/' + name + '/' + password;

        return $http({
            url: 'http://localhost:3000/api' + url,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            return response.data;
        });

    }

    function saveUser(name, password) {

        return $http({
            url: 'http://localhost:3000/api/user/save',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {name: name, pw: password}
        }).then(function(response) {
            return response.data;
        });

    }

    function getUserGamesHistory(name, password) {

        const url = '/history/' + name + '/' + password;

        return $http({
            url: 'http://localhost:3000/api' + url,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            return response.data;
        });
    }

    function saveGameHistory(name, password, gameHistory) {

        const url = '/add/game/' + name + '/' + password;

        return $http({
            url: 'http://localhost:3000/api' + url,
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            data: {history: gameHistory}
        }).then(function(response) {
            return response.data;
        });

    }
     
    return {
        getUsers: getUsers,
        getUser: getUser,
        saveUser: saveUser,
        getUserGamesHistory: getUserGamesHistory,
        saveGameHistory: saveGameHistory
    }

}]);