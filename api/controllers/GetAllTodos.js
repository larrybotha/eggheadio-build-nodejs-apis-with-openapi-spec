const esClient = require('../helpers/es');

const GetAllTodos = (req, res) => {
  esClient.search(
    {
      index: 'todo',
      type: 'todo',
      q: '*',
      _sourceInclude: 'todo_id, todo, completed, author, datecreated, duedate',
    },
    (err, response) => {
      if (err) {
        res.end(JSON.stringify(err));
      } else {
        const results = response.hits.hits.map(hit => hit._source);

        res.header('Content-Type', 'application/json');
        res.json(results);
      }
    }
  );
};

module.exports = {GetAllTodos};
