// Récupération du panier dans le localStorage

let inLocalStorage = JSON.parse(window.localStorage.getItem("Products"))

// On crée les variables pour la somme du panier et le nombre total de produits

let sumCart = 0
let totalQuantity = 0

// Si le panier est vide, alors on affiche "Votre panier est vide"

if (inLocalStorage == null) {
  const article = document.getElementById('cart__items').appendChild(document.createElement('article'))
  const emptyCart = article.appendChild(document.createElement('p'))
  emptyCart.style = "text-align:center"
  emptyCart.innerText = "Votre panier est vide"

}

// Sinon on affiche les produits dynamiquement

else {
  for (let product of inLocalStorage) {
    fetch(`http://localhost:3000/api/products/${product.productId}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('cart__items').innerHTML +=
          `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${product.color}</p>
                    <p>${data.price} € / unité</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`

        // On calcul et on affiche le prix total du panier et le nombre d'articles

        sumCart = sumCart + (product.quantity * data.price)
        totalQuantity = totalQuantity + product.quantity
        document.getElementById('totalQuantity').textContent = `${totalQuantity}`
        document.getElementById('totalPrice').textContent = `${sumCart}`

        
        let inputs = document.querySelectorAll('.itemQuantity')
        for (let input of inputs) {
          input.addEventListener('change', function (event) {
            product.quantity = event.target.value
            console.log(product.quantity)
          })
        }
      })

      .catch(error => { console.error(error) })
  }
}


