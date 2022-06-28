window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");
});

function showId() {

    const divConf = document.createElement('div');
    divConf.classList.add('confirmation');
    const confirmationCommande = document.createElement('p');
    const spanOrder = document.createElement('span');
    spanOrder.innerHTML = 'orderId';

    divConf.appendChild(spanOrder);

};