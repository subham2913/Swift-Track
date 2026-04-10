const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const dbConfig = require("./config/dbConfig");

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://swift-track-f8xz.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server running on ${port}`));