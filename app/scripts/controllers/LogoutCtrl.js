(function(angular){
	angular.module('firebaseApp')
		.controller('LogoutCtrl', ['$scope', '$firebaseSimpleLogin', 'FBURL', '$window', function ($scope, $firebaseSimpleLogin, FBURL, $window) {
			var fbRef = new Firebase(FBURL);
			$scope.simpleLogin = $firebaseSimpleLogin(fbRef);
			$scope.simpleLogin.$logout();
			$window.location.href = '#/';
		}])
}(window.angular))