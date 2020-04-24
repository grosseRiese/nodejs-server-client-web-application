
 const loopCartDataInHtml = (results) =>{
    let numberOfitems =0;
    const productInCart = document.querySelector('#myProductsInMyCart');
    const sumCartItemsClass= document.querySelector('.sumClass');
    const sumCartItemsID= document.querySelector('#sumClass');
    let sum =0;
    results.forEach(element => {
        sum  += parseInt(element.price);
        numberOfitems++;
        let resultsItem = document.createElement('tr');
        resultsItem.setAttribute('id', element.id);
            resultsItem.innerHTML = `<td data-th="Product">
                                        <div class="row">
                                            <div class="col-sm-2 hidden-xs"><img src="${element.image}" alt="..." class="img-responsive"/></div>
                                            <div class="col-sm-10">
                                                <h4 class="nomargin">${element.product}</h4>
                                                <p> Quis: ${element.product}  aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet.</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Price">${element.price} kr</td>
                                    <td data-th="Quantity">
                                        <input type="number" class="form-control text-center" value="1" disabled/>
                                    </td>
                                    <td data-th="Subtotal" class="text-center">${element.price}</td>
                                    <td class="actions" data-th="">
                                        <button class="btn btn-info btn-sm" disabled><i class="fa fa-refresh"></i></button>
                                        <button class="btn btn-danger btn-sm" id="${element.id}"><i class="fa fa-trash-o" id="${element.id}"></i></button>								
                                    </td>
                                </tr> `;
        productInCart.append(resultsItem);
    });

    sumCartItemsClass.append(sum);
    sumCartItemsID.append(sum);
    pressBtnToRemove();
    //console.log(sum);
    //console.log(numberOfitems);
    //console.log(itemsInCart(numberOfitems));
}

const getCartItems = async ()=> {
    let url = 'http://localhost:5000/api/cart/getCartItems'
   await fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => loopCartDataInHtml(data))
        .catch(err => console.error('Error: ' + err));
}
getCartItems();

/************************************************************************************
 * Press the btn to remove an item...
 ************************************************************************************/
const deleteFromShoppingCart = (e)=> {
    let targetElement = e.target.id;
    let url = `http://localhost:5000/api/cart/removeItem?id=${targetElement}`;

    fetch(url, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => console.log(data.message))
        .catch(err => console.error(err))
    location.reload();
}
const pressBtnToRemove = ()=> {
    const tbody = document.querySelector('#myProductsInMyCart');
    btnAddEvenListner(tbody);
 }
 
const btnAddEvenListner=(items)=>{
         items.addEventListener('click', (e) => {
            deleteFromShoppingCart(e);
         });
}
/********************************************************************** 
**********************************************************************/