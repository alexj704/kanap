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

    


