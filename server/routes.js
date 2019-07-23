import express from 'express';
//controller imports
import basicController from './controllers/basicController';
import userController from './controllers/userController';
import postController from './controllers/postController';
import commentController from './controllers/commentController';

const routes =  express();
//basic routes
routes.get('/', basicController.get);
//User Routes
routes.post('/signup', userController.post);
routes.post('/login', userController.login);

//Post Rotues
routes.post('/post', postController.post);
routes.get('/posts', postController.getAll);

//comments routes
routes.post('/comment', commentController.post);


export default routes;
