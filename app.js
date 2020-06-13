const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

const port = process.env.PORT || 4000;

mongoose
  .connect(
 "mongodb+srv://selvakumaran:@Selvakumaran143M@cluster0-mf5at.mongodb.net/users",{ useNewUrlParser: true }
 // "mongodb://localhost:27017/users",{ useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

app.get('/', (req, res) => res.send("how r u"))
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
 });

module.exports = app;
