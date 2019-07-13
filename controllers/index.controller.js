module.exports.app = function (req, res, next) {
     res.render("index");
}
module.exports.chart=function(req,res,next){
      res.render("chart")
}
module.exports.table=function(req,res,next){
      res.render("table")
}