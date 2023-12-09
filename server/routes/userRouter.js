import Router from 'express'
import {check} from 'express-validator'
import user from '../controllers/userController.js'
import images from '../middleware/images.js'

const router = new Router()

router.post("/email", [
  check("email").not().isEmpty().trim().isEmail().withMessage("Incorrect email"),
], user.Email)

router.post("/password", [
  check("password").not().isEmpty().trim().isLength({min: 4, max: 20})
  .withMessage("The password length must be between 4 and 20 characters"),
], user.Password)

router.post("/image", images, user.Update_user_pic)



export default router