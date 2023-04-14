//kreiranje tablice košarice
const cart = JSON.parse(localStorage.getItem('cart'));
const tableBody = document.getElementById('table_body');

// iteriranje po cart objektu
for (const product in cart) {
  // novi redak
  const row = document.createElement('tr');

  // ime proizvoda je jednako product, zove se nameCell jer to copilot tako voli
  // a ja sam smotan za davanje imena, pogubim i ponovim se začas
  const nameCell = document.createElement('td');
  nameCell.textContent = product;

  // količina
  const qtyCell = document.createElement('td');
  qtyCell.textContent = cart[product];

  // + i -, nisam izmišljao neke fancy nego eto basic html gumbi
  const plusButton = document.createElement('button');
  plusButton.textContent = '+';
  plusButton.addEventListener('click', function () {
    qtyCell.textContent = cart[product] + 1; //ovo mijenja tekst u tablici
    cart[product] = cart[product] + 1;  // ovo mijenja vrijednost u cart objektu
  });// činilo mi se jednostavnij enego da stalno nešto dohvaćam iz localStoragea
  
  const minusButton = document.createElement('button');// isto i za minus
  minusButton.textContent = '-';
  minusButton.addEventListener('click', function () {
    if (cart[product] >= 1) {
      qtyCell.textContent = cart[product] - 1;
      cart[product] = cart[product] - 1;
    }
  });

  // appendanje imena, pa + pa količine pa -
  // ne znam da li je da je s desne minus
  row.appendChild(nameCell);
  row.appendChild(plusButton);
  row.appendChild(qtyCell);
  row.appendChild(minusButton);

  tableBody.appendChild(row);
}

function ocistiKosaricu () {
  localStorage.removeItem('cart');
}