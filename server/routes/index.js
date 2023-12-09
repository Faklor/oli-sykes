import Router from 'express'
import userInfoRouter from './userInfoRouter.js'
import authRouter from './authRouter.js'

const router = new Router();

router.use("/api/profile", userInfoRouter)
router.use("/api", authRouter)

export default router
