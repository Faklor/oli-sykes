import bcrypt from "bcrypt";
import fs from 'fs'
import path from "path"
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
        return res.json({loggedIn: false, message: "User doesn't exist"});
      } 

      const valid = await bcrypt.compareSync(password, user.password);
      if (!valid) {
        return res.json({loggedIn: false, message: "Incorrect password"});
      } 
      const { ["password"]: unused, ...user_data } = user;
      res.json({
        loggedIn: true, 
        user: user_data});

    } catch (e) {
      res.json(e.message);
    }
  }
  
  // Reg POST
  async register(req, res) {

    const { name, email, password } = req.body;
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({error: errors.mapped()});
      }

      const hash_pass = await bcrypt.hashSync(password, 6);
      await Users.create({ name, email, password: hash_pass })
        .then(() => res.json({message: true}))
        .catch((e) => res.json({error: e.message}));

    } catch (e) {
      res.json(e.message);
    }
  }

  async Update_user_pic(req, res) {
    try {

      const {email} = req.body
      
      if(!email) { 
        return res.status(400).json({error: "Empty Body"})
      }

      const file = req.file
      const img = fs.readFileSync(file.path)
      const encode_image = img.toString('base64')

      await Users.update({
        filename: file.originalname,
        contentType: file.mimetype,
        imageBase64: encode_image}, {where: {email}})
        .then(() => {

          res.json({updated: true}) 
          fs.readdirSync("./uploads").forEach(file => {
            fs.rmSync(path.join("./uploads", file));
          });

        })
        .catch((e) => res.json({error: e.message}))

    } catch (e) {
      res.json(e.message);
    }
  }

  async get(req, res) {
    try {
      const users = await Users.findAll({})
      res.json({
        users
      });
      
    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new Auth();
