window.addEventListener("DOMContentLoaded", (event) => {

});


/*Create Local Storage */
let cart = localStorage.getItem("cart");

if (cart !== undefined) {
    cart = JSON.parse(cart);
    console.log(cart)
    displayItems(cart)
}

/*Function loading product and method get*/
function fetchData(id, cartElement) {
    const url = `http://localhost:3000/api/products/${id}`;
    let option = {
        method: 'GET',
    }

    return fetch(url, option)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayItem(data, cartElement);
        })
}

const items = document.querySelector('#cart__items');


function displayItems(data) {

    data.forEach(function (element) {
        const currentElement = fetchData(element.id, element);

    })
}

/* create element Html and set ID and class */
function displayItem(item, cartElement) {

    const currentItem = document.createElement("article");
    currentItem.classList.add('cart__item');
    currentItem.setAttribute('data-id', item._id);
    currentItem.setAttribute('data-color', cartElement.color);

    const itemImg = document.createElement("div");
    itemImg.classList.add('cart__item__img');
    const img = document.createElement("img");
    img.alt = item.altTxt;
    img.src = item.imageUrl;
    itemImg.appendChild(img);
    currentItem.appendChild(itemImg);


    const divItemContent = document.createElement("div");
    divItemContent.classList.add('cart__item__content');
    const divItemContentDescription = document.createElement("div");
    divItemContentDescription.classList.add('cart__item__content__description');
    const currentTitle = document.createElement("h2");
    currentTitle.innerHTML = item.name;
    const paragrapheColor = document.createElement("p");
    paragrapheColor.innerHTML = cartElement.color;
    const paragraphePrice = document.createElement("p");
    paragraphePrice.innerHTML = item.price + '€';

    divItemContentDescription.appendChild(currentTitle);
    divItemContentDescription.appendChild(paragrapheColor);
    divItemContentDescription.appendChild(paragraphePrice);
    divItemContent.appendChild(divItemContentDescription);

    const itemContentSetting = document.createElement("div");
    itemContentSetting.classList.add('cart__item__content__settings');
    const itemContentSettingQuantity = document.createElement("div");
    itemContentSettingQuantity.classList.add('cart__item__content__settings__quantity')
    const quantity = document.createElement("p");
    quantity.innerHTML = 'Qté : ';
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'itemQuantity';
    input.min = '1';
    input.max = '100';
    input.name = 'itemQuantity';
    input.value = cartElement.quantity;
    itemContentSettingQuantity.appendChild(quantity);
    itemContentSettingQuantity.appendChild(input);
    itemContentSetting.appendChild(itemContentSettingQuantity);

    const itemSettingDelete = document.createElement("div");
    itemSettingDelete.classList.add('cart__item__content__settings__delete');
    const deleteItem = document.createElement("p");
    deleteItem.classList.add('deleteItem');
    deleteItem.innerHTML = 'Supprimer';
    itemSettingDelete.appendChild(deleteItem);
    itemContentSetting.appendChild(itemSettingDelete);

    divItemContent.appendChild(itemContentSetting);
    currentItem.appendChild(divItemContent);

    items.appendChild(currentItem);
    deleteItem.addEventListener('click', (element) => {

        const itemDataset = element.target.parentNode.parentNode.parentNode.parentNode.dataset;

        const elementId = itemDataset.id;
        const elementColor = itemDataset.color;
        deleteElement(elementId, elementColor)


    })

}

/* Delete element stock on LocalStorage*/
function deleteElement(id, color) {

    let newCartArray = cart.filter(item => {

        return !(item.id === id && item.color === color);
    });
    console.log(newCartArray)
    localStorage.setItem('cart', JSON.stringify(newCartArray));
    location.reload();

}


/*Create Form and regex */
function isValidForm() {

    const inFirstName = document.getElementById('firstName');
    const inLastName = document.getElementById('lastName');
    const inCity = document.getElementById('city');
    const onlyChar = new RegExp('^[A-Za-z]+$');

    const errFirstName = document.getElementById('firstNameErrorMsg');
    if (onlyChar.test(inFirstName.value) === true) {
        errFirstName.innerText = ''
    } else {
        errFirstName.innerText = 'Veuillez renseigner un champs valide'
    }
    console.log(onlyChar.test(inFirstName.value));

    const errLastName = document.getElementById('lastNameErrorMsg');
    if (onlyChar.test(inLastName.value) === true) {
        errLastName.innerText = '';
    } else {
        errLastName.innerText = 'Veuillez renseigner un champs valide';
    }
    console.log(onlyChar.test(inLastName.value));

    const errCity = document.getElementById('cityErrorMsg');
    if (onlyChar.test(inCity.value) === true) {
        errCity.innerText = "";
    } else {
        errCity.innerText = 'Veuillez reinseigner un champs valide';
    }
    console.log(onlyChar.test(inCity.value));

    const inAdress = document.getElementById('address');
    const charAdress = new RegExp('^[#.0-9a-zA-Z\\s,-]+$');
    const errAdress = document.getElementById('addressErrorMsg');
    if (charAdress.test(inAdress.value) === true) {
        errAdress.innerText = '';
    } else {
        errAdress.innerText = 'Veuillez renseigner un champs valide';
    }
    console.log(charAdress.test(inAdress.value));

    const inMail = document.getElementById('email');
    const charMail = new RegExp('^([a-z0-9_\\.-]+\\@[\\da-z\\.-]+\\.[a-z\\.]{2,6})$');

    const errMail = document.getElementById('emailErrorMsg');

    if (charMail.test(inMail.value) === true) {
        errMail.innerText = '';
    } else {
        errMail.innerText = 'Veuillez renseigner un champs valide';
    }
    console.log(charMail.test(inMail.value));
    console.log(inMail.value);

    return onlyChar.test(inFirstName.value) &&
        onlyChar.test(inLastName.value) &&
        onlyChar.test(inCity.value) &&
        charAdress.test(inAdress.value) &&
        charMail.test(inMail.value)

}


/*Submit form*/

const formSubmit = document.querySelector('.cart__order__form');
formSubmit.addEventListener("submit", function (event) {
    event.preventDefault();

    if (isValidForm() === true) {
        window.location.href = 'confirmation.html';
    }

});








