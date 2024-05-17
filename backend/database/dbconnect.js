import mongoose from "mongoose"

export   const   dbconnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN_Hospital_Management_System"
    }).then(()=>{
        console.log('db connected')
    }).catch((Err)=>{
        console.log(`some err occurred while connecting to db ${Err}`)
    })
}

