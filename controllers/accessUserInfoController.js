const User=require("../models/userSchema");
const Post=require("../models/postSchema");
const getPosts = async (userPosts) => {
  return await Promise.all(userPosts.map(async (postId) => {
    try {
      const post = await Post.findById(postId);
      return post;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }));
}
const accessUserInfoController = async (req, res) => {
    const { username } = req.body;
    User.findOne({ username: username })
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const userPosts = user.posts;
        const posts = await getPosts(userPosts);
        const filterUserInfo = {
          username: user.username,
          followers: user.followers,
          following: user.following,
          bio: user.bio,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          posts,
        };
        res.status(200).json(filterUserInfo);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
}
 
module.exports = accessUserInfoController;
