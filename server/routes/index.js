import Router from 'express'
import userRouter from './userRouter.js'
import authRouter from './authRouter.js'
import songRouter from './songRouter.js'
import postRouter from './postRouter.js'
import albumRouter from './albumRouter.js'

const router = new Router();

router.use("/api/profile", userRouter)
router.use("/api/song", songRouter)
router.use("/api/post", postRouter)
router.use("/api/album", albumRouter)
router.use("/api", authRouter)

export default router
