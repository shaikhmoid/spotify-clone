const express = require("express");
const authMiddleware = require("../middleware/userMiddleware");
const {
  getAllAlbum,
  getOneAlbum,
} = require("../controller.js/albumController");
const router = express.Router();

router.get("/all", getAllAlbum);
router.get("/:id", getOneAlbum);

module.exports = router;
