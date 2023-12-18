import Router from 'express'
import album from '../controllers/albumController.js'


const router = new Router()

router.post("/create", album.create)
router.post("/delete", album.delete)
router.post("/update", album.update)
router.get("/get", album.get)
router.get("/get/:id", album.get)

export default router