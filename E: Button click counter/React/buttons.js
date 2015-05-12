var Element = React.createClass({displayName: "Element",
	getInitialState: function() {
		return {numClicks: 0};
	},
	render: function() {
		return React.createElement("button", {onClick: this.increaseCounter}, this.state.numClicks)
	},
	increaseCounter: function() {
		this.setState({numClicks: this.state.numClicks+1});
	}
});

var ElementList = React.createClass({displayName: "ElementList",
	render: function() {
		var elements = [];
		for (var i = 1; i <= NUM_ELEMENTS; i++) {
			elements.push(React.createElement("div", {key: "item"+i}, React.createElement(Element, null)));
		};

		return React.createElement("div", null, elements);
		//return React.createElement("div", null, 
		//	elements.slice(0,10)
		//)
	}
});

var NUM_ELEMENTS = 10000;

React.render(React.createElement(ElementList, null), document.getElementById("app-content"));