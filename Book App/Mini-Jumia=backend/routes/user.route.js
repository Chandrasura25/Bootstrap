const express = require("express")
require('dotenv').config()
const router = express.Router()
const userController = require('../controllers/user.controller')
router.get('/',userController.getIndexPage)
router.get( '/signup', userController.getSignUp);
router.get( '/signin', userController.getSignIn);
router.get( '/admin', userController.getAdminPage);
router.post( '/signup', userController.registerUser);
router.post( '/signin', userController.signInUser);
router.post( '/delete', userController.deleteUser);
router.post( '/edit', userController.editUser);
router.post('/update', userController.upDateUser)       
module.exports =router;