// this is the file x-swagger-router-controller expects for the POST
// endpoint
const esClient = require('../helpers/es');

// this is the function the operationId on the POST endpoint is expecting
const AddTodo = (req, res) => {
  // create a todo using ElasticSearch
  esClient.create(
    {
      index: 'todo',
      type: 'todo',
      id: req.body.todo_id,
      body: req.body,
    },
    (err, response) => {
      // our request expects a json response
      res.header('Content-Type', 'application/json');
      if (err) {
        console.log(err);
        // if there's an existing record, which may be the reason for the error
        // in this situtation, set the statusCode to 409 Conflict
        res.statusCode = 409;
        // return the error
        res.json(err);
      } else {
        console.log(`Todo ${req.body.todo_id} added to ElasticSearch`);
        // otherwise we set the location header for the new resource
        res.header('Location', `/todo/${req.body.todo_id}`);
        // set the statusCode to 201 Created
        res.statusCode = 201;
        // and then return the object as if it were a GET request
        res.json(req.body);
      }
    }
  );
};

module.exports = {AddTodo};
