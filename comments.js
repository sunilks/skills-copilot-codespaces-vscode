//Create web server
const express = require('express');
const app = express();

// Import the comments module
const comments = require('./comments');

// Import body-parser
const bodyParser = require('body-parser');

// Import the cors module
const cors = require('cors');

// Use body-parser and cors middleware
app.use(bodyParser.json());
app.use(cors());

// Create a route for getting all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route for posting a new comment
app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    username: req.body.username,
    text: req.body.text
  };
  comments.push(newComment);
  res.json(newComment);
});

// Create a route for getting a single comment
app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const getComment = comments.find(comment => comment.id === id);
  res.json(getComment);
});

// Create a route for updating a comment
app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const commentToUpdate = comments.find(comment => comment.id === id);
  commentToUpdate.text = req.body.text;
  res.json(commentToUpdate);
});

// Create a route for deleting a comment
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const commentToDelete = comments.find(comment => comment.id === id);
  const index = comments.indexOf(commentToDelete);
  comments.splice(index, 1);
  res.json(commentToDelete);
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});