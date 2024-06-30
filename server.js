const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Routes importing
const Route = require("./routes/Route.js");

// Middleware for serving static files
app.use(express.static("public"));

// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Setting the view engine to EJS
app.set("view engine", "ejs");

// Loading environment variables from .env file
require("dotenv").config();

const dbURI = `${process.env.MONGO_URI}`;
const PORT = process.env.PORT || 8888;

// Connecting to MongoDB
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("DB connected.......");
    console.log(`port no : ${PORT}`);
    // Starting the server
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

// Using imported routes
app.use("", Route);

// Handling 404 errors
app.use((req, res) => {
  res.status(404).send("404 not found");
});
