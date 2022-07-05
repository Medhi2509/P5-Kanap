window.addEventListener("DOMContentLoaded", (event) => {
    showId();
});


//
function showId() {

    //Const divConf = document.createElement('div');
    //divConf.classList.add('confirmation');
   //const confirmationCommande = document.createElement('p');
    //const spanOrder = document.createElement('span');
    let spanOrder = document.querySelector('#orderId')
    spanOrder.innerHTML = Math.floor(Math.random() * 1e8);


};