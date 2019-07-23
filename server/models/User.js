import mongoose from 'mongoose';

const {Schema}  = mongoose;
mongoose.Promise = global.Promise;
const userSchema = new Schema({
   username: {
       type:String,
       required: true,
       minLength: [5, 'Username must be 5 caracter or more']
   },
    password: {
       type:String,
        required: true,
        minLength: [8, 'Must be 8 caracter']
    },
    createdAt: {type:Date, default:Date.now()},
    isDeleted: {type:Boolean, default: false},
});
//ToDo: encrytpion

const User = mongoose.model('User', userSchema);
export default User;