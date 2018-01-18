const date = new Date();

const todos = [
  {
    todo_id: 0,
    todo: 'Get some milk',
    author: 'Jim',
    datecreated: date,
    duedate: new Date(date.setDate(date.getDate() + 5)),
    completed: false,
  },
  {
    todo_id: 1,
    todo: 'Get some rice',
    author: 'Harry',
    datecreated: date,
    duedate: new Date(date.setDate(date.getDate() + 5)),
    completed: false,
  },
];

// we define a function, which is actually a middleware, that will be used
// by Swagger when mocking endpoints
// 'GetAllTodos' matches the x-swagger-router-controller, which references
// the operationId.
// Both this file and the function exported must match the
// x-swagger-router-controller in order for endpoints to have custom mocks.
const GetAllTodos = (req, res, next) => {
  res.json(todos);
};

module.exports = {GetAllTodos};
