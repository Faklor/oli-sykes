import "dotenv/config.js";
import express from "express";
import router from "./routes/index.js";
import sequelize from "./models/db.js";
// import cookieSession from "cookie-session";
import cors from 'cors'

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
// app.use(
//   cookieSession({
//     name: "session",
//     keys: [process.env.COOKIE_KEY]
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const listen = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // await sequelize.sync({force: true});
    app.listen(PORT || 5000, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

listen();
