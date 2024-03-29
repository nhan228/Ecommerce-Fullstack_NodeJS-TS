
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
import ApiRouter from './routes';
app.use('/api', ApiRouter)
import { viewPort } from './views';
app.use('/', viewPort)

app.listen(3002,()=>{
console.log(`Sever run at:${process.env.SV_HOST}:${process.env.SV_PORT}`);
    
})