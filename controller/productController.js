const fs = require('fs');
const products =  fs.readFileSync('./data.json','utf8');

const index = (req,res) => { 
    res.status(201).json(JSON.parse(products));
 }

 exports.index = index;
