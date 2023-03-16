function solve() {
   document.querySelector('.shopping-cart').addEventListener('click', onClick);
   const buttons = document.querySelectorAll('button');
   const products = new Set();
   const textarea = document.getElementsByTagName('textarea')[0];
   let totalPrice = 0;

   function onClick(e) {
      if (e.target.className == 'add-product' &&
         e.target.tagName == 'BUTTON') {
         const product = e.target.parentElement.parentElement
         const name = product.children[1].children[0].textContent;
         const price = Number(product.children[3].textContent);
         products.add(name);
         totalPrice += price;
         textarea.value += `Added ${name} for ${price.toFixed(2)} to the cart.\n`
      } else if (e.target.className == 'checkout' &&
         e.target.tagName == 'BUTTON') {
         textarea.value +=
            `You bought ${Array.from(products.values()).join(', ')} for ${totalPrice.toFixed(2)}.`;
         for (let button of buttons) {
            button.disabled = true;
            button.style.backgroundColor = 'gray';
         }
      }
   }
}