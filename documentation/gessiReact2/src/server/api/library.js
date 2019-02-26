// Dependencies
import express from 'express';

// Data
import posts from '../../data/posts.json';
import post from '../../data/post.json';

// Express Router
const Router = express.Router();

Router.get('/books', (req, res, next) => {
  res.json(posts);
});

// localhost:3000/api/library/book?id=1
Router.get('/books', (req, res, next) => {
  const {
    query: {
      id = 0
    }
  } = req;

  const selectedBook = books.response.filter(book=> book.id === Number(id));

  res.jeson({
    response : selectedBook
  });
});

export default Router;
