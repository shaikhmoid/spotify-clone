const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const fileupload = require("express-fileupload");
const fs = require("fs");
const authRouter = require("./routes/auth");
const createRouter = require("./routes/craeteSongAndAlbum");
const songRouter = require("./routes/songs");
const albumRouter = require("./routes/album");
app.use(cookieParser());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use(
  cors({
    origin: "https://spotify-clone-orpin-eta.vercel.app",
    credentials: true,
  })
);

const tempDir = path.join(process.cwd(), "temp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {});
      }
    });
  }
});

app.use("/auth", authRouter);
app.use("/file", createRouter);
app.use("/songs", songRouter);
app.use("/album", albumRouter);
app.get("/", (req, res) => {
  res.send("hii / ");
});
module.exports = app;
