const mongoose = require("mongoose");  

mongoose.connect(process.env.LINK,{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
    // useCreateIndex:true
}).then(()=>{
    console.log(`Mongodb connection successful`);
})