import { Songs, Albums, Song_details } from "../models/models.js";

class Song {
  async get(req, res) {
    try {

      res.json({

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
      id.map(async(res) => (
        await Songs.destroy({where: {id}})
      ))
      res.json({deleted: true})

    } catch (e) {
      res.json(e.message);
    }
  }

  async update(req, res) {
    try {
      
      res.json({

      });

    } catch (e) {
      res.json(e.message);
    }
  }
  
  async add_details(req, res) {
    try {
      
      const {comment, userId, postId} = req.body
      await Song_details.create({comment, userId, songId})
        .then(() => res.json({created: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Song();
