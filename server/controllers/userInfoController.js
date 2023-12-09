import { Users } from "../models/models.js";
import bcrypt from "bcrypt";
import fs from 'fs'
import path from "path"

class UserInfo {
  async Email(req, res) {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({error: errors.mapped()});
      }

      const check = await Users.findOne({where: {email}})
      if(check) {
        return res.json({error: {email: {msg: "Email already exist"}}})
      }
      const data = await Users.update({email}, {where: {id: req.data.id}})
      if(data == 0) {
        return res.json({error: "Error"})
      }
      res.json({updated: true})

    } catch (e) {
      res.json({error: e.message});
    }
  }

  async Password(req, res) {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({error: errors.mapped()});
      }

      const {password} = req.body
      const hash_pass = await bcrypt.hashSync(password, 6);
      const data = await Users.update({password: hash_pass}, {where: {id: req.data.id}})

      if(data == 0) {
        return res.json({error: {password: {msg: "Error"}}})
      }
      res.json({updated: true})

    } catch (e) {
      res.json({error: e.message});
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
}

export default new UserInfo()