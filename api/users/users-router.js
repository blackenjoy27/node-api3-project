const express = require('express');

const {
  validateUserId,  
  validateUser,
  validatePost
} = require("../middleware/middleware");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const router = express.Router();

router.get('/', (req, res, next) => {
    Users.get()
    .then(users=>{
      res.status(200).json(users);
    })
    .catch(next)
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser ,(req, res, next) => {

  Users.insert(req.name)
  .then(users=>{
    console.log(users);
    res.status(201).json(users);
  })
  .catch(next);
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id,req.name)
  .then(updatedUserId=>{
    Users.getById(updatedUserId)
    .then(updatedUser=>{
      res.status(200).json(updatedUser);
    })
    .catch(next);
  })
  .catch(next)
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
  .then(deletedUser=>{
    res.status(200).json(req.user);
  })
  .catch(next)
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
  .then(posts=>{
    res.status(200).json(posts);
  })
  .catch(next)
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',validateUserId, validatePost,(req, res, next) => {
  
  Posts.insert({...req.body, user_id: req.user.id})
  .then(newPost=>{
    res.status(200).json(newPost);
  })
  .catch(next)

  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;