const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const guestController = require("../controllers/guest")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// main Routes 
router.get("/", homeController.getIndex);
router.get("/guest", ensureGuest, guestController.getFeed);
router.get("/guest/:id", ensureGuest, guestController.getPost);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
