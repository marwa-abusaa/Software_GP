// app.js
const express = require("express");
const bodyParser = require("body-parser");

const UserRoute = require("./routes/user.router");
const SuperVisorRoute = require("./routes/supervisor.router");
const SuperChildRoute = require("./routes/superChild.router");
const childRoute = require("./routes/child.router");


const BookRoute = require("./routes/book.router");
const CommentRoute = require("./routes/comment.router");
const CoursesRoute = require('./routes/courses.router');
const ContestsRoute = require('./routes/contest.router');
const languageToolRoutes = require('./routes/languageToolRoutes');
const StoryImagesRoutes = require('./routes/storyImages.router');
const MyBooksRoutes = require('./routes/myBook.router');
const contestJoinRoutes = require('./routes/contestJoin.router');
const contestVoteRoutes = require('./routes/contestVote.router');
const QuizRoute = require('./routes/quiz.router');
const UsermarkRoute = require('./routes/userMark.router');
const app = express();

// Enable CORS for all requests
//app.use(cors());

// Increase limit to 10MB (or adjust as necessary)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.json());
app.use("/", UserRoute);
app.use("/", SuperVisorRoute);
app.use("/", SuperChildRoute);
app.use("/", childRoute);


app.use("/", BookRoute); 
app.use("/", CommentRoute); 
app.use("/",CoursesRoute);
app.use("/",ContestsRoute);
app.use('/', languageToolRoutes);
app.use('/', StoryImagesRoutes);
app.use('/', MyBooksRoutes);
app.use('/', contestJoinRoutes);
app.use('/', contestVoteRoutes);


//marwa/quiz
app.use("/",QuizRoute);
app.use("/",UsermarkRoute);
module.exports = app;
