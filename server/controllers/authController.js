import bcrypt from "bcrypt";
import {validationResult} from 'express-validator'
import { Users } from "../models/models.js";

class Auth {
  // Login POST
  async login(req, res) {

    const { email, password } = req.body;
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({error: errors.mapped()});
      }

      const user = await Users.findOne({ raw: true, where: { email } });

      if (!user) {
        return res.json({loggedIn: false, message: "Пользователя с таким e-mail не существует"});
      } 

      const valid = await bcrypt.compareSync(password, user.password);
      if (!valid) {
        return res.json({loggedIn: false, message: "Неверный пароль"});
      } 
      res.json({loggedIn: true});

    } catch (e) {
      res.json(e.message);
    }
  }
  
  // Reg POST
  async register(req, res) {

    const { email, password } = req.body;
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({error: errors.mapped()});
      }

      const hash_pass = await bcrypt.hashSync(password, 6);
      await Users.create({ email, password: hash_pass })
        .then(() => res.json({message: true}))
        .catch(() => res.json({message: false}));

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Auth();
