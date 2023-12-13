import Router from 'express'
import {check} from 'express-validator'
import Auth from '../controllers/authController.js'
import images from '../middleware/images.js'

const router = new Router()

router.post("/login", [
  check("email").not().isEmpty().trim().isEmail().withMessage("Incorrect email format"),
  check("password").not().isEmpty().trim().isLength({min: 4, max: 20})
  .withMessage("The password length must be between 4 and 20 characters"),
], Auth.login)

router.post("/registration", [
  check("email").not().isEmpty().trim().isEmail().withMessage("Incorrect email format"),
  check("password").not().isEmpty().trim().isLength({min: 4, max: 20})
    .withMessage("The password length must be between 4 and 20 characters"),
  check("name").not().isEmpty().trim().withMessage("Can't be empty"),
], Auth.register)

router.post("/image", images, Auth.Update_user_pic)

router.get("/users",Auth.get)

export default router
