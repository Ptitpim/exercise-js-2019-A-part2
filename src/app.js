let express = require('express');
let bodyParser = require('body-parser');

let app = express(); app.use(bodyParser.json());
let todos = [
  {id: 'jkhsdjkf', content: 'review this code'}
];

app.post('/todos', (req, res) => {
  todos.push({
    ...req.body,
    id: Math.random().toString(32).slice(2)
  });
  res.sendStatus(201);
});

app.put('/todos/:id', (req, res) => {
  const todoFound = todos.filter(todo => (todo.id === req.params.id))[0];

  if (todoFound) {
    todoFound = {...todoFound, ...req.body};
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.get('/todos/:id', (req, res) => {
  if (req.params.id === 'all') {
    res.send(todos);
    return;
  }

  const todoFound = todos.filter(todo => (todo.id === req.params.id))[0];
  res.send(todoFound ? todoFound : 'NOT FOUND');
});

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(8080, () => {
  console.log('Listening on port 8080...');
});