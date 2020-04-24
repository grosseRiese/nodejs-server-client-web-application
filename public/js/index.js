
let myCart = document.querySelector('#my-cart');
const loopDataInHtml = (results) =>{
    
    const productColumns = document.querySelector('#productsSection');
    results.forEach(element => { 
        let resultsItem = document.createElement('article');
        resultsItem.setAttribute('class', 'col-md-4');
        //resultsItem.setAttribute('id', element.id);
        resultsItem.innerHTML = `<figure class="card card-product">
                                    <div class="img-wrap">
                                        <img src="${element.image}">
                                    </div>
                                    <figcaption class="info-wrap">
                                        <h4 class="title">${element.product}</h4>
                                        <p class="desc">This product \' ${element.product} \', has not made in China. </p>
                                    </figcaption>
                                    <div class="bottom-wrap">
                                        <a href="#" class="btn btn-sm btn-danger float-right" id="${element.id}">Buy</a>	
                                        <div class="price-wrap h5">
                                            <span class="price-new"> ${element.price} kr</span> <del class="price-old">5990 kr</del>
                                        </div> 
                                    </div>
                                </figure>
                            </article>`;
        productColumns.append(resultsItem);
    });
        pressBtnToAdd(); 
}
const getProducts = async ()=> {
    let url = 'http://localhost:5000/api/getAllProducts'
   await fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => loopDataInHtml(data))
        .catch(err => console.error('Error: ' + err));
}
getProducts();

//Acount the items in my Cart...

let countItemsInCart = (data)=> {
    let acouItems = 0;
    data.forEach(element => {
        acouItems++;
    })
    console.log(acouItems)
    myCart.innerHTML = acouItems;
}
//Get Cart items
const getCartItems=()=>{
    let url = 'http://localhost:5000/api/cart/getCartItems'
    fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(data => countItemsInCart(data))
        .catch(err => console.error(err))
}
getCartItems();

/********************************************************************** 
* Press the btn to add a new item...
**********************************************************************/
 
 const addToShoppingCart = (e)=>{
     let targetElement = e.target.id;
     let url = `http://localhost:5000/api/cart/addItem?id=${targetElement}`;
     fetch(url, { method: 'POST' })
         .then(res => res.json())
         .then(data => console.log(data.message))
         .catch(err => console.error(err));

         getCartItems();
 }

const pressBtnToAdd = ()=> {
   const productsSection = document.querySelector('#productsSection');
   btnAddEvenListner(productsSection);
}

const btnAddEvenListner=(items)=> {
        items.addEventListener('click', (e) => {
            addToShoppingCart(e);
        });
}
/********************************************************************** 
**********************************************************************/