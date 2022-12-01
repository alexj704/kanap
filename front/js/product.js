// Récupération de l'id du produit dans l'url
const id = new URLSearchParams(document.location.search).get("id")

// Appel pour récupérer les infos du produit
fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
// Création des éléments du DOM et ajout des infos venant de fetch    
    .then(function (productItem) {
        const img = document.createElement('img')
        document
            .querySelector('.item__img')
            .appendChild(img)
        img.setAttribute('src', `${productItem.imageUrl}`)
        img.setAttribute('alt', `${productItem.altTxt}`)
        document
            .getElementById("title")
            .textContent = `${productItem.name}`
        document
            .getElementById("price")
            .textContent = `${productItem.price}`
        document
            .getElementById("description")
            .textContent = `${productItem.description}`

    })
    .catch(function (error) {
        console.error("Erreur")
    })

    


