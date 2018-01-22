const esClient = require('../helpers/es');

const AddTodo = (req, res) => {
  esClient.create(
    {
      index: 'todo',
      type: 'todo',
      id: req.body.todo_id,
      body: req.body,
    },
    (err, response) => {
      res.header('Content-Type', 'application/json');
      if (err) {
        console.log(err);
        res.statusCode = 409;
        res.json(err);
      } else {
        console.log(`Todo ${req.body.todo_id} added to ElasticSearch`);
        res.header('Location', `/todo/${req.body.todo_id}`);
        res.statusCode = 201;
        res.json(req.body);
      }
    }
  );
};

module.exports = {AddTodo};
