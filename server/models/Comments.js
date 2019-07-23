import mongoose from 'mongoose';

const {Schema}  = mongoose;
mongoose.Promise = global.Promise;
const commentsSchema = new Schema({
    text: {type:String , required: true},
    isDeleted: {type: Boolean, default: false},
    createdAt: {type:Date,default: Date.now},
    _creator: {type: Schema.ObjectId, ref: 'User'},
    _post: {type:Schema.ObjectId, ref: 'Post'}
});
const autoPopulateCreator = function(next) {
  this.populate({
      path: '_creator',
      select: 'username createdAt, -_id'
  });
  next();
};
commentsSchema.pre('find',autoPopulateCreator );



const Comments = mongoose.model('Comments', commentsSchema);
export default Comments;