import { create } from "zustand";
import { io } from "socket.io-client";

const baseURL = "https://spotify-clone-5pa4.vercel.app";
const socket = io(baseURL, {
  withCredentials: true,
});

const useChatStore = create((set, get) => ({
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,
  isLoading: false,
  userId: null,
  error: null,
  chatMessages: [],

  errorMsg: () => {
    socket.on("connect_error", (err) => {
      set({ error: err });
    });
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  initSocket: (userId) => {
    set({ userId: userId });
    if (!get().isConnected) {
      socket.auth = userId;
      socket.connect();
      socket.emit("connected_user", userId);
      socket.on("user_online", (data) => {
        set({ onlineUsers: new Set(data) });
      });
      socket.on("activities", (data) => {
        set({ userActivities: new Map(data) });
      });
      socket.on("user_connected", (userId) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });
      socket.on("receive_message", (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });
    }
    set({ isConnected: true });
  },

  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: async (receiverId, senderId, content) => {
    const socket = get().socket;
    // if (!socket) return;

    socket.emit("send_message", { receiverId, senderId, content });
  },

  fetchMessage: (message) => {
    set({ messages: message });
  },
}));

export default useChatStore;
