var app = app || {};

$(function() {
  app.AppView = Backbone.View.extend({
    el: '#app-container',
    events: {
      'click .search-button': 'search',
      'keyup .search-text':'checkEnter'
    },
    initialize: function(){
      this.$el.html($('#app').html());

      this.searchButton = this.$('.search-button');
      this.searchText = this.$('.search-text');
      this.resultPanel = this.$('.results-panel');


      this.collection = new app.SearchCollection();
      this.listenTo(this.collection, 'search-completed', this.render);
    },
    render: function(){
      this.resultPanel.empty();
      this.collection.each(this.addResult, this);
    },
    addResult: function(result){
      var resView = new app.ResultView({model: result});
      this.resultPanel.append(resView.render().el);
    },
    checkEnter: function(ev){
      if( ev.keyCode === 13 ){
        this.$('.search-text').trigger('focus');
        this.search();
      }
    },
    search: function(){
      var q = encodeURI(this.searchText.val());
      this.collection.query = q;
      this.collection.search();
    }
  }); 
});
