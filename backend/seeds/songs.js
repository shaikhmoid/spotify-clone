const mongoose = require("mongoose");
const Song = require("../modal/song");

const songs = [
  {
    title: "Stay With Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/Songs/1.mp3",
    duration: 46, // 0:46
  },
  {
    title: "Midnight Drive",
    artist: "The Wanderers",
    imageUrl: "/cover-images/2.jpg",
    audioUrl: "/Songs/2.mp3",
    duration: 41, // 0:41
  },
  {
    title: "Lost in Tokyo",
    artist: "Electric Dreams",
    imageUrl: "/cover-images/3.jpg",
    audioUrl: "/Songs/3.mp3",
    duration: 24, // 0:24
  },
  {
    title: "Summer Daze",
    artist: "Coastal Kids",
    imageUrl: "/cover-images/4.jpg",
    audioUrl: "/Songs/4.mp3",
    duration: 24, // 0:24
  },
  {
    title: "Neon Lights",
    artist: "Night Runners",
    imageUrl: "/cover-images/5.jpg",
    audioUrl: "/Songs/5.mp3",
    duration: 36, // 0:36
  },
  {
    title: "Mountain High",
    artist: "The Wild Ones",
    imageUrl: "/cover-images/6.jpg",
    audioUrl: "/Songs/6.mp3",
    duration: 40, // 0:40
  },
  {
    title: "City Rain",
    artist: "Urban Echo",
    imageUrl: "/cover-images/7.jpg",
    audioUrl: "/Songs/7.mp3",
    duration: 39, // 0:39
  },
  {
    title: "Desert Wind",
    artist: "Sahara Sons",
    imageUrl: "/cover-images/8.jpg",
    audioUrl: "/Songs/8.mp3",
    duration: 28, // 0:28
  },
  {
    title: "Ocean Waves",
    artist: "Coastal Drift",
    imageUrl: "/cover-images/9.jpg",
    audioUrl: "/Songs/9.mp3",
    duration: 28, // 0:28
  },
  {
    title: "Starlight",
    artist: "Luna Bay",
    imageUrl: "/cover-images/10.jpg",
    audioUrl: "/Songs/10.mp3",
    duration: 30, // 0:30
  },
  {
    title: "Winter Dreams",
    artist: "Arctic Pulse",
    imageUrl: "/cover-images/11.jpg",
    audioUrl: "/Songs/11.mp3",
    duration: 29, // 0:29
  },
  {
    title: "Purple Sunset",
    artist: "Dream Valley",
    imageUrl: "/cover-images/12.jpg",
    audioUrl: "/Songs/12.mp3",
    duration: 17, // 0:17
  },
  {
    title: "Neon Dreams",
    artist: "Cyber Pulse",
    imageUrl: "/cover-images/13.jpg",
    audioUrl: "/Songs/13.mp3",
    duration: 39, // 0:39
  },
  {
    title: "Moonlight Dance",
    artist: "Silver Shadows",
    imageUrl: "/cover-images/14.jpg",
    audioUrl: "/Songs/14.mp3",
    duration: 27, // 0:27
  },
  {
    title: "Urban Jungle",
    artist: "City Lights",
    imageUrl: "/cover-images/15.jpg",
    audioUrl: "/Songs/15.mp3",
    duration: 36, // 0:36
  },
  {
    title: "Crystal Rain",
    artist: "Echo Valley",
    imageUrl: "/cover-images/16.jpg",
    audioUrl: "/Songs/16.mp3",
    duration: 39, // 0:39
  },
  {
    title: "Neon Tokyo",
    artist: "Future Pulse",
    imageUrl: "/cover-images/17.jpg",
    audioUrl: "/Songs/17.mp3",
    duration: 39, // 0:39
  },
  {
    title: "Midnight Blues",
    artist: "Jazz Cats",
    imageUrl: "/cover-images/18.jpg",
    audioUrl: "/Songs/18.mp3",
    duration: 29, // 0:29
  },
];

const seedSongs = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mohidshaikh3003:UAIAVXtqvojLoIxQ@tinderdatabase.ysiog.mongodb.net/SpotifyDB"
    );

    // Clear existing songs
    await Song.deleteMany({});

    // Insert new songs
    await Song.insertMany(songs);

    console.log("Songs seeded successfully!");
  } catch (error) {
    console.error("Error seeding songs:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedSongs();
