const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

// Middleware
app.use(express.json());

// Routes
const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);



// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}


// Set up the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Node server listening on port ${port}!`));
