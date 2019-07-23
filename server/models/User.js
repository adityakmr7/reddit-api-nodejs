import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';

const {Schema}  = mongoose;
mongoose.Promise = global.Promise;
const userSchema = new Schema({
    username: {
        type:String,
        required:[true, "can't be blank"],
        lowercase: true, unique: true,index: true, match: [/^[a-zA-Z0-9]+$/, "is valid"]
    },
    email: {type: String, require: [true, "can't be blank"], lowercase: true,
        unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true
    },
    password: {
       type:String,
        required: true,
    },
    createdAt: {type:Date, default:Date.now()},
    isDeleted: {type:Boolean, default: false},
});

userSchema.plugin(uniqueValidator, {message: 'is already taken'});

//hashing password
userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password , 10).toString()
};

//validate password
userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password)
};

userSchema.methods.generateToken = function(){
    return jwt.sign({
        username: this.username,
        email: this.email
    }, 'secret')
};

userSchema.methods.toAuthJson = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateToken(),
    }
};


const User = mongoose.model('User', userSchema);
export default User;