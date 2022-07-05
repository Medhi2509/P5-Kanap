
//Loading Page
window.addEventListener("DOMContentLoaded", (event) => {
    const data = fetchData();
});


//Method Get to load product (API)
function fetchData (){
    const url = 'http://localhost:3000/api/products';
    let option = {
        method:'GET',
    }

    return fetch(url,option)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            displayItems(data)
        })
}
//Id of product and create product sheet
function displayItems(data){
    const items = document.querySelector('#items');

    data.forEach(function (element){
        const currentItem = document.createElement("a");
        currentItem.href = `http://localhost:63342/front/html/product.html?id=${element._id}`

        const currentArticle = document.createElement("article");

        const currentImage = document.createElement("img");
        currentImage.alt = element.altTxt;
        currentImage.src = element.imageUrl;

        const currentTitle = document.createElement("h3");
        currentTitle.classList.add('productName');
        currentTitle.innerText = element.name;

        const currentText = document.createElement("p");
        currentText.classList.add('productDescription');
        currentText.innerText = element.description

        currentArticle.appendChild(currentImage);
        currentArticle.appendChild(currentTitle);
        currentArticle.appendChild(currentText);

        currentItem.appendChild(currentArticle);


        items.appendChild(currentItem);
    })
}




