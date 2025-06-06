//update the quantity on cart page
let cartItems = document.querySelector('.cartItems');
cartItems.addEventListener('click',(ev)=>{
    let item = ev.target;
    // console.log(item.innerText, item.getAttribute('productId'));
    let sign = item.innerText;
    let productId = item.getAttribute('productId');
    let priceValue = document.querySelector('.priceValue')
    if(sign === '+'){
        let quantityNumber = ev.target.parentElement.previousElementSibling;
        // increase the qty
        // console.log("Send Increase req");
        axios.get(`/shop/increaseQty?productId=${productId}`)
            .then((res)=>{
                quantityNumber.innerText = Number(quantityNumber.innerText)+1;
                // console.log(res);
                priceValue.innerText = `$ ${res.data.totalPrice}`;
                // console.log("Quantity Increase for product", productId)
            })
            .catch(err=>{
                console.log(err);
            })
    }
    else if(sign == '-'){
        //decrease the qty
        let quantityNumber = ev.target.parentElement.previousElementSibling.previousElementSibling;
        // console.log("Send decrease req");
        axios.get(`/shop/decreaseQty?productId=${productId}`)
            .then((res)=>{
                quantityNumber.innerText = Number(quantityNumber.innerText)-1;
                // console.log(res);
                priceValue.innerText = `$ ${res.data.totalPrice}`;
                // console.log("Quantity Decrease for product", productId)
            })
            .catch(err=>{
                console.log(err);
            })
    }
    else if(ev.target.classList.contains('deleteBtn')){
        console.log('Pressed Delete Btn');
        axios.get(`/shop/deletecartitem?productId=${productId}`)
            .then((res)=>{
                ev.target.parentElement.parentElement.innerText = '';
                let cartCount = document.querySelector('.cartCount');
                cartCount.innerText = Number(cartCount.innerText)-1;
                priceValue.innerText = `$ ${res.data.totalPrice}`;
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
    }
})
//update the quantity on cart page