
var m;
(function () {
    var ModuloveFactory = modulove.Modulove;
    var itemData = [
        [1, 1],
        [1, 1],
        [3, 3, 1, 1],
        [3, 2],
        [2, 2],
        [3, 2],
        [1, 1],
        [1, 1]
    ];
    var items = itemData.map(function (item) {
        return new grids.SimpleLocation([item[0], item[1], item[2], item[3]]);
    });
    var settings = {
        width: 200,
        step: 20
    };
    m = new ModuloveFactory(settings, items);
}());


$(function () {
    var AppView = Backbone.View.extend({

        el: $("#todoapp"),

        //statsTemplate: _.template($('#stats-template').html()),

        events: {
        },

        initialize: function () {

            var boxlist = m.getLocations();
            console.log(boxlist);

            //this.listenTo(Todos, 'add', this.addOne);
            //this.listenTo(Todos, 'reset', this.addAll);
            //this.listenTo(Todos, 'all', this.render);
            //
            //this.footer = this.$('footer');
            //this.main = $('#main');
            //
            //Todos.fetch();
        },
        render: function () {

        }
    });

    var App = new AppView;

});

