import db from '../models';
const postController = {};
postController.post = (req,res) => {
    const {
        title,
        link,
        text,
        userId
    } = req.body;
    const post = new db.Post({
        title,
        text,
        link,
        _creator: userId
    });
    //TODO: validation either text of link not both
    post.save().then((newPost) => {
        return res.status(200).json({
            success: true,
            data:newPost
        })
    }).catch((err) => {
        return res.status(500).json({
            message: err
        })
    })
};
postController.getAll = (req,res) => {
    db.Post.find({})
        .populate({path: '_creator', select: 'username createdAt -_id'})
        .populate({
            path: '_comments',
            select: 'text createdAt _creator',
            match: {'isDeleted': false}

        })
        .then((posts) => {
            return res.status(200).json({
                success: true,
                data: posts
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: err
            })
        })
};

postController.put = (req,res) => {
    /*
            * [
            {
                "propName": "title", "value": "This si the updated title"
            }
        ]
    * */
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    db.Post.update({_id: id}, {$set: updateOps})
        .then(result =>{
            console.log(result);
            res.status(200).json(result)
        }).catch(err => {
            res.status(400).json({
                error: err
            })
    })
};


postController.get = (req,res) => {
    const id = req.params.id;
    db.Post.findById(id)
        .populate({path: '_creator', select: 'username createdAt -_id'})
        .populate({
            path: '_comments',
            select: 'text createdAt _creator',
            match: {'isDeleted': false}

        })
        .then(result=> {
        return res.status(200).json({
            result
        })
    }).catch(err => {
        return res.status(500).json({
            error: err
        })
    })
};

postController.delete = (req,res) => {
    const id = req.params.id;
    db.Post.update({_id: id}, {$set: {isDeleted: !db.Post.isDeleted} })
        .then(result => {
            res.status(200).json({
                message: "Post deleted",
                result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

export  default postController;
