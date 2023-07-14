class ApiFeatures{
    constructor(query,queryStr){  //queryStr==keyword  
        this.query=query;
        this.queryStr=queryStr;
    }
    
    search(){
        const keyword= this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i", //case insensetive 
            },
        }:{};

        // console.log(keyword);
   //                         find({name:"somasa"})
        this.query=this.query.find({...keyword});
        return this;
    }


    filter(){
        const queryCopy={...this.queryStr}  //copy of queryStr
        // Removing some fields for category
        const removeFields=["keyword","page","limit"];
        
        removeFields.forEach(key=>delete queryCopy[key]); 

        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);

        //string convert   into   object
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    

    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)|| 1;

        const skip= resultPerPage*(currentPage-1);

        this.query=this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}


module.exports =ApiFeatures