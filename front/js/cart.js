// Récupération du panier dans le localStorage

let inLocalStorage = JSON.parse(window.localStorage.getItem("Products"))

// On crée les variables pour la somme du panier et le nombre total de produits

let sumCart = 0
let totalQuantity = 0

// Si le panier est vide, alors on affiche "Votre panier est vide"
function setMessage() {
  if (inLocalStorage == null || inLocalStorage.length == 0) {
    const article = document.getElementById('cart__items').appendChild(document.createElement('article'))
    const emptyCart = article.appendChild(document.createElement('p'))
    emptyCart.style = "text-align:center"
    emptyCart.innerText = "Votre panier est vide"
  }
}


// Sinon on affiche les produits dynamiquement
setMessage()
if (inLocalStorage !== null && inLocalStorage.length > 0) {
  for (let i in inLocalStorage) {
    fetch(`http://localhost:3000/api/products/${inLocalStorage[i].productId}`)
      .then(response => response.json())
      .then(data => {
        inLocalStorage[i].imageUrl = data.imageUrl
        inLocalStorage[i].altTxt = data.altTxt
        inLocalStorage[i].name = data.name
        inLocalStorage[i].price = data.price
        document.getElementById('cart__items').innerHTML +=
          `<article class="cart__item" data-id="${inLocalStorage[i].productId}" data-color="${inLocalStorage[i].color}">
                <div class="cart__item__img">
                  <img src="${inLocalStorage[i].imageUrl}" alt="${inLocalStorage[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${inLocalStorage[i].name}</h2>
                    <p>${inLocalStorage[i].color}</p>
                    <p>${inLocalStorage[i].price} € / unité</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${inLocalStorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`

        quantityChange()
        deleteItem()
        priceTotal()
      })

      .catch(error => { console.error(error) })
    
  }

}


// Fonction qui permet de modifier la quantité d'un produit

function quantityChange() {
  let items = document.querySelectorAll('.itemQuantity')
  items.forEach(item => {
    const dataSet = item.closest('.cart__item')
    const dataId = dataSet.dataset.id
    const dataColor = dataSet.dataset.color
    item.addEventListener('change', function (event) {
      const change = inLocalStorage.find(element => element.productId == dataId && element.color == dataColor)
      if (event.target.value > 100) {
        alert("Vous ne pouvez pas prendre plus de 100 produits")
      }
      else {
        change.quantity = Number(event.target.value)
        window.localStorage.setItem("Products", JSON.stringify(getProductLocalStorage()))
        priceTotal()
      }
    })
  }
  )

}

// Fonction qui permet de supprimer un produit

function deleteItem() {
  let deleteItems = document.querySelectorAll('.deleteItem')
  deleteItems.forEach(deleteItem => {
    const dataSet = deleteItem.closest('.cart__item')
    const dataId = dataSet.dataset.id
    const dataColor = dataSet.dataset.color
    deleteItem.addEventListener('click', event => {
      const deleted = inLocalStorage.find(element => element.productId == dataId && element.color == dataColor)
      inLocalStorage = inLocalStorage.filter(deleteItem => deleteItem !== deleted)
      localStorage.setItem("Products", JSON.stringify(getProductLocalStorage()))
      dataSet.remove()
      priceTotal()
      setMessage()
    })
  })
}

// Fonction qui calcul le prix total et le nombre total d'article

function priceTotal() {
  sumCart = 0
  totalQuantity = 0
  for (let product of inLocalStorage) {
    sumCart += (product.quantity * product.price)
    totalQuantity += Number(product.quantity)
  }
  document.getElementById('totalQuantity').textContent = `${totalQuantity}`
  document.getElementById('totalPrice').textContent = `${sumCart}`
}

// Fonction qui permet de récuperer les informations nécessaires pour les envoyer au LocalStorage

function getProductLocalStorage() {
  let products = []
  for (let i in inLocalStorage) {
    products.push({
      productId: inLocalStorage[i].productId,
      color: inLocalStorage[i].color,
      quantity: inLocalStorage[i].quantity
    })
  }
  return products
}

let form = document.querySelector('form')

// Fonction de validation utilisée pour le prénom, le nom et la ville

function validNameOrCity(inputName) {
  if (/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.\s-]+$/i.test(inputName.value)){
    inputName.nextElementSibling.textContent = 'Saisie valide'
    return true
  }
  else {
    inputName.nextElementSibling.textContent = 'Saisie invalide'
    return false
  }
}

// Fonction de validation de l'adresse

function validAddress(inputAddress) {
    if (/^[0-9a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.\s-]+$/i.test(inputAddress.value)) {
      inputAddress.nextElementSibling.textContent = 'Saisie valide'
      return true
    }
    else {
      inputAddress.nextElementSibling.textContent = 'Saisie invalide'
      return false
    }
  }


// Fonction de validation de l'email

function validMail(inputEmail) {
  let mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
  if (mailRegExp.test(inputEmail.value)) {
    inputEmail.nextElementSibling.textContent = 'Email valide'
    return true
  }
  else {
    inputEmail.nextElementSibling.textContent = 'Merci de saisir un email valide'
    return false
  }
}

// On surveille la modification du prénom

form.firstName.addEventListener('input', function() {
  validNameOrCity(this)
})

// On surveille la modification du nom

form.lastName.addEventListener('input', function () {
  validNameOrCity(this)
})

// On surveille la modification de l'adresse

form.address.addEventListener('input', function () {
  validAddress(this)
})


// On surveille la modification de la ville

form.city.addEventListener('input', function () {
  validNameOrCity(this)
})

// On surveille la modification de l'email

form.email.addEventListener('input', function () {
  validMail(this)
})

// On surveille la soumission du formulaire
form.addEventListener('submit', event => {
  event.preventDefault()
// Si le panier est vide, on signale l'erreur
  if (inLocalStorage==null || inLocalStorage.length <1) {
    alert("Vous devez remplir le panier")
  }
// Sinon on vérifie si les champs sont correctement remplis
  else if (validNameOrCity(form.firstName)&&validNameOrCity(form.lastName)&&validAddress(form.address)&&validNameOrCity(form.city)&&validMail(form.email)) {
    let contact = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value
    }
    let products = inLocalStorage.map(product => product.productId)
// On envoie la commande au Backend
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        'Accept':'application/JSON',
        'Content-Type':'application/JSON',
      },
      body: JSON.stringify({
        contact,
        products
      })
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = `./confirmation.html?orderid=${data.orderId}`
      localStorage.clear()
    })
    .catch(error => {console.error(error)})
  }
  else {
    alert("Merci de remplir correctement tous les champs")
  }
})
