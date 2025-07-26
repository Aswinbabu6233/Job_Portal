const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const SocketHandler = require("./config/socket");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORGIN || "http://localhost:5137",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job")(io);
const applicationRoutes = require("./routes/application");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// db
connectDB();
SocketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
