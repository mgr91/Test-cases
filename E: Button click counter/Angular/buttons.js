var listElementsApp = angular.module('listElementsApp', []);

listElementsApp.filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
});

var NUM_ELEMENTS = 10000;

var elementsData=[];
for (var i = 0; i < NUM_ELEMENTS; i++) {
	(function(id) {
		elementsData[i] = {id: id, numClicks: 0};
	})(i);
};

listElementsApp.controller('ListElementsCtrl', function($scope) {
	$scope.elements = elementsData;

	$scope.increaseCounter = function(element) {
		$scope.elements[element.id].numClicks = element.numClicks+1;
	};
});