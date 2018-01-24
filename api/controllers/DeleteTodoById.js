const esClient = require('../helpers/es');

const DeleteTodoById = (req, res) => {
  esClient.delete(
    {
      // elastic search uses index
      index: 'todo',
      // and type to identify the entity to remove
      type: 'todo',
      // we get the value from the param, because of the way swagger's object is
      // configured
      id: req.swagger.params.id.value,
    },
    (err, result) => {
      // the server response is json
      res.header('Content-Type', 'application/json');

      if (err && err.statusCode !== 404) {
        res.json(err);
      } else {
        // 204 = no response body
        // res.statusCode = 204;
        res.statusCode = 200;

        // no json to send to the client, so end the response
        // res.end();

        res.json(result);
      }
    }
  );
};

module.exports = {DeleteTodoById};
