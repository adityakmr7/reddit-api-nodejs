import db from '../models';
const commentsController = {};
commentsController.post = (req,res) => {
    const {userId, text, postId} = req.body;
    const comments = new db.Comments({
        text,
        _creator: userId,
        _post: postId,
    });
    comments.save().then((newComment) => {
        db.Post.findByIdAndUpdate(
            postId,
            {$push: {'_comments': newComment._id}}
        ).then((existingPost) =>{
            res.status(200).json({
                success: true,
                data: newComment,
                existingPost
            });
        }).catch((err) => {
            res.status(500).json({
                message: err
            });
        });

    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    });
};



export  default commentsController;
