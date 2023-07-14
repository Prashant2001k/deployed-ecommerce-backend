require('dotenv').config();
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");

const errorMiddleware=require("./middleware/error");
const cloudinary = require('cloudinary');
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const path = require("path");
require("./db/conn");

const port=process.env.PORT || 3002;
// console.log(process.env.LINK)
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


//route Imports
const product =require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");

app.use("/api/vi",product);
app.use("/api/vi",user);
app.use("/api/vi",order);
app.use("/api/vi",payment);

//Middleware for Error 
app.use(errorMiddleware);


//Unhandled Uncaught Expection
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});
 
// console.log(Ypoutune);



//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`); 
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(()=>{
        process.exit(1);
    })
}); 




const server=app.listen(port,()=>{
    console.log(`successfully Work! on Port : ${port}`);
})    


// module.exports=app;