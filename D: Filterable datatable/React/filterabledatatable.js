var Element = React.createClass({displayName: "Element",
	render: function() {
		return React.createElement("div", {key: this.props.key}, this.props.id, " | ", this.props.value, " | ", this.props.name)
	}
});

var ElementList = React.createClass({displayName: "ElementList",
	getInitialState: function() {
		return {
			searchQuery: ""
		};
	},
	render: function() {
		var elementsData = this.props.elementsData;
		var searchQuery = this.state.searchQuery.trim().toLowerCase();

		elementsData = elementsData.filter(function(element) {
			return element.name.toLowerCase().match(searchQuery) || (element.value+"").match(searchQuery) ||( element.id+"").match(searchQuery);
		})

		var elements = [];
		elementsData.forEach(function(element) {
			elements.push(React.createElement(Element, {key: "object"+element.id, value: element.value, id: element.id, name: element.name}));
		});

		return React.createElement("div", null, 
			React.createElement("input", {type: "text", value: this.state.searchQuery, onChange: this.handleChange, placeholder: "Type here"}), 
			elements
		)
	},
	handleChange: function(e){
        this.setState({searchQuery: e.target.value});
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

elementsData=[];
		for (var i = 1; i <= NUM_ELEMENTS; i++) {
			(function(id) {
				var randomValue = Math.floor((Math.random()*NUM_ELEMENTS));
				var randomText = makeid();
				elementsData[i-1] = {id: id, value: randomValue, name: randomText};
			})(i);
		};
React.render(React.createElement(ElementList, {elementsData: elementsData}), document.getElementById("app-content"));