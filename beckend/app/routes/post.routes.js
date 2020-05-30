module.exports = (app) => {
  const posts = require('../controllers/post.controller.js');

  const router = require('express').Router();

  // Create a New Post
  router.post('/', posts.create);

  // Find All
  router.get('/', posts.findAll);

  // Find One Post
  router.get('/:id', posts.findOne);

  // Find Published Post
  router.get('/published', posts.findAllPublished);

  // Update Post
  router.put('/:id', posts.update);

  // Deleted Post by id
  router.delete('/:id', posts.deleta);

  // Delete All Post
  router.delete('/', posts.deletaAll);


  app.use('/api/posts', router);
};
