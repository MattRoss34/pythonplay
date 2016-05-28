/**
 * After Hours afterhours-panels.js
 */

(function() {

	var app = angular.module('afterhours-panels', [])
	.directive('pagePanels', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/page-panels.html',
			controller:function() {
				this.name = 'profile';
				this.select = function(thePanel) {
					this.name = thePanel;
				};
				this.isSelected = function(thePanel) {
					return this.name === thePanel;
				};
			},
			controllerAs: 'panel'
		}
	})
	.directive('homePanel', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/home-panel.html'
		};
	})
	.directive('profilePanel', function() {
		return {
			restrict: 'E',
			templateUrl: 'profile-panel.html',
			controller:['$scope', '$http', '$log', function($scope, $http, $log){
				$log.log("key: "+apiKey);
				$http.get('https://afterhours.herokuapp.com/profile?apiKey='+apiKey)
					.success(function(data) {
						$log.log(data);
						$scope.profile = data;
					});
			}],
			controllerAs: 'profileCtrl'
		};
	});
})();

