const express=require('express');
const accessUsersInfoController  = require('../controllers/accessUsersInfoController');
const accessUserInfoController  = require('../controllers/accessUserInfoController');
const accessUsernameController  = require('../controllers/accessUsernameController');
const router=express.Router();

router.get('/getUsersInfo', accessUsersInfoController);//give the info users searched by username, bio like followers following bio name posts for search page
router.post('/getUserInfo', accessUserInfoController);// give the info user searched by username like followers following bio name posts for view profile page

router.get('/getUsernames', accessUsernameController);

module.exports = router;