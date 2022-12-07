// Récupération de l'id du produit dans l'url
const id = new URLSearchParams(document.location.search).get("id")

// Appel pour récupérer les infos du produit
fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(response => response.json()) 
// Création des éléments du DOM et ajout des infos venant de fetch    
    .then(data => {
// Changement du titre de la page selon le modèle
        document
            .querySelector('title')
            .textContent = `${data.name} - Kanap`
// Insertion de l'image
        const img = document.createElement('img')
        document
            .querySelector('.item__img')
            .appendChild(img)
        img.setAttribute('src', `${data.imageUrl}`)
        img.setAttribute('alt', `${data.altTxt}`)
// Insertion du nom du produit
        document
            .getElementById("title")
            .textContent = `${data.name}`
// Insertion du prix du produit
        document
            .getElementById("price")
            .textContent = `${data.price}`
// Insertion de la description du produit
        document
            .getElementById("description")
            .textContent = `${data.description}`
// Insertion des couleurs du produit
        for (let color of data.colors) {
            const colors = document.getElementById("colors")
            const option = document.createElement('option')
            colors.appendChild(option)
            option.value = color
            option.textContent = color
        }
    })
    .catch( error => {console.error(error)})

// Ajout au panier

// Ajout du listener sur le bouton "Ajouter au panier"

const addToCart = document.querySelector("#addToCart")
addToCart.addEventListener("click", function (event){
    event.preventDefault()
    const productOptions = {
        productId: id,
        color: document.querySelector("#colors").value,
        quantity: Number(document.querySelector("#quantity").value),
    }
    addLocalStorage(productOptions)
})

// Fonction de l'ajout du panier au localStorage

function addLocalStorage(productOptions) {

// On regarde si on a déjà un panier dans le localStorage, si oui on regarde si le produit qu'on veut ajouter n'y
// est pas déjà(même ID, même couleur) auquel cas on ajuste la quantité, sinon on ajoute le produit.

    let inLocalStorage = JSON.parse(window.localStorage.getItem("Products"))
    if (inLocalStorage === null) {
        inLocalStorage = []
        inLocalStorage.push(productOptions)
        window.localStorage.setItem("Products", JSON.stringify(inLocalStorage))
    }
    else {
        const found = inLocalStorage.find(element => element.productId == productOptions.productId && element.color == productOptions.color)
        if (found == undefined) {
            inLocalStorage.push(productOptions)
            window.localStorage.setItem("Products", JSON.stringify(inLocalStorage))
        }
        else {
            found.quantity += productOptions.quantity
            window.localStorage.setItem("Products", JSON.stringify(inLocalStorage))
        }
    }
}

    


