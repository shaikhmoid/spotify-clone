const Server = require("socket.io");
const Message = require("./modal/messages");

const socket = (server) => {
  let io = Server(server, {
    cors: {
      origin: "https://spotify-clone-orpin-eta.vercel.app",
      credentials: true,
    },
  });

  const userSockets = new Map();
  const userActivities = new Map();
  io.on("connection", (socket) => {
    socket.on("connected_user", (userId) => {
      userSockets.set(userId, socket.Id);
      userActivities.set(userId, "idle");

      io.emit("user_connected", userId);

      socket.emit("user_online", Array.from(userSockets.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
    });

    socket.on("activity_update", (userId, activity) => {
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data) => {
      try {
        const { receiverId, senderId, content } = data;

        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }
      } catch (error) {
        console.error("Message error:", error);
        socket.emit("message_error", error.message);
      }
    });
    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};

module.exports = socket;
