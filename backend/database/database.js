const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://mohidshaikh3003:UAIAVXtqvojLoIxQ@tinderdatabase.ysiog.mongodb.net/SpotifyDB"
  );
};

module.exports = connectDb;
