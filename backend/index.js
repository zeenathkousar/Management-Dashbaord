import  app from './app.js';

app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
})

