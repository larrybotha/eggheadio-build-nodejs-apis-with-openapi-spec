'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const cors = require('cors');

module.exports = app;

var config = {
  appRoot: __dirname,
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // we need to use cors in order for swagger to make requests
  // from it's location (localhost:49685) to the api at
  // localhost:10010
  app.use(cors());

  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(
      'try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott'
    );
  }
});
