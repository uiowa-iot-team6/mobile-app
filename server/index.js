import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authRouter } from './routes/AuthRoute.js';
import { UserRouter } from './routes/UserRoutes.js';
import {foodRouter} from './routes/foodRoutes.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/user', UserRouter);
app.use('/food', foodRouter);
const dbUri =
    'mongodb+srv://saanbe16:I5a6pS85VfNTRXHl@cluster0.87fmhhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose
    .connect(dbUri)
    .then(r => console.log('db connected'))
    .catch(e => console.log('DB not connected check IP'));
app
    .listen(3002, () => console.log('SERVER STARTED'))
    .on('error', err => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Error: Port 3002 is already in use.`);
        } else {
            console.log('Error starting the app:', err);
        }
    });
export default app;
