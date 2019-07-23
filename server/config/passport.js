import db from '../models';
import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
},
    function(email, password, done) {
        db.User.findOne({email: email}).then(user => {
            if(!user) {
                return done(null, false, {error: 'email or password is invalid'})
            }
            if(!user.validatePassword(password)){
                return done(null, false, {errors: {'email of password': 'is invalid'}});
            }
            return done(null, user);
        }).catch(done);
    }
));