import { Users } from "../models/models.js";
import bcrypt from "bcrypt";

class UserInfo {
  async Email(req, res) {
    try {

      const check = await Users.findOne({where: {email}})
      if(check) {
        return res.json({error: {email: {msg: "Такой email уже есть"}}})
      }
      const data = await Users.update({email}, {where: {id: req.data.id}})
      if(data == 0) {
        return res.json({error: "Ошибка"})
      }
      res.json({updated: true})

    } catch (e) {
      res.json({error: e.message});
    }
  }

  async Password(req, res) {
    try {

      const {password} = req.body
      const hash_pass = await bcrypt.hashSync(password, 6);
      const data = await Users.update({password: hash_pass}, {where: {id: req.data.id}})

      if(data == 0) {
        return res.json({error: {password: {msg: "Ошибка"}}})
      }
      res.json({updated: true})

    } catch (e) {
      res.json({error: e.message});
    }
  }

  async Update_user_pic(req, res) {
    try {
      const {id} = req.body
      
      if(!id) {
        return res.json({error: "Empty Body"})
      }

      const file = req.file
      const img = fs.readFileSync(file.path)
      const encode_image = img.toString('base64')

      await Users.update({
        filename: file.originalname,
        contentType: file.mimetype,
        imageBase64: encode_image}, {where: {id}})
        .then(() => res.json({updated: true}))
        .catch((e) => res.json({error: "Ошибка"}))

    } catch (e) {
      res.json(e.message);
    }
  }
}

export default new UserInfo()