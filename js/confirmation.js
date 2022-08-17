window.addEventListener("DOMContentLoaded", (event) => {
    showId();
});


/**
 * Assign random orderID
 */
function showId() {

    let spanOrder = document.querySelector('#orderId')
    spanOrder.innerHTML = Math.floor(Math.random() * 1e8);

};