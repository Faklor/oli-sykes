import "dotenv/config.js";
import express from "express";
import router from "./routes/index.js";
import loadData from "./scripts/loadData.js";
import sequelize from "./models/db.js";
import { Albums, Posts, Song_comments, Song_likes, Songs, Users } from './models/models.js';
import cors from 'cors'
import fs from 'fs'

const app = express();
const PORT = 5000

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.set('trust proxy', 1)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const listen = async () => {
  try {
    
    const folderName = './uploads';

    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    await sequelize.authenticate();
    await sequelize.sync();
    // await sequelize.sync({force: true});
    app.listen(PORT || 5000, () => {
      console.log(`http://localhost:${PORT}`);
    });

    loadData([
      // {file: "./scripts/posts.json", model: Posts}, 
      {file: "./scripts/albums.json", model: Albums},
      {file: "./scripts/songs.json", model: Songs},
      {file: "./scripts/users.json", model: Users},
      {file: "./scripts/song_comments.json", model: Song_comments},
      {file: "./scripts/song_likes.json", model: Song_likes},
    ]);

  } catch (e) {
    console.log(e);
  }
};

listen();
