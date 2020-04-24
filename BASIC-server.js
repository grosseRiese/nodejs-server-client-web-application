const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/eCommerceDb.json');
const db = low(adapter);
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const addProductsModule = require('./modules/addProducts');
const resReqServer= require('./modules/reqRes-Server');
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use(express.json());


const initDatabase=()=>{
    //Check if products exists...NOT Allow duplicate db...
     db.has('products').value()
                        ? (console.log(`Already have this database ...!`) )
                        : ( db.defaults({ products: [], cart: [] ,count: 0}).write(),
                            console.log('New DB has been created ... ') );
}
resReqServer(app,db);
app.listen(port,()=> {
    initDatabase();
    console.log(`Listening on port ${port} ...`);
    addProductsModule(app,db);
    });