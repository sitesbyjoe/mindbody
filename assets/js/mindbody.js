// our angular app setup
var mindBody = angular.module('mindBodyApp', []);

// our program factory
mindBody.factory('programFactory', function($http) {
	var factory = {};
	factory.getPrograms = function() {
		return $http.get('https://api.myjson.com/bins/5bdb3').then(function(result) {
			return result;
		});
	};
	return factory;
});

// prices factory
mindBody.factory('pricesFactory', function($http) {
	var factory = {};
	factory.getPrices = function() {
		return $http.get('https://api.myjson.com/bins/17oy7').then(function(result) {
			return result;
		});
	};
	return factory;
});

// our controller
mindBody.controller('mindBody', function($scope, programFactory, pricesFactory) {
	
	$scope.programs = [];
	$scope.allPrograms = [];
	$scope.prices = [];
	
	// this gets our programs
	$scope.getPrograms = function() {
		
		pricesFactory.getPrices().then(function(prices) {
		
			$scope.prices = prices.data;
			
			programFactory.getPrograms().then(function(programs) {
				
				$scope.allPrograms = programs.data;
				
				// add the first 3 to the cards
				for (var i = 0; i < 3; i++) {
					$scope.programs.push($scope.allPrograms[i]);
					$scope.programs[i].prices = [];
				}
				
				// add the prices to the programs
				for (var j=0; j<$scope.prices.length; j++) {
					for (i = 0; i < $scope.programs.length; i++) {
						if ($scope.programs[i].ProgramID == $scope.prices[j].ProgramID) {
							$scope.programs[i].prices.push($scope.prices[j]);
						}
					}
				}
				
			});
		});
	};
	
	// getting our avg. monthly sales
	$scope.getAverageMonthlySales = function(value) {
		return parseFloat(value / 12).toFixed(2);
	};
	
	// update the image path based on our price item
	$scope.getSparklineImage = function(int) {
			var path = 'assets/images/sparkline-' + int + '.png';
			return path;
	};

	// initialization
	$scope.init = function() {
		$scope.getPrograms();
	};

	// initialize the app!!!
	$scope.init();

});