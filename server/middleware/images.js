import multer from 'multer'

const storage = multer.diskStorage({
  destination : function ( req , file , cb ){
    cb(null, 'uploads')
  },
  filename : function (req, file , cb){
      var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

      cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

const images = async(req, res, next) => {

  let store = multer({storage: storage}).single('pic')

  store(req, res, (err) => {
    if(err instanceof multer.MulterError) {
      return res.json({message: false})
    }
    next()
  })
}
export default images