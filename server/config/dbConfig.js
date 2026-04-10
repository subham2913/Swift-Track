
const mongoose = require("mongoose");
mongoose.set('strictQuery', true); 
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;


db.on("connected", () => {
  console.log("Mongo Db Connection Successfull");
});

db.on("error", () => {
  console.log("Mongo Db Connection Failed");
});
