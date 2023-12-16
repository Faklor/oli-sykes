import { Post_comments, Post_likes, Posts, Users } from "../models/models.js";

class Post {
  async get(req, res) {
    try {
      const posts = await Posts.findAll({
        order: [
          ['title', 'ASC'],
        ], 
      })
      const postsWithDetails = await Posts.findAll(
        {
          order: [
            ['title', 'ASC'],
          ],
          include: [
            {
              model: Post_comments, 
              attributes: ["comment"],
              include: [Users]
            }
          ],
        })
    
      res.json({
        data: { posts, postsWithDetails},
      });
    } catch (e) {
      res.json(e.message);
    }
  }
  
  async create(req, res) {
    try {
    
      const {title, description, img} = req.body
      await Posts.create({title, description, img})
        .then(() => res.json({created: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }

  async delete(req, res) {
    try {

      const {id} = req.body
      await Posts.destroy({where: {id}})
      res.json({deleted: true})

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
  
  async add_comments(req, res) {
    try {
    
      const {comment, userId, postId} = req.body
      await Post_comments.create({comment, userId, postId})
        .then(() => res.json({created: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }

  async add_likes(req, res) {
    try {
    
      const {userId, postId} = req.body
      await Post_likes.create({userId, postId})
        .then(() => res.json({created: true}))
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Post();
