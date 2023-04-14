fetch("./scripts/data.json")
  .then(response => response.json())
  .then(data => createList(data));
  
// kreiranje izbornika liste kategorija
function createList(data) {
  const mainUL = document.createElement('ul');
  mainUL.classList.add('list', 'kategorije');

  for (let i = 0; i < data.categories.length; i++) {
    const kategorijaLI = document.createElement('li');
    kategorijaLI.innerHTML = data.categories[i].name;
    // dodavanje event listenera na svaki element liste i promjena h1 elementa
    kategorijaLI.addEventListener('click', () => {
      document.querySelector('h1').textContent = data.categories[i].name;

      // isprazni postojeće elemente u divu sa klasom "proizvodi"
      const proizvodiDiv = document.querySelector('.proizvodi');
      proizvodiDiv.innerHTML = '';

      // kreiranje elemenata za proizvode po kategorijama i appendanje u divove sa klasom "proizvodi"
      const products = data.categories[i].products;
      for (let j = 0; j < products.length; j++) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('item');
        
        //pokušao sam dodati brojače za količine proizvoda ali sam odustao
        //const productName = document.createElement('p');
        //productName.textContent = products[j].name;

        const productImage = document.createElement('img');
        productImage.classList.add('img-proizvoda');
        productImage.src = products[j].image;

        const basketIcon = document.createElement('img');
        basketIcon.setAttribute('name', products[j].name);
        basketIcon.setAttribute('id', 'basket-icon');
        basketIcon.src = './images/basket-shopping-solid.svg';
        
        // ovo radi nekim čudom 
        basketIcon.addEventListener('click', (event) => {
          const productName = event.target.getAttribute('name');
          let cart = JSON.parse(localStorage.getItem('cart')) || {};
          cart[productName] = (cart[productName] || 0) + 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          var productKolicina = cart[productName]
          console.log(productName + " - " + productKolicina);
        });
        
        productDiv.appendChild(productImage);
        productDiv.appendChild(basketIcon);
        productDiv.appendChild(productName);
        proizvodiDiv.appendChild(productDiv);
      }
    });
    mainUL.appendChild(kategorijaLI);
  }
  const nav = document.querySelector('nav');
  nav.insertBefore(mainUL, nav.firstChild);

  // kreiranje elemenata za proizvode u kategoriji "Akcija"
  const akcijaCategory = data.categories.find(category => category.name === "Akcija");
  if (akcijaCategory) {
    const akcijaProducts = akcijaCategory.products;

    for (let i = 0; i < akcijaProducts.length; i++) {
      const productDiv = document.createElement('div');
      productDiv.classList.add('item');

      const productName = document.createElement('p');
      productName.textContent = akcijaProducts[i].name;

      const productImage = document.createElement('img');
      productImage.src = akcijaProducts[i].image;

      const basketIcon = document.createElement('img');
      basketIcon.setAttribute('id', 'basket-icon');
      basketIcon.setAttribute('name', akcijaProducts[i].name);
      basketIcon.src = './images/basket-shopping-solid.svg'

      basketIcon.addEventListener('click', (event) => {

        const productName = event.target.getAttribute('name');
        let cart = JSON.parse(localStorage.getItem('cart')) || {};

        cart[productName] = (cart[productName] || 0) + 1;

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(localStorage.getItem('cart'));
      });

      productDiv.appendChild(productImage);
      productDiv.appendChild(basketIcon);
      productDiv.appendChild(productName);

      const proizvodiDiv = document.querySelector('.proizvodi');
      proizvodiDiv.appendChild(productDiv);
    }
  }
}
