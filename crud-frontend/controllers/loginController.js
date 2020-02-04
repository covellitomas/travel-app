app.controller("LoginController", ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    var vm = $scope;
    init();

    function init() {
        vm.userLogged = [];
    }

    vm.onLoginClicked = function() {

        const loginUsername = vm.loginUsername || undefined;
        const loginPassword = vm.loginPassword || undefined;

        UserService.getUser(loginUsername, loginPassword).then(function(user) {
            vm.userLogged = user;
            console.log(user);
        });
    }

    vm.onRegisterClicked = function() {

        const registerUsername = vm.registerUsername || undefined;
        const registerPassword = vm.registerPassword || undefined;

        if (registerUsername && registerPassword) {

            UserService.getUser(registerUsername, registerPassword).then(function(user) {
                if (!user) {
                    UserService.saveUser(registerUsername, registerPassword).then(function(newUser) {
                        console.log(newUser);
                    });
                } else {
                    console.log('El usuario ya existe.');
                }
            });

        }

    }

}]);