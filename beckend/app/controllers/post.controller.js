const db = require('../models');

const Post = db.posts;

const { Op } = db.Sequelize;

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty',
    });
  }

  // Create post
  const post = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Post.create(post)
    .then((result) => {
      res.send(result);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Some error occured while creating the Post',
      });
    });
};

// Retrieve all
exports.findAll = (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Post.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while find post',
      });
    });
};

// Find a sigle
exports.findOne = (req, res) => {
  const { id } = req.params;

  Post.findByPk(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving post with id=${id}`,
        error: err.message,
      });
    });
};

// Update a Post with ID
exports.update = (req, res) => {
  const { id } = req.params;

  Post.update(req.body, {
    where: { id },
  }).then((result) => {
    if (result == 1) {
      res.send({
        message: 'Post was updated successfully',
      });
    } else {
      res.send({
        message: `Cannot update Post with id=${id}.`,
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Error updating post with id=${id}`,
      error: err,
    });
  });
};

// Delete a post by id
exports.deleta = (req, res) => {
  const { id } = req.params;
  Post.destroy({
    where: { id },
  }).then((result) => {
    if (result === 1) {
      res.send({ message: 'Post was deleted successfully' });
    } else {
      res.send({ message: `Cannot Delete post with id = ${id}` });
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Could not delete post with id = ${id}`,
      error: err,
    });
  });
};

// Delete All Post
exports.deletaAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false,
  }).then((result) => {
    res.send({
      message: `${result} Posts were deleted successfully`,
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured retrieving posts',
      });
    });
  });
};

// Find All Published
exports.findAllPublished = (req, res) => {
  Post.findAll({
    where: { published: true },
  }).then((result) => {
    res.send({
      message: 'Get Successfully',
      data: result,
    });
  }).catch((err) => {
    res.status(500).send({
      message:
              err.message || 'Some error occured retrieving posts',
    });
  });
};
