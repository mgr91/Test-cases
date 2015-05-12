(function($) {
	var Item = Backbone.Model.extend({
	});

	var ItemCollection = Backbone.Collection.extend({
		model: Item,
		comparator: "value",
		initialize: function() {
			this.on('change:value', function() { this.sort() }, this);
			this.on('reset', function() { this.sort() }, this);

		},
		changeData: function() {
			var dataitems = [];
			for (var i = 0; i <= NUM_ELEMENTS; i++) {
		    	var randomValue = -Math.floor(Math.random()*1000);
				dataitems[i] = {id: i+1, name: makeid(), value: randomValue};
			};
			this.reset(dataitems);
		},
		changeRandomData: function() {
			var randomIndex = Math.floor(Math.random()*this.size());
			var randomIndex	= Math.floor(Math.random()*NUM_ELEMENTS) % NUM_ELEMENTS;
		    var randomValue = -Math.floor(Math.random()*1000);
			this.at(randomIndex).set({value:  randomValue, name: makeid()});
		}
	});

	var ItemView = Backbone.View.extend({
		tagName: "div",
		template: _.template($('#item-template').html()),

		initialize: function() {
		},
		render: function() {
			var data = this.model.toJSON();
			$(this.el).html(this.template(data));
			return this;
		}
	})

	var AppView = Backbone.View.extend({
		el: $("#app-content"),

		events: {
			"click .btnChangeDataItems": "changeData",
			"click .btnChangeRandomDataItem": "changeRandomData"
		},
		initialize: function() {
			this.collection.bind('sort', this.render, this);
			this.collection.sort();

		},
		render: function() {
			$("#item-table").html('');
			this.collection.each(this.addItem);
		},

		changeData: function(e) {
			e.preventDefault();
			this.collection.changeData();
		},
		changeRandomData: function(e) {
			e.preventDefault();
			this.collection.changeRandomData();
		},
		addItem: function(item) {
			var view = new ItemView({model: item});
			$("#item-table").append(view.render().el);
		}
	});
	
	function makeid() {
	    var text = "";
	    var possible = "abcdefghijklmnopqrstuvwxyz";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	};

 	var NUM_ELEMENTS = 1000;
 	var itemCollection = new ItemCollection;
 	for (var i = 1; i <= NUM_ELEMENTS; i++) {
		itemCollection.add({id: i, name: makeid(), value: 0});
	};
	var app = new AppView({collection: itemCollection});
}(jQuery));