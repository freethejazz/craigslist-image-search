
/*
 * GET users listing.
 */
var s = require('../getResults'),
  Driver = s.SearchDriver;

exports.search = function(req, res){
  var query = new Driver();
    query.response = res;
  var reqq = req.query;
 
  if(reqq["idx"]){
    query.opts.startIdx = req.query["idx"];
    console.log(req.query["idx"]);
  }
  
  if(reqq["nocaps"]){
    query.opts.noCaps = true;
  }

  query.getSearchResults(req.query["query"]);
};
