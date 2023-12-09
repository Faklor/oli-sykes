import Router from 'express'
import post from '../controllers/postController.js'


const router = new Router()

router.post("/create", post.create)
router.post("/delete", post.delete)
router.post("/update", post.update)
router.post("/comment", post.add_details)
router.get("/get", post.get)

export default router