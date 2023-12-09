import Router from 'express'
import {check} from 'express-validator'
import userInfo from '../controllers/userInfoController.js'
import images from '../middleware/images.js'

const router = new Router()

router.post("/email", [
  check("email").not().isEmpty().trim().isEmail().withMessage("Incorrect email"),
], userInfo.Email)

router.post("/password", [
  check("password").not().isEmpty().trim().isLength({min: 4, max: 20})
  .withMessage("The password length must be between 4 and 20 characters"),
], userInfo.Password)

router.post("/image", images, userInfo.Update_user_pic)



export default router