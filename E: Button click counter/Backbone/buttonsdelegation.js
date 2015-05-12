(function($) {
	var Item = Backbone.Model.extend({});

	var ItemCollection = Backbone.Collection.extend({
		model: Item
	});

	var ItemView = Backbone.View.extend({
		tagName: "div",
		template: _.template($('#item-template').html()),

		initialize: function() {
			this.model.on('change', function() {this.render()}, this);
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
		events: {
			"click .btnClick" : "increaseCounter"
		},
		increaseCounter: function(e) {
			e.preventDefault();
			var id = $(e.currentTarget)[0].id.slice(5);
			var item = this.collection.get(id);
			item.set({numClicks: item.get('numClicks') + 1});

		},
		render: function() {
			$("#item-table").html('');
			console.log("render");
			this.collection.each(this.addItem);
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
		itemCollection.add({id: i, numClicks: 0});
	};

	var app = new AppView({el: "#app-content", collection: itemCollection});
}(jQuery));