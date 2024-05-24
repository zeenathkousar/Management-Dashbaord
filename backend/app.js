import express from 'express';
import {config} from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import  {dbconnection} from './database/dbconnect.js';
import messageRouter from "./Router/messageRouter.js";
import { errorMiddleware } from './middlewares/errorMidleware.js';
import userRouter from './Router/userRouter.js'


const app=express();
config({path: "./config/config.env"})

// app.use('/', express.static('public', {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.js')) {
//         res.setHeader('Content-Type', 'text/javascript');
//       }
//     }
//   }));
  
app.use(
    cors({
    origin: [process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true,
})
);


//middleware to get cookies
app.use(cookieParser())
app.use(express.json()) //parse our incomming json format data into string
app.use(express.urlencoded({extended:true}));  //to recognize data formats or any other string formats

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
})) //for uploading files.


app.use('/api/v1/message',messageRouter);
app.use('/api/v1/user',userRouter)


app.get('/',(req,res)=>{
    res.send('hello app')
})

dbconnection();



app.use(errorMiddleware)
export default app;