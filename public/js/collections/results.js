var app = app || {};

$(function(){
  app.SearchCollection = Backbone.Collection.extend({
    model: app.ResultModel,
    city: 'chicago',
    startIdx: 0,
    category: 'fua',
    categoryName: 'furniture',
    filterAllCaps: true,
    query:'',
    search: function(){
      var url = this.buildUrl();
      $.getJSON(url, function(data){
          if(data.results && data.results.length){
            var allModels = data.results.map(function(result){
              return new app.ResultModel(result);
            });
            this.reset(allModels);
          }
          this.trigger('search-completed');
        }.bind(this));
    },
    buildUrl: function(){
      var str = '/search?';
      if( this.filterAllCaps ) {
        str += 'nocaps=true&';
      }
      str += 'query='+encodeURI(this.query);

      return str;
    }
  });
});
