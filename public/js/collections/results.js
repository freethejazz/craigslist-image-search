var app = app || {};

$(function(){
  app.SearchCollection = Backbone.Collection.extend({
    model: app.ResultModel,
    city: 'chicago',
    startIdx: 0,
    category: 'fua',
    query:'',
    search: function(){
      $.getJSON('/search?query='+encodeURI(this.query), function(data){
          if(data.results && data.results.length){
            var allModels = data.results.map(function(result){
              return new app.ResultModel(result);
            });
            this.reset(allModels);
          }
          this.trigger('search-completed');
        }.bind(this));
    }
  });
});
