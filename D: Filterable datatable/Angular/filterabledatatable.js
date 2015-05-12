var listElementsApp = angular.module('listElementsApp', []);

listElementsApp.filter('filterBy', function() {
  return function(arr, searchQuery){
		if(!searchQuery){
			return arr;
		}
		var result = [];

		searchQuery = searchQuery.toLowerCase();

		var elementsData = arr.filter(function(element) {
			return element.name.toLowerCase().match(searchQuery) || (element.value+"").match(searchQuery) ||( element.id+"").match(searchQuery);
		})

		return elementsData;
	};

});

var NUM_ELEMENTS = 1000;

var makeid = function() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

var elementsData=[];
for (var i = 1; i <= NUM_ELEMENTS; i++) {
	(function(id) {
		var randomValue = Math.floor(Math.random()*NUM_ELEMENTS);
		var randomText = makeid();
		elementsData[i-1] = {id: id, value: randomValue, name: randomText};
	})(i);
};

listElementsApp.controller('ListElementsCtrl', function($scope) {
	$scope.sortBy = "id";

	$scope.elements = elementsData;
});