let addtocartBtn = document.querySelector('.addtocartBtn');

addtocartBtn.addEventListener('click',(ev)=>{
    console.log("Clicked add to cart");
    let productId = addtocartBtn.getAttribute('productId');
    console.log(productId);
    axios.get(`/shop/addtocart?productId=${productId}`)
        .then((res)=>{
            console.log("Item added Successfully");
            let cartCount = document.querySelector('.cartCount');
            let x = Number(cartCount.innerText);
            x++;
            cartCount.innerText = x
        })
        .catch(err=>{
            console.log(err);
        })
})

