import { Songs, Albums } from "../models/models.js";

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
        .then(() => res.json({create: true}))
        .catch((e) => res.json({error: e.message}))
      
    } catch (e) {
      res.json(e.message);
    }
  }
  
  async delete(req, res) {
    try {
      
      res.json({

      });

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
  
  async add_comment(req, res) {
    try {
      
      res.json({

      });

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Song();
