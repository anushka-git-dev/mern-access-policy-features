import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';   
import studentRouter from './routes/studentRouter.js';
import userRouter from './routes/userRouter.js';
import { sessionTimeoutHandler } from './middlewares/sessionTimeout.js';

const app = express();

app.use(bodyParser.json());
app.use(sessionTimeoutHandler);

// DB Connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.y7qlb1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("DB connected..."))
    .catch(() => console.log("DB connection failed."));

app.use('/students', studentRouter);
app.use('/users', userRouter);

app.listen(4000, () => console.log("Server is running on port 4000"));