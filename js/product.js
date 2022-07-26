const stringUrl = window.location.href;
const url = new URL(stringUrl);
const currentId = url.searchParams.get("id");

console.log(currentId);

window.addEventListener("DOMContentLoaded", (event) => {
    const data = fetchData();
});

/**
 *
 * @returns {Promise<void>}
 */

//METHOD GET LOAD ID PRODUCT
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

/**
 *
 * @param data
 */
//Create product sheet with price quantity .....
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


/**
 *
 *
 */
//Add element with color and quantity to the
const addButton = document.querySelector("#addToCart");
const cartLocal = localStorage.getItem('cart');
const color = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');


addButton.addEventListener('click',()=>{

    if (quantity.value >= 1 && quantity.value <= 100){

        let cartArray = (cartLocal === null) ? [] : JSON.parse(cartLocal);

        const currentCartElement = cartArray.filter(item => {
            return item.id === currentId && item.color === color.value;
        });

        let newQuantity = 0;

        if(currentCartElement.length > 0){
            console.log('oui')

            const currentFind = currentCartElement.find(e => typeof e !== 'undefined');
            newQuantity = parseInt(currentFind.quantity) + parseInt(quantity.value);

            cartArray = cartArray.filter(item => {
                return item.id !== currentId && item.color !== color.value;
            });
        }else{
            newQuantity = parseInt(quantity.value);
        }

        const newProduct = {
            id : currentId,
            color : color.value,
            quantity : newQuantity
        };

        cartArray.push(newProduct);

        const cart = JSON.stringify(cartArray);

        localStorage.setItem('cart',cart);
        console.log(localStorage.getItem('cart'));
    }
});


