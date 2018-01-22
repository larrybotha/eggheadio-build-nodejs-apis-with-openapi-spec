// file for the /todo/{id} GET endpoint defined by x-swagger-router-controller
const esClient = require('../helpers/es');

// the function we need to export for the endpoint, as defined by operationId
const FindTodoById = (req, res) => {
  console.log(`Getting Todo with id ${req.swagger.params.id.value}`);

  // get the todo by id from swagger
  // How do we discern between swagger and production? Environment variables?
  // That's crap. Need to investigate this.
  esClient.get(
    {
      index: 'todo',
      type: 'todo',
      id: req.swagger.params.id.value,
    },
    (err, result) => {
      // set the Content-Type header to the correct MIME type
      res.header('Content-Type', 'application/json');

      if (err) {
        // no need to explicitly define 404, apparently. The err object from
        // ElasticSearch already has a 404.
        // Why is ElasticSearch returning a 404? It's not an HTTP server, is it?
        // Or is it?
        res.json(err);
      } else {
        // return the _.source object from the result
        // No need to define a 200 here - does express do this automatically?
        res.json(result._source);
      }
    }
  );
};

module.exports = {FindTodoById};
