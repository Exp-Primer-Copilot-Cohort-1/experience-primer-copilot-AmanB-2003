// Create web server 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create an array to store comments
let comments = [];

// Define a route to get the comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Define a route to post a comment
app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);
  res.json(comment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// Path: index.html
<!DOCTYPE html>
<html>
<head>
  <title>Comments</title>
</head>
<body>
  <h1>Comments</h1>
  <form id="comment-form">
    <input type="text" id="comment-input" placeholder="Enter your comment">
    <button type="submit">Submit</button>
  </form>
  <ul id="comments"></ul>
  <script>
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments');

    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const comment = commentInput.value;
      commentInput.value = '';

      const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
      });

      const newComment = await response.json();
      const commentElement = document.createElement('li');
      commentElement.textContent = newComment;
      commentsList.appendChild(commentElement);
    });

    async function getComments() {
      const response = await fetch('http://localhost:3000/comments');
      const comments = await response.json();
      comments.forEach((comment) => {
        const commentElement = document.createElement('li');
        commentElement.textContent = comment;
        commentsList.appendChild(commentElement);
      });
    }

    getComments();
  </script>
</body>
</html>
```

//In this example, we have a Node.js server that handles the storage and retrieval of comments. The server has two routes - one