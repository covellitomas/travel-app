app.controller("LoginController", ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    var vm = $scope;

    vm.onLoginClicked = function() {

        const loginUsername = vm.loginUsername || undefined;
        const loginPassword = vm.loginPassword || undefined;

        UserService.getUser(loginUsername, loginPassword).then(function(user) {
            if (user) {
                app.userLogged = user;
                app.usrValid = true;
                $location.path('/user-choose-table/');
            }
            else
                app.usrValid = false;
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