
var http = require('http');


function SearchDriver(){
  this.opts = {
    city: 'chicago',
    category: 'fua',
    sort: 'date',
    startIdx: 0
  };
}

SearchDriver.prototype.makePath = function(){
  var path = '/search/';

  path += (this.opts.category || 'sss') + '?';
  path += 'sort=' + this.opts.sort + '&';
  path += 'hasPic=1&';
  path += 's=' + this.opts.startIdx + '&';
  path += 'query=' + this.query;

  console.log(path);
  return path;
};

SearchDriver.prototype.getSearchResults = function(q){
  this.query = q;
  var httpOpts = {
    host: this.opts.city + '.craigslist.org',
    port: 80,
    type: 'GET'
  },
  self = this;

  httpOpts.path = this.makePath();

  http.get(httpOpts, function(res){
    var pageData = "";
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      pageData += chunk;
    });
    res.on('end', function(){
      self.processResultsPage(pageData);
    });
  });
}

SearchDriver.prototype.processResultsPage = function(data){
  var singleResults, retObj = {results: []}, i, ii;
  var totalResults = data.match('Found:(.*)Display');
  retObj.totalResults = totalResults && totalResults[1].trim() || 0;
  singleResults = data.match(/\<p(.*?)p\>/g);

  if(singleResults){
    for(i = 0, ii = singleResults.length; i < ii; i++){
      var resultObj = this.makeResultsObj(singleResults[i]);

      if(this.checkUpperCase(resultObj.title)){
        continue;
      }

      retObj.results.push(resultObj);
    }
  }

  this.response && this.response.send(retObj);
}

SearchDriver.prototype.makeResultsObj = function(one){

  var obj = {}, imgUrl, postUrl, title, price, date;

  if( imgUrl = one.match(/data-id=\"(.*?)\"/) ){
    obj.imgUrl = "http://images.craigslist.org/"+imgUrl[1];
    obj.imgThumb = "http://images.craigslist.org/thumb/"+imgUrl[1];
  }

  if( postUrl = one.match(/\<a href=\"(.*?)\"\>/)){
    obj.postUrl = postUrl[1];
  }

  if( title = one.match(/\<span class=\"pl\">.*?\<a href=\".*?\"\>(.*?)\<\/a\>/)){
    obj.title = title[1];
  }

  if( price = one.match(/\<span class=\"itemprice\"\>(.*?)\<\/span\>/)){
    obj.price = price[1];
  }

  if( date = one.match(/\<span class=\"itemdate\"\>(.*?)\<\/span\>/)){
    obj.date = date[1];
  }

  return obj;
}
SearchDriver.prototype.checkUpperCase = function(str){
  if(!str) return;

  var strLen = str.length,
    idx = 0,
    capsFound = 0;

  for(;idx < strLen; idx++){
    str.charCodeAt(idx) >= 61 && str.charCodeAt(idx) <= 90 && capsFound++
    if(capsFound/strLen > .3) return true;
  }
  return false;
}

exports.SearchDriver = SearchDriver;
