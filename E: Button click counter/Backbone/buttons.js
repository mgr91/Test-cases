(function($) {
	var Item = Backbone.Model.extend({
		defaults: {
			numClicks: 0
		},
		registerClick: function() {
			this.set({numClicks: this.get('numClicks') + 1});
		}
	});

	var ItemCollection = Backbone.Collection.extend({
		model: Item
	});

	var ItemView = Backbone.View.extend({
		tagName: "div",
		template: _.template($('#item-template').html()),

		initialize: function() {
			this.model.on('change', function() {this.render()}, this);
		},
		events: {
			"click .btnClick": "increaseCounter",
		},
		increaseCounter: function(e) {
			e.preventDefault();
			this.model.registerClick();
		},
		render: function() {
			var data = this.model.toJSON();
			$(this.el).html(this.template(data));
			return this;
		}
	});

	var AppView = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			$("#item-table").html('');
			this.collection.models.forEach(this.addItem);
			//this.collection.models.slice(0,10).forEach(this.addItem);
		},
		addItem: function(item) {
			var view = new ItemView({model: item});
			$("#item-table").append(view.render().el);
		}
	});

 	var NUM_ELEMENTS = 10000;
	var itemCollection = new ItemCollection;

	for (var i = 1; i <= NUM_ELEMENTS; i++) {
		itemCollection.add({numClicks: 0});
	};

	var app = new AppView({el: "#app-content", collection: itemCollection});
}(jQuery));