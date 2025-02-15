const Song = require("../modal/song");

const getAllSongs = async (req, res) => {
  try {
    const song = await Song.find();
    res.status(200).json({ song });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
const getoneSongs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }
    const song = await Song.findById(id);
    res.status(200).json({ song });
  } catch (error) {
    res.status(500).json({ message: " error", error });
  }
};

const getFeaturedSongs = async (req, res) => {

  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json({ songs });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: " error", error });
  }
};
const getMadeForYouSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json({ songs });
  } catch (error) {
    res.status(500).json({ message: " error", error });
  }
};

const getTrendingSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json({ songs });
  } catch (error) {
    res.status(500).json({ message: " error", error });
  }
};

module.exports = {
  getAllSongs,
  getoneSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
};
