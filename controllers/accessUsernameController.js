const User=require("../models/userSchema");
const accessUsernameController = (req, res) => {
    User.find({}, 'username')
      .then((users) => {
        const usernames = users.map((user) => user.username);
        res.status(200).json(usernames);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
}
 
module.exports = accessUsernameController;