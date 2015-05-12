/** @jsx React.DOM */
var Element = React.createClass({displayName: "Element",
	render: function() {
		return React.createElement("div", null, this.props.id, " | ", this.props.value, " | ", this.props.name)
	}
});

var ElementList = React.createClass({displayName: "ElementList",
	render: function() {
		this.props.elementsData.sort(function(a, b) {
			if((b.value) - (a.value) === 0) 
				return a.id - b.id;
			else 
				return (a.value) - (b.value);
		});

		var elements = [];
		this.props.elementsData.slice(0, 10).forEach(function(element) {
			elements.push(React.createElement("div", {key: "object"+element.id}, React.createElement(Element, {value: element.value, id: element.id, name: element.name})));
		});

		return React.createElement("div", null, elements);
	}
});

var NUM_ELEMENTS = 1000;

function makeid() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

elementsDataTable=[];
for (var i = 1; i <= NUM_ELEMENTS; i++) {
	(function(id) {
		var randomText = makeid();
		elementsDataTable[i-1] = {id: id, value: 0, name: randomText};
	})(i);
};

var App = React.createClass({displayName: "App",
	getInitialState: function() {
		return {elementsData: elementsDataTable};
	},
	render: function() {
		return React.createElement("div", null, 
			React.createElement("button", {onClick: this.changeDataItems}, "Change all items"), 
			React.createElement("button", {onClick: this.changeRandomDataItem}, "Change one random item"), 
			React.createElement(ElementList, {elementsData: this.state.elementsData})
		)
	},
	changeDataItems: function() {
		dataitems=[];
		for (var i = 1; i <= NUM_ELEMENTS; i++) {
			(function(id) {
				var randomText = makeid();
				var randomValue = Math.floor(Math.random()*1000);

				dataitems[i-1] = {id: id, value: randomValue, name: randomText};
			})(i);
		};
		this.setState({elementsData: dataitems});
	},
	changeRandomDataItem: function() {
		var data = this.state.elementsData;
    	var randomIndex	= Math.floor(Math.random()*NUM_ELEMENTS) % NUM_ELEMENTS;
    	var randomValue = Math.floor(Math.random()*1000);

		data[randomIndex].value = randomValue;
    	data[randomIndex].name = makeid();
   	 	this.setState({elementsData: data});
	}
});

React.render(React.createElement(App, null), document.getElementById("app-content"));