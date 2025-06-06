function updateReviewList(reviews){
    let reviewsList = document.querySelector('.reviewsList');
    reviewsList.innerText = '';
    reviews.forEach((r)=>{
        console.log(r.title,r.description);
        let li = document.createElement('li');
        li.innerHTML = `<li class="reviewListItem">
                <div class="reviewTitle">${r.title}</div>
                <div class="reviewDescription">${r.description}</div>
                <button class="deleteReviewBtn">
                   <a href="/deletereview/id=${r._id}">Delete</a>
                </button>
            </li>`
        reviewsList.appendChild(li);
    })
}
let writeReview = document.querySelector('.writeReview');
let inputReview = document.querySelector('.inputReview');
writeReview.addEventListener('click',(ev)=>{
    inputReview.classList.toggle('hide');
})

//Submit review logic
let title = document.querySelector('.title');
let description = document.querySelector('.description');
let submitReviewBtn = document.querySelector('.submitReviewBtn');
let productId = document.querySelector('.productId');
submitReviewBtn.addEventListener('click',(ev)=>{
    let titleText = title.value;
    let descriptionText = description.value;
    let id = productId.value;
    inputReview.classList.toggle('hide');
    title.value = description.value = '';
    axios.post('/shop/submitreview', {
        title: titleText,
        description: descriptionText,
        productId: id
    }).then(function (response) {
       //console.log(response.data.reviews);
       updateReviewList(response.data.reviews);
    }).catch(function (error) {
       console.log(error);
    });
})