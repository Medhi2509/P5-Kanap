const stringUrl = window.location.href;
const url = new URL(stringUrl);
const currentId = url.searchParams.get("id");

console.log(currentId);

window.addEventListener("DOMContentLoaded", (event) => {
    const data = fetchData();
});


function fetchData() {
    const url = `http://localhost:3000/api/products/${currentId}`;
    let option = {
        method: 'GET',
    }

    return fetch(url, option)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayItems(data);
        })
}

function displayItems(data) {
    const containerimage = document.querySelector('#item__img');
    const currentImage = document.createElement("img");
    currentImage.alt = data.altTxt;
    currentImage.src = data.imageUrl;
    containerimage.appendChild(currentImage);

    const title = document.querySelector('#title');
    title.innerText = data.name;

    const price = document.querySelector('#price');
    price.innerText = data.price;

    const description = document.querySelector('#description');
    description.innerText = data.description;

    const colorchoice = document.querySelector('#colors');
    data.colors.forEach(function (element) {
        const opt = document.createElement('option');
        opt.classList.add('colorselector');
        opt.innerText = element;
        colorchoice.appendChild(opt);
    });
}


const addButton = document.querySelector("#addToCart");
const cartLocal = localStorage.getItem('cart');
const color = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');

addButton.addEventListener('click',()=>{

    if (quantity.value >= 1 && quantity.value <= 100){

        let cartArray = (cartLocal === null) ? [] : JSON.parse(cartLocal);

        let cardIds = cartArray.map((element) =>  {
            return element.id
        });

        /*if ()*/
        const newProduct = {
            id : currentId,
            color : color.value,
            quantity : quantity.value,
        };

        cartArray.push(newProduct);

        const cart = JSON.stringify(cartArray);

        localStorage.setItem('cart',cart);
        console.log(localStorage.getItem('cart'));
    }
});

