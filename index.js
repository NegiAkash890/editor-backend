// Importing Modules
const express = require('express') ;
const app = express() ;
const cors = require('cors');
const code__result = require('./output/output');

// Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({}));

// Routes
app.get('/',(req, res)=>{
  res.send('Welcome to Online Compiler');
})

app.post("/compile",(req,res)=>{
    let { language = "cpp", code,input } = req.body ;

    if( code === undefined) {
        return res.status(400).json({success : false, error : 
        "Empty Code Body"})
    }
    else{
        code__result(language,code,input)
        .then((response)=>
               {
                   return res.status(200).json({success:true,result:response})
                })
        .catch(err => { 
                   return res.status(400).json({success : false, error : err});
                })              
    }
    
})

const PORT = process.env.PORT || 8080
// Server
app.listen(PORT,()=>{
    console.log('Server is Healthy')
})