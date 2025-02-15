const Album = require("../modal/album");
const Song = require("../modal/song");
const { findById, find } = require("../modal/user");
const cloudinary = require("../utils/cloudnary");

const uploadToCloudinary = async (file) => {
  try {

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,

      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};
const createSong = async (req, res) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "please upload all files" });
    }

    const { title, albumId, duration, artist } = req.body;
    const audioFile = req.files.audioFile;

    const imageFile = req.files.imageFile;

    const imageUrl = await uploadToCloudinary(imageFile);

    const audioUrl = await uploadToCloudinary(audioFile);

    const songs = new Song({
      title,
      artist,
      audioUrl: audioUrl,
      imageUrl: imageUrl,
      duration,
      albumId: albumId || null,
    }).save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: songs._id },
      });
    }

    res.status(200).json({ songs });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "song route error", error });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }

    const song = await Song.findById(id);

    if (song.albumId) {
      await Album.findById(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "song deleted succesfully", song });
  } catch (error) {
    res.status(500).json({ message: "song route error", error });
  }
};

const createAlbum = async (req, res) => {
  try {
    const { title, artist, releaseYear } = req.body;

    if (!title || !artist) {
      throw new Error("all feils are required");
    }


    const imageFile = req.files.imageFile;
    const imageUrl = await uploadToCloudinary(imageFile);
    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    album.save();

    res.status(200).json({ album });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "song route error", error });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }

    const songsId = await Song.find({ albumId: id });

    if (songsId) {
      await Song.deleteMany({ albumId: id });
    }
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "album deleted succesfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "song route error", error });
  }
};
module.exports = { createSong, deleteSong, createAlbum, deleteAlbum };
