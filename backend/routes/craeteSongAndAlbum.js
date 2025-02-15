const express = require("express");
const authMiddleware = require("../middleware/userMiddleware");
const {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
} = require("../controller.js/createsongsandalbumController");

const router = express.Router();

// Route to create a new song
router.post("/createSong", createSong);
router.delete("/deleteSong/:id", deleteSong);

router.post("/createAlbum", createAlbum);
router.delete("/delete/:id", deleteAlbum);

module.exports = router;
