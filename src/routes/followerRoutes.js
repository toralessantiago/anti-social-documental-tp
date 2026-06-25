const express = require("express");
const router = express.Router();

const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../controllers/followerController");

//CRUD FOLLOWERS
router.post("/:userId/:targetId", followUser);

router.delete("/:userId/:targetId", unfollowUser);

router.get("/following/:userId", getFollowing);

router.get("/:userId", getFollowers);

module.exports = router;
