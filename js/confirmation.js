window.addEventListener("DOMContentLoaded", (event) => {
    showId();
});


/**
 * Assign random orderID
 */
function showId() {

    const stringUrl = window.location.href;
    const url = new URL(stringUrl);
    const orderId = url.searchParams.get("order-id");


    let spanOrder = document.querySelector('#orderId')
    spanOrder.innerHTML = orderId;

};