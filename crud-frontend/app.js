var app = angular.module("GameApp", ['ngRoute']);

app.config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: './views/login.html',
        controller: 'LoginController'
    }).when('/user-dashboard', {
        templateUrl: './views/dashboard.html',
        controller: 'DashboardController'
    }).when('/user-choose-table', {
        templateUrl: './views/user-choose-table.html',
        controller: 'UserChooseTableController'
    }).otherwise({
        templateUrl: './views/404.html'
    });
    
});