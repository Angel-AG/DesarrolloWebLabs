const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../model/post');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

router.get('/', async function (req, res) {
  try {
    const posts = await Post.find().exec();
    console.log(posts);
    res.render('index', { posts: posts, months: months });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.get('/post/:id/edit', async function (req, res) {
  try {
    const postData = await Post.findById(req.params.id).exec();
    console.log(postData);
    res.render('edit', { postData: postData, months: months });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.post('/post/:id/edit', async function (req, res) {
  try {
    const editPost = await Post.updateOne(
      { _id: req.params.id },
      {
        title: req.body.title,
        author: req.body.author,
        post_data: req.body.post_data,
        post_date: Date.now(),
      }
    );
    console.log(editPost);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.get('/post/:id/delete', async function (req, res) {
  try {
    const postData = await Post.findById(req.params.id).exec();
    console.log(postData);
    res.render('delete', { postData: postData, months: months });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.post('/post/:id/delete', async function (req, res) {
  try {
    const deletePost = await Post.deleteOne({ _id: req.params.id });
    console.log(deletePost);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.get('/newPost', async function (req, res) {
  res.render('newPost');
});

router.post('/newPost', async function (req, res) {
  try {
    const newPost = new Post({
      title: req.body.title,
      author: req.body.author,
      post_data: req.body.post_data,
      post_date: Date.now(),
    });

    const saveUser = await newPost.save();
    console.log(saveUser);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

module.exports = router;
