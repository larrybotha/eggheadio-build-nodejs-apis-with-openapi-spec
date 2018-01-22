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

module.exports = {GetAllTodos};
