const esClient = require('../helpers/es');

const UpdateTodoById = (req, res) => {
  // update en existin todo on Elastic Search
  esClient.update(
    {
      index: 'todo',
      type: 'todo',
      // the id of the todo to update
      id: req.swagger.params.id.value,
      // the content of the todo to update
      // Elastic Search expects the content to be assigned to the doc of
      // a body
      body: {
        doc: req.swagger.params.updated_todo.value,
      },
    },
    (err, result) => {
      // we return json
      res.header('Content-Type', 'application/json');

      if (err) {
        // bad request
        res.statusCode = 400;
        res.json(err);
      } else {
        // we can either return a 200 with content, or a 204 without content
        // res.statusCode = 204;

        // res.end();
        res.json(result);
      }
    }
  );
};

module.exports = {UpdateTodoById};
