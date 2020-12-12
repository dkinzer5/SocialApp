/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// MORGAN for logging

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Middleware
app.use(bodyParser.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');
  // log any disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // handle a createPost event
  socket.on('New Post', (post) => {
    io.emit('New Post', post);
    console.log(`post:  ${post}`);
  });
});

const Posts = require('./db/collections/Posts');

app.get('/', (req, res) => {
  // Posts.getAllPosts()
  //   .then((posts) => {
  //     res.json(posts);
  //   })
  //   .catch();
  res.sendFile('/Users/dylankinzer/College/NuSocial/index.html');
});

app.post('/api/createPost', (req, res) => {
  Posts.createPost(req.body)
    .then((createdPost) => {
      res.json(createdPost);
    })
    .catch(() => {
      // some error handling here..
    });
});
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// app.listen(port, () => console.log(`Server started on port ${port}`));
