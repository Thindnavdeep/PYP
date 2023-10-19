var express = require('express');
var app = express();
var router = express.Router();
var upfile = require('../controllers/uploadController.js');
const multer = require('multer');

const session = require('express-session');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(
    session({
    secret: 'abcd44',
    resave: false,
    saveUninitialized: true,
}));


router.get('/login',upfile.loginget);
router.post('/login',upfile.loginpost);
router.get('/upload',authenticateUser, upfile.uploads);
router.get('/logout',upfile.logout)

function authenticateUser(req, res, next) {
    try {
        if (req.session && req.session.user) {
            next();
        }
        else {
          res.redirect('/login');
        }
    } catch (error) {
        console.log("Error occured",error)
    }
}

const filefolder = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`./public/docs/${req.body.folder}/${req.body.paper}`)
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const uplo = multer({storage:filefolder});



router.post('/upload', uplo.array("upfile"),upfile.ups);
module.exports = router;

