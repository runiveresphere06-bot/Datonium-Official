require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const sequelize = require("./config/database");

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const labRoutes = require("./routes/labs");
const channelRoutes = require("./routes/channels");
const messageRoutes = require("./routes/messages");

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "DATONIUM backend running" });
});

// API routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/labs", labRoutes);
app.use("/channels", channelRoutes);
app.use("/messages", messageRoutes);

// Socket.io events
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-channel", (channelId) => {
    socket.join(`channel-${channelId}`);
  });

  socket.on("send-message", (data) => {
    io.to(`channel-${data.channelId}`).emit("new-message", data);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;

// Handle port-in-use error SAFELY
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} already in use. Stop other servers.`);
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});

// Start DB + Server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });
