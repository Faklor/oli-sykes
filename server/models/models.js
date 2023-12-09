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

const Post_details = sequelize.define(
  "post_details",
  {
    comment: { type: DataTypes.STRING, required: true },
    like: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {timestamps: true}
);

const Song_details = sequelize.define(
  "song_details",
  {
    comment: { type: DataTypes.STRING, required: true },
    like: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {timestamps: true}
);

Users.belongsToMany(Posts, { through: Post_details });
Posts.belongsToMany(Users, { through: Post_details });

Songs.belongsToMany(Users, { through: Song_details });
Users.belongsToMany(Songs, { through: Song_details });

Albums.hasMany(Songs, { onDelete: "cascade" });
Songs.belongsTo(Albums);

Users.hasMany(Post_details, {onDelete: "cascade"});
Post_details.belongsTo(Users);

Users.hasMany(Song_details, {onDelete: "cascade"});
Song_details.belongsTo(Users);

Posts.hasMany(Post_details, {onDelete: "cascade"});
Post_details.belongsTo(Posts);

export {
  Users,
  Posts,
  Songs,
  Albums,
  Post_details,
  Song_details
};
