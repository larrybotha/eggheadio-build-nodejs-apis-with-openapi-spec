const esClient = require('../helpers/es');
const monitor = require('../helpers/monitor');

const GetAllTodos = (req, res) => {
  // start a monitor when a request is made
  const start = monitor();

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

        // and then monitor when we are making a response by sending through the
        // start time, and a tag so we can identify which endpoint we are
        // monitoring
        monitor(start, 'GetAllTodos');
      }
    }
  );
};

module.exports = {GetAllTodos};
