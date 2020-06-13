const express = require("express");


const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();




router.post(
  "",
  checkAuth,
   (req, res, next) => {
      const post = new Post({
      title: req.body.title,
      comment: req.body.comment,
       creator: req.userData.userId
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  checkAuth,
    (req, res, next) => {
   
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      comment: req.body.comment,
      creator: req.userData.userId
    });
    Post.updateOne(
      { _id: req.params.id, creator: req.userData.userId },
      post
    ).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    });
  }
);

router.get("", (req, res, next) => {

  Post.find()
    .then(posts => {
       res.status(200).json({
        message: "Posts fetched successfully!",
        posts: posts
            });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    }
  );
});

module.exports = router;
