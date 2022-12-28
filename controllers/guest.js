const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User")
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
}