import { Sequelize } from "sequelize";
import { Albums, Song_likes, Songs } from "../models/models.js";

class Album {
  async get(req, res) {
    try {
      // Songs of a specific album
      if (req.params.id) {
        await Songs.findAll({
            attributes: {include: [[Sequelize.fn('COUNT', Sequelize.col('songId')), "like"]]},
            where: {albumId: req.params.id},
            include: [{
              model: Song_likes,
              attributes: []
            }],
            raw: true,
            group: ["Songs.id"],
          })
          .then((songs) => res.json({songs}))
          .catch((e) => res.json({error: e.message}))
        return
      }
      // Send ALL Albums
      const albums = await Albums.findAll({
        order: [
          ['title', 'ASC'],
        ], 
      })
      // Send Albums WITH SONGS
      const songs = await Albums.findAll(
        {
          order: [
            ['title', 'ASC'],
          ],
          include: [
            {model: Songs, attributes: ["title", "id", "url"]}
          ],
        })
    
      res.json({ albums: albums, songs: songs });
      
    } catch (e) {
      res.json(e.message);
    }
  }
  
  async create(req, res) {
    try {
    
      const {title, img} = req.body
      await Albums.create({title, img})
        .then(() => res.json({created: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }

  async delete(req, res) {
    try {
    
      const {id} = req.body
      await Albums.destroy({where: {id}})
      res.json({deleted: true})

    } catch (e) {
      res.json(e.message);
    }
  }
  
  async update(req, res) {
    try {
    
      const { id, title, url } = req.body

      await Albums.update({title, url}, {where:{id}})
        .then(() => res.json({updated: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Album();
