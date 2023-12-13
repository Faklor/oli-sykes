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
  name: { type: DataTypes.STRING, unique: true, required: true },
  email: { type: DataTypes.STRING, unique: true, required: true },
  password: { type: DataTypes.STRING, required: true },
  filename: { type: DataTypes.STRING },
  contentType: {type: DataTypes.STRING },
  imageBase64: { type: DataTypes.TEXT},
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
});

const Post_comments = sequelize.define(
  "post_comments",
  {
    comment: { type: DataTypes.TEXT, required: true },
  },
  {timestamps: true}
);

const Post_likes = sequelize.define(
  "post_likes",
  {
    like: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {timestamps: true}
);

const Song_comments = sequelize.define(
  "song_comments",
  {
    comment: { type: DataTypes.TEXT, required: true },
  },
  {timestamps: true}
);

const Song_likes = sequelize.define(
  "song_likes",
  {
    like: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {timestamps: true}
);

Users.belongsToMany(Posts, { through: { model: Post_comments, unique: false }});
Posts.belongsToMany(Users, { through: { model: Post_comments, unique: false }});

Songs.belongsToMany(Users, { through: { model: Song_comments, unique: false }});
Users.belongsToMany(Songs, { through: { model: Song_comments, unique: false }});

Songs.belongsToMany(Users, { through: Song_likes });
Users.belongsToMany(Songs, { through: Song_likes });

Users.belongsToMany(Posts, { through: Post_likes });
Posts.belongsToMany(Users, { through: Post_likes });

Albums.hasMany(Songs, { onDelete: "cascade" });
Songs.belongsTo(Albums);

// Post_comments on delete
Users.hasMany(Post_comments, {onDelete: "cascade"});
Post_comments.belongsTo(Users);

Posts.hasMany(Post_comments, {onDelete: "cascade"});
Post_comments.belongsTo(Posts);

// Song_comments on delete
Users.hasMany(Song_comments, {onDelete: "cascade"});
Song_comments.belongsTo(Users);

Songs.hasMany(Song_comments, {onDelete: "cascade"});
Song_comments.belongsTo(Songs);

// Song_likes on delete
Users.hasMany(Song_likes, {onDelete: "cascade"});
Song_likes.belongsTo(Users);

Songs.hasMany(Song_likes, {onDelete: "cascade"});
Song_likes.belongsTo(Songs);

// Post_likes on delete
Users.hasMany(Post_likes, {onDelete: "cascade"});
Post_likes.belongsTo(Users);

Posts.hasMany(Post_likes, {onDelete: "cascade"});
Post_likes.belongsTo(Posts);

export {
  Users,
  Posts,
  Songs,
  Albums,
  Post_comments,
  Song_comments,
  Post_likes,
  Song_likes
};
