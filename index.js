const express = require("express"),
	  app = express(),
	  mongoose = require("mongoose");

require("./monitor.js")

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/index.js"));

app.listen(5000, () => console.log("Listening.."));

// Database

mongoose.connect("mongodb://127.0.0.1/uptime-monitor", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let mon = mongoose.connection;

mon.once("open", () => console.log("Successfully connected to the database.."));
mon.on("error", console.error.bind(console, "Database connection error:"));