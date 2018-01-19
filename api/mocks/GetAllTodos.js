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

const GetAllTodos = (req, res, next) => {
  res.json(todos);
};

// The name of the functions in the export here is what operationId
// in the swagger doc references.
// This file is what x-swagger-router-controller references.
module.exports = {GetAllTodos};
