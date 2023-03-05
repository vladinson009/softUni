function solve() {
  const [input, output] = document.querySelectorAll('textarea');
  const [generateBtn, buyBtn] = document.querySelectorAll('button');
  const tbody = document.querySelector('tbody');
  generateBtn.addEventListener('click', generate);
  buyBtn.addEventListener('click', buy)

  function generate() {
    const toObject = JSON.parse(input.value);
    for (let each of toObject) {
      const row = document.createElement('tr');

      const imgTd = document.createElement('td');
      const img = document.createElement('img');
      img.src = each.img;
      imgTd.appendChild(img);
      row.appendChild(imgTd);

      const nameTd = document.createElement('td');
      const nameP = document.createElement('p');
      nameP.textContent = each.name;
      nameTd.appendChild(nameP);
      row.appendChild(nameTd);

      const priceTd = document.createElement('td');
      const priceP = document.createElement('p');
      priceP.textContent = each.price;
      priceTd.appendChild(priceP);
      row.appendChild(priceTd);

      const decFactorTd = document.createElement('td');
      const decFactorP = document.createElement('p');
      decFactorP.textContent = each.decFactor;
      decFactorTd.appendChild(decFactorP);
      row.appendChild(decFactorTd);

      const checkbox = document.createElement('td');
      const checkInput = document.createElement('input');
      checkInput.type = 'checkbox';
      checkbox.appendChild(checkInput);
      row.appendChild(checkbox);

      tbody.appendChild(row);
    }
  }

  function buy() {
    const markedFurniture = document.querySelectorAll('table tbody tr input[type="checkbox"]:checked');
    const names = [];
    let totalPrice = 0;
    let totalDecFactor = 0;
    for (let each of markedFurniture) {
      const row = each.parentElement.parentElement;
      const name = row.children[1].textContent;
      const price = Number(row.children[2].textContent);
      const decFactor = Number(row.children[3].textContent);

      names.push(name);
      totalPrice += price;
      totalDecFactor += decFactor;
    }
    output.value = `Bought furniture: ${names.join(', ')}
Total price: ${totalPrice.toFixed(2)}
Average decoration factor: ${totalDecFactor / markedFurniture.length}`
  }
}