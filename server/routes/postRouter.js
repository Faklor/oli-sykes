import Router from 'express'
import post from '../controllers/postController.js'


const router = new Router()

router.post("/create", post.create)
router.post("/delete", post.delete)
router.post("/update", post.update)
router.post("/comment", post.add_comments)
router.post("/like", post.add_likes)
router.post("/unlike", post.unlike)
router.get("/get", post.get)

export default router