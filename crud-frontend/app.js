var app = angular.module("GameApp", ['ngRoute']);

app.userLogged = undefined;

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
    }).when('/new-search', {
        templateUrl: './views/new-search.html',
        controller: 'NewSearchController'
    }).otherwise({
        templateUrl: './views/404.html'
    });
    
});

app.validateUser = function($location) {
    if (!app.userLogged) {
        $location.path('/');
    }
}

app.loading = true;