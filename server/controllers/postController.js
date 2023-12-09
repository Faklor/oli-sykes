import { Posts } from "../models/models.js";

class Post {
  async get(req, res) {
    try {
      const categories = await Categories.findAll({
        order: [
          ['name', 'ASC'],
        ], 
      })
      const products = await Products.findAll(
        {
          order: [
            ['name', 'ASC'],
          ],
          include: [
            {model: Categories, attributes: ["name", "id"]},
            {model: Product_details, attributes: ["size", "color", "id"]}
          ],
        })
    
      res.json({
        data: { },
      });
    } catch (e) {
      res.json(e.message);
    }
  }
  
  async create(req, res) {
    try {
    
      const {title, description, img} = req.body
      await Posts.create({title, description, img})
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
  
  async add_comment(req, res) {
    try {
    
      res.json({
        data: { },
      });

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Post();
