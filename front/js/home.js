fetch("http://127.0.0.1:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json()
    }
  })
  .then(function (products) {
    for (let product of products) {
      const a = document.createElement('a')
      const productUrl = `./product.html?id=${product.id}`
      document
        .getElementById('items')
        .appendChild(a)
        .appendChild(document.createElement('article'))
        .innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">
                      <h3 class="productName">${product.name}</h3>
                      <p class="productDescription">${product.description}</p>`
      a.setAttribute('href', `./product.html?id=${product._id}`)
    }
  })
  .catch(function (error) {
    console.error("Une erreur est survenue")
  })
