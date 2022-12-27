// On recherche le numéro de commande dans l'url
const orderId = new URLSearchParams(document.location.search).get("orderid")

// On insère le numéro de commmande dans la page
document.querySelector('#orderId').textContent = orderId
