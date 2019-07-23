import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';



const app = express();

//connecting to mongooose
mongoose.connect('mongodb://localhost:27017/reddit', {useNewUrlParser: true} , () => {
    console.log('connected to mongodb');
});

//passport /config/passport.js
require('./config/passport');

//middleware
app.use(bodyParser.json());
//Routes
app.use('/api', routes);

export default  app;