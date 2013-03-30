
/*
 * GET users listing.
 */
var s = require('../getResults'),
  Driver = s.SearchDriver;

exports.search = function(req, res){
  var query = new Driver();
    query.response = res;
 
  if(req.query["idx"]){
    query.opts.startIdx = req.query["idx"];
    console.log(req.query["idx"]);
  }

  query.getSearchResults(req.query["query"]);
};
