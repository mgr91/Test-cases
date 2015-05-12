var listElementsApp = angular.module('listElementsApp', []);
var NUM_ELEMENTS = 1000;

var makeid = function() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

var elementsData=[];
for (var i = 1; i <= NUM_ELEMENTS; i++) {
	(function(id) {
		var randomText = makeid();
		elementsData[i-1] = {id: id, value: 0, name: randomText};
	})(i);
};

listElementsApp.controller('ListElementsCtrl', function($scope) {
	$scope.elements = elementsData;

	$scope.changeDataItems = function() {
		var itemdata=[];
		for (var i = 1; i <= NUM_ELEMENTS; i++) {
			(function(id) {
				var randomValue = Math.floor(Math.random()*1000);
				var randomText = makeid();
				itemdata[i-1] = {id: id, value: -randomValue, name: randomText};
			})(i);
		};
	   	$scope.elements = itemdata;
	};

	$scope.changeRandomDataItem = function() {
		var randomIndex	= Math.floor(Math.random()*NUM_ELEMENTS) % NUM_ELEMENTS;
    	var randomValue = Math.floor(Math.random()*1000);
   	 	$scope.elements[randomIndex].value = -randomValue;
   	 	$scope.elements[randomIndex].name = makeid();
	};
});
