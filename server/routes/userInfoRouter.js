import Router from 'express'
import {check} from 'express-validator'
import userInfo from '../controllers/userInfoController.js'


const router = new Router()

router.post("/email", [
  check("email").not().isEmpty().trim().isEmail().withMessage("Неправильная почта"),
], userInfo.Email)
router.post("/password", [
  check("password").not().isEmpty().trim().isLength({min: 4, max: 20})
  .withMessage("Длина пароля 4 - 20 символов"),
], userInfo.Password)



export default router