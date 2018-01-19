// This is the file that x-swagger-router-controller will use for the actual API.
// It must export functions for endpoints with the same names as operationIds
// referenced in the swagger doc
const esClient = require('../helpers/es');

const GetAllTodos = (req, res) => {
  // search for todos using our elastic search client
  esClient.search(
    {
      index: 'todo',
      type: 'todo',
      q: '*',
      // indicate which properties we want returned in the response for each item
      _sourceInclude: 'todo_id, todo, completed, author, datecreated, duedate',
    },
    (err, response) => {
      if (err) {
        res.end(JSON.stringify(err));
      } else {
        // filter the response from elastic search.
        // A 'hit' is an individual result
        const results = response.hits.hits.map(hit => hit._source);

        // set the Content-Type header to json to indicate to the client what MIME
        // type it has been sent
        res.header('Content-Type', 'application/json');
        // Close the request by responding with json
        res.json(results);
      }
    }
  );
};

module.exports = {GetAllTodos};
