const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const range = require("express-range");
const sessionRoutes = require("./session"); // Import the router instance
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const searchFunction = require("./searchAlgorithm");
const secretKey = "secreyKey";
const signUp = require("./signup");
// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Set up PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "videostream",
  password: "1",
  port: 5432,
});

const app = express();
// session is defined globally here
app.use(
  session({
    secret: "yash",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set secure to true
      sameSite: "lax", // Set SameSite to 'none'
    },
  })
);
// session ended

app.use(
  cors({
    origin: "http://localhost:3000", // The origin of your React app
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(range());
app.use("/session", sessionRoutes);
app.use(signUp);
app.get("/videos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM videos");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/upload", upload.single("video"), async (req, res) => {
  const { title, description } = req.body;

  // Check if the file was uploaded
  if (!req.file) {
    console.error("No file uploaded");
    return res.status(400).send("No file uploaded");
  }

  const videoPath = req.file.path;
  console.log(req.body);

  try {
    await pool.query(
      "INSERT INTO videos (title, description, video) VALUES ($1, $2, $3)",
      [title, description, videoPath]
    );

    res.status(200).send("Video uploaded successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// jwt token
// this is the login handler
app.post("/login", (req, res) => {
  const { id, username, email } = req.body;
  const user = { id, username, email };
  jwt.sign({ user }, secretKey, { expiresIn: "1000000000s" }, (err, token) => {
    if (err) {
      res.send(err);
    } else {
      res.send(token);
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        error: "Invalid token",
      });
    } else {
      res.json({
        message: "Profile accessed successfully",
        user: authData.user,
      });
    }
  });
});

//jwt end

// cookies

app.get("/cookie", (req, res) => {
  res.cookie("name", "geenius");
  console.log("the cookie is set bro just chillax", "=> ", req.cookies.name);
});

//end cookies

app.get("/search", async (req, res) => {
  let searchItem = req.query.searchItem;
  let allTitlesObjectWithRowArray = await pool.query(
    "SELECT title FROM videos"
  );
  let titles = allTitlesObjectWithRowArray.rows;

  // Create an array of objects, each with a title and its comparison value
  const titleComparisons = titles.map((title) => ({
    title: title.title,
    comparison: searchFunction(title.title, searchItem),
  }));

  // Filter out titles with a comparison value of 0 or less
  const positiveComparisons = titleComparisons.filter(
    (item) => item.comparison > 0
  );

  // Sort the remaining titles in descending order of comparison value
  positiveComparisons.sort((a, b) => b.comparison - a.comparison);

  // Getting videos with these titles
  const videos = [];

  // Loop over the sorted array
  for (let i = 0; i < positiveComparisons.length; i++) {
    // Query the database to get the video associated with the title
    let videoObjectWithRowArray = await pool.query(
      "SELECT * FROM videos WHERE title = $1",
      [positiveComparisons[i].title]
    );
    // Add the video to the videos array
    videos.push(videoObjectWithRowArray.rows[0]);
  }

  // Send the videos array as the response
  res.json(videos);
});
//search end
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
