import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';



const app = express();

//connecting to mongooose
mongoose.connect('mongodb://localhost:27017/reddit', {useNewUrlParser: true} , () => {
    console.log('connected to mongodb');
});

//middleware
app.use(bodyParser.json());
app.use('/api', routes);

export default  app;