const {reviewData} =window;

function createCards(review){
    var container = document.getElementById("cards");

    var card = document.createElement("div");
    card.style.margin = "5px";
    card.style.color = "#212121";
    card.style.borderRadius = "10px";
    card.style.width = "250px";
    card.style.height = "200px";
    card.style.backgroundColor = "#f47c7c";
    card.style.float = "left";

    var name = document.createElement('h5');
    var nameT = document.createTextNode(review.name);
    name.style.color = "#212121";
    name.style.margin = "5px";
    name.style.paddingTop = '10px';
    name.appendChild(nameT);
    
    var date = document.createElement("time");
    var dateT = new Date(review.date).toLocaleDateString();
    date.style.margin = "5px";
    date.style.backgroundColor = "#f47c7c";
    date.innerHTML = dateT;

    var rating = document.createElement('p');
    var ratingT = document.createTextNode("Rating: ");
    for(var i = 0; i < review.rating ; i++){
        ratingT.nodeValue += "★";
    }
    for(var i = 5; i > review.rating; i--){
        ratingT.nodeValue += "☆";
    }
    rating.style.margin = "5px";
    rating.appendChild(ratingT);

    var revw = document.createElement('p');
    var revwT = document.createTextNode(review.review);
    revw.style.margin = "5px";
    revw.appendChild(revwT);

    card.appendChild(name);
    card.appendChild(date);
    card.appendChild(rating);
    card.appendChild(revw);

    container.appendChild(card);
}

window.reviewData.forEach(createCards);


window.validateNewCard = function(){
    //prevent the page from refreshing
    var form = document.getElementById('newreview');
form.addEventListener('submit', function(event){
    event.preventDefault();
})

    var err1 = document.getElementById("errName");
    err1.style.display = "none";
    var err2 = document.getElementById("errRating");
    err2.style.display = "none";
    var err3 = document.getElementById("errReview");
    err3.style.display = "none";
    
const nameT = document.getElementById('name').value.trim();
const rating = document.querySelector('input[name = "rating"]:checked');
const review = document.getElementById('review').value.trim();

if(nameT ==="" || nameT.length > 20){
    err1.style.display = "block";
    return false;
}
if(!rating){
    err2.style.display = "block";
    return false;
}
if(review ===""){
    err3.style.display = "block";
    return false;
}

//if validation success, continue to generate new card
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const date = `${year}-${month}-${day}`;

var container = document.getElementById("cards");
container.innerHTML = "";

const newReview = {
    name: nameT,
    date: date,
    rating: rating.value,
    review: review
}

window.reviewData.push(newReview);
window.reviewData.forEach(createCards);

return false;
}
