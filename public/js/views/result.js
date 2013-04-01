var app = app || {};

$(function(){
  app.ResultView = Backbone.View.extend({
    className: 'result',
    template: Handlebars.compile($('#result').html()),
    events: {
      'mouseover':'showDetails',
      'mouseout':'hideDetails'
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      this.detailEl = this.$('.result-detail');

      
      return this;
    },
    showDetails: function(){
      this.$el.addClass('hovering');
    },
    hideDetails: function(){
      this.$el.removeClass('hovering');
    }
  });
});
