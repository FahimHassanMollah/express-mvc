const express = require('express');
const router = express.Router();
const fs = require('fs');
const server = express();

const productController = require('./controller/productController');
const productRoute = require('./routes/productRoute');


server.use(express.json());
server.use(express.urlencoded());
server.use('/api/v1',productRoute);


const products =  fs.readFileSync('./data.json','utf8',(error,file) => {
    // console.log(file);
    // return file;
});

server.use((req,res,next)=>{
    console.log(req.url);
    next();
    
});


const auth = (req,res,next) => { 
    console.log(req.method);
    if (req.method === 'GET') {
        if (req.query.password === "123") {
            next(); 
         }
         else {
             res.sendStatus(401);
         }
    }
    if (req.method === 'POST') {
        console.log(req.body);
        if (req.body.password === "123") {
            next(); 
         }
         else {
             res.sendStatus(401);
         }
    }
    
}


// server.get('/',productController.index);


server.get('/products/:id' ,(req,res) => {
   res.json(req.params);
});

server.post('/',auth ,(req,res) => {
   req.method

    res.json(JSON.parse(products));
});




server.listen(8080, () => {
    console.log('server is running');
});