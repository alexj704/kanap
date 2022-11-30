const url = new URLSearchParams(document.location.search)
const id = url.get("id");

fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (productItem) {
        document
            .querySelector('.item__img')
            .innerHTML = `<img src="${productItem.imageUrl}" alt="${productItem.altTxt}">`
        document
            .getElementById("title")
            .innerText = `${productItem.name}`
        document
            .getElementById("price")
            .innerText = `${productItem.price}`
        document
            .getElementById("description")
            .innerText = `${productItem.description}`

    })
    .catch(function (error) {
        console.error("Erreur")
    })

    


