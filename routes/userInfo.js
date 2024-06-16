const express=require('express');
const accessUsersInfoController  = require('../controllers/accessUsersInfoController');
const accessUsernameController  = require('../controllers/accessUsernameController');
const router=express.Router();

router.get('/getUsersInfo', accessUsersInfoController);
router.get('/getUsernames', accessUsernameController);

module.exports = router;