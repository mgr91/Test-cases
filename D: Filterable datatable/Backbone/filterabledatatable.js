(function($) {
	var Item = Backbone.Model.extend({
		initialize: function() {
		}
	});

	var ItemCollection = Backbone.Collection.extend({
		model: Item,
		comparator: "id",
		filterByQuery: function(query) {
			 var filtered = this.filter(function(element) {
				return element.get('name').toLowerCase().match(query) || (element.get('value')+"").match(query) ||( element.get('id')+"").match(query);
     		 });
    		return new ItemCollection(filtered);
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

	var SearchModel = Backbone.Model.extend({
		defaults: {
			searchQuery: ''
		}
	});

	var AppView = Backbone.View.extend({
		initialize: function() {
			this.model.bind("change", this.render, this);
			this.render();
		},
		render: function() {
			$("#item-table").html('');
			var query = this.model.get('searchQuery').trim() || "";
			if(query !== "") {
				var filtered = this.collection.filterByQuery(query);
				filtered.each(this.addItem);
			} else {
				this.collection.each(this.addItem);
			}
		},
		addItem: function(item) {
			var view = new ItemView({model: item});
			$("#item-table").append(view.render().el);
		}
	});

	var InputView = Backbone.View.extend({
		events: {
			"keyup input[name='searchQuery']": 'filterDataTable'
		},
		filterDataTable: function(e) {
			this.model.set('searchQuery', e.currentTarget.value.trim());
		},
	});

	function makeid() {
	    var text = "";
	    var possible = "abcdefghijklmnopqrstuvwxyz";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	};

 	var NUM_ELEMENTS = 1000;

	var searchModel = new SearchModel;
	var itemCollection = new ItemCollection;

	for (var i = 1; i <= NUM_ELEMENTS; i++) {
		var randomValue = Math.floor(Math.random()*1000);
		itemCollection.add({id: i, name: makeid(), value: randomValue});
	};

 	var inputView = new InputView({el: 'form', model: searchModel});
	var app = new AppView({el: "#app-content", model: searchModel, collection: itemCollection});
}(jQuery));