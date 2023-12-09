import sequelize from "./db.js";
import DataTypes from "sequelize";

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  email: { type: DataTypes.STRING, unique: true, required: true },
  password: { type: DataTypes.STRING, required: true },
  filename: { type: DataTypes.STRING },
  contentType: {type: DataTypes.STRING },
  imageBase64: { type: DataTypes.BLOB('long') },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Posts = sequelize.define("posts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.TEXT },
  img: { type: DataTypes.TEXT, required: true },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Albums = sequelize.define("albums", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, required: true },
  img: { type: DataTypes.STRING, required: true },
});

const Songs = sequelize.define("songs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, required: true },
  url: { type: DataTypes.STRING, required: true },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Post_comments = sequelize.define(
  "post_comments",
  {
    comment: { type: DataTypes.STRING, required: true },
  },
  {timestamps: true}
);

const Song_comments = sequelize.define(
  "song_comments",
  {
    comment: { type: DataTypes.STRING, required: true },
  },
  {timestamps: true}
);

Users.belongsToMany(Posts, { through: Post_comments });
Posts.belongsToMany(Users, { through: Post_comments });

Songs.belongsToMany(Users, { through: Song_comments });
Users.belongsToMany(Songs, { through: Song_comments });

Albums.hasMany(Songs, { onDelete: "cascade" });
Songs.belongsTo(Albums);

export {
  Users,
  Posts,
  Songs,
  Albums,
  Post_comments,
  Song_comments
};
