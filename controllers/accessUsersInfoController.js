const User=require("../models/userSchema");
const accessUsersInfoController = (req, res) => {
    User.find({}, 'username followers following bio name')
      .then((users) => {
        
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
}
 
module.exports = accessUsersInfoController;