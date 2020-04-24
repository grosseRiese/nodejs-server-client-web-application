module.exports = (app, db) => {

    /**
     * 
     * add products for one time*
     */
    let addProduct=()=>{
      let ID =1 ;
      let productsArr = db.get('products').value();
      for (ID  ; ID < productsArr.length +1; ID++) {
          if(ID === productsArr[ID]){
              ID++;
              //console.log("IF: ", ID);
          }
          //console.log("for: ", ID);
      }

      db.get('products')
          .push({id:ID,product:'Cap with hotdogs',price:'199',image:'https://placeimg.com/640/480/any'})
          .write();
   }

    // Add a product for 10 times.
    //for(let j=1 ; j<=10 ; j++){
       // addProduct(); 
   // }
     
}