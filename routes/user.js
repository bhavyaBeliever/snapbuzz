const express=require('express');
const loginController = require('../controllers/loginController');
const signupController = require('../controllers/signupController');
const accessUsernameController  = require('../controllers/accessUsernameController');
const router=express.Router();

router.post('/login',loginController)
router.get('/getUsername', accessUsernameController)
router.post('/signup',signupController)
module.exports=router