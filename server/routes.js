import express from 'express';
import auth from './auth';
//import controllers
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
//TODO: add authentication routes

routes.post('/post', postController.post);
routes.get('/posts', postController.getAll);

//comments routes
routes.post('/comment', auth.required, commentController.post);


export default routes;
