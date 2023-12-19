import format from "../middleware/dateFormat.js";
import { Post_comments, Post_likes, Posts, Users } from "../models/models.js";

class Post {
  async get(req, res) {
    try {
      await Posts.findAll({
        include: [
          { model: Post_likes },
          {
            model: Post_comments,
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
        .then((posts) => {
          format(posts)
          posts.map((res) => {
            Object.keys(res.dataValues).forEach(item => {
              if (item == "post_likes") {
                res.dataValues[item] = res.dataValues[item].length
              }
              if (item == "post_comments") {
                format(res.dataValues[item])
              }
            })
          })
          res.json({posts})
        })
        .catch((e) => res.json({error: e.message}))
      return

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
    
      const { id, title, url, img } = req.body

      await Posts.update({title, url, img}, {where:{id}})
        .then(() => res.json({updated: true}))
        .catch((e) => res.json({error: e.message}))

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
      const [likes, created] = await Post_likes.findOrCreate({ 
        where: { userId, postId }})
      if(created) {
        res.json({created: true})
        return
      }
      if (likes)
        res.json({created: false, message: "User already liked that post"})

    } catch (e) {
      res.json(e.message);
    }
  }

  async unlike(req, res) {

    const {userId, postId} = req.body
    await Post_likes.destroy({where: {userId, postId}})
      .then(() => res.json({deleted: true}))
      .catch((e) => res.json({error: e.message}))
    
  }
}

export default new Post();
