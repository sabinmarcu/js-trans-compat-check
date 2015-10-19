var Express = require("express"),
    app = Express();

app.set("port", (process.env.PORT || 3000));

app.use(Express.static("public"));

var server = app.listen(app.get("port"), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});