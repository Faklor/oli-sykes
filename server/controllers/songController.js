import { Songs, Song_comments, Song_likes } from "../models/models.js";
import pkg from 'sequelize';
const {Op} = pkg

class Song {
  async get(req, res) {
    try {
      const songs = await Songs.findAll({})
      res.json({
        songs
      });
      
    } catch (e) {
      res.json(e.message);
    }
  }

  async create(req, res) {
    try {
      
      const {title, url, albumId} = req.body
      await Songs.create({title, url, albumId})
        .then(() => res.json({created: true}))
        .catch((e) => res.json({error: e.message}))
      
    } catch (e) {
      res.json(e.message);
    }
  }
  
  async delete(req, res) {
    try {
      
      const {id} = req.body
      await Songs.destroy({where: {id}})
      res.json({deleted: true})

    } catch (e) {
      res.json(e.message);
    }
  }

  async update(req, res) {
    try {

      const { id, title, url, albumId } = req.body

      await Songs.update({title, url, albumId}, {where:{id}})
        .then(() => res.json({updated: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }
  
  async add_comments(req, res) {
    try {
      
      const {comment, userId, songId} = req.body
      await Song_comments.create({comment, userId, songId})
        .then(() => res.json({created: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }

  async add_likes(req, res) {
    try {

      const {userId, songId} = req.body
      const [likes, created] = await Song_likes.findOrCreate({ 
        where: { userId, songId }})
      console.log(likes)
      console.log(created)
      if(created) {
        res.json({created: true})
        return
      }
      if (likes)
        res.json({created: false, message: "User already liked that song"}) 

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Song();
