// Récupation des infos produits grâce à l'API
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    // Ajout des items contenant les infos produit sur la page d'acceuil    
    .then(products => {
        const items = document.getElementById('items')
        for (let product of products) {
            // Ajout du lien pour accèder au produit
            const link = document.createElement('a')
            items.appendChild(link).setAttribute('href', `./product.html?id=${product._id}`)
            // Création de la balise article
            const article = document.createElement('article')
            link.appendChild(article)
            // Ajout de l'image du produit
            const image = document.createElement('img')
            article.appendChild(image)
            image.src = product.imageUrl
            image.alt = product.altTxt
            // Ajout du nom du produit 
            const name = document.createElement('h3')
            article.appendChild(name).setAttribute('class', 'productName')
            name.textContent = product.name
            // Ajout de la description du produit
            const description = document.createElement('p')
            article.appendChild(description).setAttribute('class', 'productDescription')
            description.textContent = product.description
        }
    })
    .catch(error => { console.error(error) })
