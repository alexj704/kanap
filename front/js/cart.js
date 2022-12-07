let inLocalStorage = JSON.parse(window.localStorage.getItem("Products"))


if (inLocalStorage == null) {
    const article = document.getElementById('cart__items').appendChild(document.createElement('article'))
    const emptyCart = article.appendChild(document.createElement('p'))
    emptyCart.style = "text-align:center"
    emptyCart.innerText = "Votre panier est vide"

}
else {
    for (let i = 0; i < inLocalStorage.length; i++ ) {
        const id = inLocalStorage[i].productId
        const color = inLocalStorage[i].color
        const divImg = document.createElement('div')
        const img = document.createElement('img')
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                const article = document.getElementById('cart__items').appendChild(document.createElement('article'))
                article.className = 'cart__item'
                article.setAttribute("data-id",`${id}`)
                article.setAttribute("data-color", `${color}`)
                article.appendChild(divImg)
                divImg.className = 'cart__item__img'
                divImg.appendChild(img)
                img.setAttribute('src', `${data.imageUrl}`)
                img.setAttribute('alt', `${data.altTxt}`)
            })
            .catch(error => { console.error(error) })

    }
}