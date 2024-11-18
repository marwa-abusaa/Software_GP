// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS

const UserRoute = require("./routes/user.router");
const BookRoute = require("./routes/book.router");
const CommentRoute = require("./routes/comment.router");
const CoursesRoute = require('./routes/courses.router');
const ContestsRoute = require('./routes/contest.router');

const app = express();

// Enable CORS for all requests
//app.use(cors());

// Increase limit to 10MB (or adjust as necessary)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.json());
app.use("/", UserRoute);
app.use("/", BookRoute); 
app.use("/", CommentRoute); 
app.use("/",CoursesRoute);
app.use("/",ContestsRoute);

module.exports = app;
