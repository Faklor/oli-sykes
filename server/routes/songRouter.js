import Router from 'express'
import song from '../controllers/songController.js'


const router = new Router()

router.post("/create", song.create)
router.post("/delete", song.delete)
router.post("/update", song.update)
router.post("/comment", song.add_details)
router.post("/get", song.get)

export default router