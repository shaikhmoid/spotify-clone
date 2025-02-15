const http = require("http");
const app = require("./app");
const connectDb = require("./database/database");
const socket = require("./socketIo");
const port = 4000;

const server = http.createServer(app);
socket(server);

server.listen(port, () => {
  connectDb()
    .then((res) => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("server connected to" + port);
});
