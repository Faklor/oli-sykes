import { Songs, Song_comments, Song_likes, Users } from "../models/models.js";
import format from "../middleware/dateFormat.js";

class Song {
  async get(req, res) {
    try {

      await Songs.findAll({

        include: [
          { model: Song_likes },
          {
            model: Song_comments,
            attributes: ["comment", "createdAt"],
            include: [{
              model: Users, 
              attributes: {
                exclude: ['updatedAt', 'password']
              }
            }]
          }
        ],
      })
        .then((songs) => {
          format(songs)
          songs.map((res) => {
            Object.keys(res.dataValues).forEach(item => {
              if (item == "song_likes") {
                res.dataValues[item] = res.dataValues[item].length
              }
              if (item == "song_comments") {
                format(res.dataValues[item])
              }
            })
          })
          res.json({songs})
        })
        .catch((e) => res.json({error: e.message}))
      
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

  async getLike(req, res){
    try{
      const {userId, songId} = req.body

      const user = await  Song_likes.findOne({where:{userId, songId}})
      if(user){
        res.json({like:true})
      }
      else{
        res.json({like:false})
      }

    }
    catch (e) {
      res.json(e.message);
    } 
  }

  async unlike(req, res) {

    const {userId, songId} = req.body
    await Song_likes.destroy({where: {userId, songId}})
      .then(() => res.json({deleted: true}))
      .catch((e) => res.json({error: e.message}))
    
  }
}

export default new Song();
