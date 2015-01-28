(function(angular){
	angular.module('firebaseApp')
		.controller('RegisterCtrl', ['$scope', '$firebaseSimpleLogin', 'FBURL', '$window', function ($scope, $firebaseSimpleLogin, FBURL, $window) {
			var fbRef = new Firebase(FBURL);
			$scope.errors = [];
			$scope.simpleLogin = $firebaseSimpleLogin(fbRef);
            $scope.registerUser = {
                email:'',
                password:'',
                confirmPassword: ''
            };

			$scope.register = function(){
			    var errors = [],
			        user = $scope.registerUser; ;
			    if(user.email === ''){
			        errors.push("Please enter an email")
			    }

                if(user.password === ''){
			        errors.push("Password must be not be blank")
			    }
			    else if(user.password !== user.confirmPassword){
			        errors.push("Passwords must match")
			    }

                if(errors.length > 0){
			        $scope.errors = errors;
			        return;
                }

				var promise = $scope.simpleLogin.$createUser($scope.registerUser.email, $scope.registerUser.password);

				promise.then(function(user){
				    console.log(user);
				    window.location.href = '/#/home';
				}, function(error){
				    console.log(error);
				    if(error.code === 'EMAIL_TAKEN'){
				    	$scope.errors.push("The email is in use, try with a new one");
				    }
				})
			};

		}])
}(window.angular))