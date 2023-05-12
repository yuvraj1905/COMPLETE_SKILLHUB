import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateUserRole,
  updateprofilepicture,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

// register
router.route("/register").post(singleUpload, register);

// login
router.route("/login").post(login);

//logout
router.route("/logout").get(logout);

// my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// change password
router.route("/changepassword").put(isAuthenticated, changePassword);

// update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// update profile pic
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateprofilepicture);

// forget password
router.route("/forgetpassword").post(forgetPassword);

// resetPassword
router.route("/resetpassword/:token").put(resetPassword);

//addtoplaylist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

//removefromplaylist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// get all users --Admin
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

// update role --Admin
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
