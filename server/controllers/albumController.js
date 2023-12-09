import { Albums, Songs } from "../models/models.js";

class Album {
  async get(req, res) {
    try {
      const albums = await Albums.findAll({
        order: [
          ['title', 'ASC'],
        ], 
      })
      const songs = await Albums.findAll(
        {
          order: [
            ['title', 'ASC'],
          ],
          include: [
            {model: Songs, attributes: ["title", "id", "likes", "url"]}
          ],
        })
    
      res.json({
        data: { albums: albums, songs: songs},
      });
    } catch (e) {
      res.json(e.message);
    }
  }
  
  async create(req, res) {
    try {
    
      const {title, img} = req.body
      await Albums.create({title, img})
        .then(() => res.json({create: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }

  async delete(req, res) {
    try {
    
      res.json({
        data: { },
      });

    } catch (e) {
      res.json(e.message);
    }
  }
  
  async update(req, res) {
    try {
    
      res.json({
        data: { },
      });

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Album();
