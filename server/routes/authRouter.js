import Router from 'express'
import {check} from 'express-validator'
import Auth from '../controllers/authController.js'

const router = new Router()

router.post("/login", [
  check("email").not().isEmpty().trim().isEmail().withMessage("Неправильная почта"),
  check("password").not().isEmpty().trim().isLength({min: 4, max: 20})
  .withMessage("Длина пароля 4 - 20 символов"),
], Auth.login)
router.post("/registration", [
  check("email").not().isEmpty().trim().isEmail().withMessage("Неправильная почта"),
  check("password").not().isEmpty().trim().isLength({min: 4, max: 16})
  .withMessage("Длина пароля 4 - 20 символов"),
], Auth.register)

export default router
