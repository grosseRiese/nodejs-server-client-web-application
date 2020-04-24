module.exports = (app, db) => {
   
     /**
     * 
     * Products section
     */
    //all products in db.
    let allProducts = ()=>{
        return db.get('products').value();
    }
    //Get all products ...api.
    app.get('/api/getAllProducts',async (req,res)=>{
        let _products = await allProducts();
        //console.log(_products);
        res.send(JSON.stringify(_products));
    });
    //Get a product :id ...api.
    app.get('/api/getProduct/:id',async (req, res) => {
        let selectedProduct = await allProducts().filter(item => item.id == parseInt(req.params.id)); 
        console.log(selectedProduct);
        res.send(JSON.stringify(selectedProduct));
    });
    /**
     * 
     * Cart section
     */
    //All items in cart-db
    const allCartItems = res => {
        return db.get('cart').value();
    }
    //get all items in cart -req-
    app.get('/api/cart/getCartItems', async (req, res) => {
        let allItems = await allCartItems();
        //console.log(allItems);
        res.send(JSON.stringify(allItems));
    });
    //Get item by :id
    app.get('/api/cart/getCartItem/:id', async (req, res) => {
        let selectedItem = await allCartItems().filter(item => item.id == parseInt(req.params.id));
        console.log(selectedItem);
        res.send(JSON.stringify(selectedItem));
    });
    // Add operations...search after that porduct in products[]!
    const searchProduct = (sendItem)=>{
        let findItem = {id:parseInt(sendItem.id)};
        let addItem = db.get('products').find(findItem).value();
        return addItem;
    }
    //Validate before add to cart
    const addToCart = async (sendProduct, res) => {  

    try{   

        let findProduct = await db.get('cart')
                            .find( {id : parseInt(sendProduct.id),
                                    product : sendProduct.product})
                            .value();

        let responseSuccess = {
            Success:true,
            message: 'Product has added to shopping Cart'
        }
        let responseError = {
            Status: 'Error: - What you doing!?',
            message: 'Cann\'t add this , the product is already in shopping Cart!'
        }
     
       findProduct != undefined
                    ? ( res.send(JSON.stringify(responseError)),
                        console.log(responseError))
                    : ( db.get('cart').push(sendProduct).write(),
                        res.send(JSON.stringify(responseSuccess)),
                        incrementCount(),
                        sumOfPriceToCartItems(),
                        console.log(responseSuccess ,itemsNumInCart()) );  
        }catch{
            message = {
                status: 'Not valid',
                message: 'Product not found or something went wrong!'
            };
             res.send(JSON.stringify(message));
             console.log(message);
        } 
    }
    /***
     * Add item
     * http://localhost:5000/api/cart/addItem?id=...
     */
    app.post('/api/cart/addItem', async (req, res) => {
        let sendItem = req.query;
        console.log(sendItem);
        await addToCart(searchProduct(sendItem), res);
    });
    // Delete operations...search after that porduct in cart[]!
    const findCartsProduct=(sendItem)=>{
       let findItem = {id:parseInt(sendItem.id)};
       let deleteCartItem = db.get('cart').find(findItem).value();
       return deleteCartItem;
    }
      //Validate before delete from cart
    const removeFromCart = async (sendMatchedItem, res) => {
      
      let responseSuccess = {
          Success:true,
          message: 'Product has deleted from shopping Cart'
      }    
      let responseError = {
          Status: 'Error: Bad bad bad!',
          message: 'There is no such as product in shopping Cart!'
      }
     
      sendMatchedItem != undefined
                  ? ( db.get('cart').remove(sendMatchedItem).write(),
                      res.send(JSON.stringify(responseSuccess)),
                      decrementCount(),
                      sumOfPriceToCartItems(),
                      console.log(responseSuccess, itemsNumInCart() ))
                  : ( res.send(JSON.stringify(responseError)),
                      console.log(responseError));
    }
     /***
     * Delete item
     * http://localhost:5000/api/cart/removeItem?id=...
     */
    app.delete('/api/cart/removeItem',async (req, res) => {
        let deleteSentItem = req.query;
        console.log(deleteSentItem);
        await removeFromCart(findCartsProduct(deleteSentItem), res);
    });
     // Increment count by 1
    let incrementCount=()=>{
        db.update('count', n => n + 1)
          .write();
    }
     //Decrement count by 1
    let decrementCount=()=>{
        db.update('count', n => (n <= 0 ? 0 : n - 1))
          .write();
    }
    //The number of cart-items
    let itemsNumInCart =()=>{
      return db.get('count').value();
    }
    //the sum of prices to items in the cart
    let sumOfPriceToCartItems =()=>{
        let sum = 0;
        let arrayMyPrice = db.get('cart').value();
        arrayMyPrice.forEach(element => {
           return sum += parseInt( element.price) ; 
        });
       console.log('Sum for each one : ', sum)
    }
}