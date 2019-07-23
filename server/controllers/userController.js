import db from '../models';
import passport from  'passport';

const userController = {};
userController.post = (req,res) => {
    const user = new db.User();
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);

    user.save().then((newUser) => {
        res.status(200).json({
            success: true,
            data: {
                newUser,
                token: user.toAuthJson(),
            },

        })
    }).catch(err => {
        res.status(500).json({
            message: err.toString(),
        })
    })
};
//TODO:add Login here
userController.login = (req,res, next) => {
    if(!req.body.user.email) {
        return res.status(422).json({error: "Can't be blank"})
    }
    if(!req.body.user.password) {
        return res.status(422).json({error: "Can't be blank"})
    }
    passport.authenticate('local', {session:false}, (err, user,info)=>{
        if(err)return next(err);
        if(user) {
            user.token = user.generateToken();
            return res.json({user: user.toAuthJson()})
        }else {
            return res.status(422).json(info);
        }
    })(req,res,next);
};
//TODO: SOme problem in login routes



export default  userController;