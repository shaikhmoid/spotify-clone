const express = require("express");
const authMiddleware = require("../middleware/userMiddleware");
const {
  getAllSongs,
  getoneSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} = require("../controller.js/songsController");
const router = express.Router();

router.get("/all", getAllSongs);
router.get("/one/:id", getoneSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

module.exports = router;
