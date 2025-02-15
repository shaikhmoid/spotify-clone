const Album = require("../modal/album");

const getAllAlbum = async (req, res) => {
  try {
    const album = await Album.find().populate("songs");
    res.status(200).json({ album });
  } catch (error) {
    res.status(500).json({ message: " error", error });
  }
};
const getOneAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }

    const album = await Album.findById(id).populate("songs");

    res.status(200).json({ album });
  } catch (error) {
    res.json({ message: " error", error });
  }
};

module.exports = { getAllAlbum, getOneAlbum };
