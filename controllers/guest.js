const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      var users = [];
      for(i in posts){
        var user = await User.findById(posts[i].user)
        users.push(user.userName)
    }  
      res.render("guestfeed.ejs", { posts: posts, userName: users });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const author = await User.findById(post.user)
      const comments = await Comment.find({post: req.params.id }).sort({ createdAt: "asc" }).lean();
      //there is probably a better way to alternatively render the post if user is not logged in
      res.render("guestPost.ejs", { post: post, user: req.user, comments: comments, author: author});
    } catch (err) {
      console.log(err);
    }
  },
}