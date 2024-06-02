window.addEventListener('load', solve);

function solve() {
  const numTicketsInput = document.getElementById('num-tickets');
  const seatingPreferencesInput = document.getElementById('seating-preference');
  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const phoneNumberInput = document.getElementById('phone-number');
  const ulTicketPreview = document.getElementById('ticket-preview');
  const ulTicketPurchase = document.getElementById('ticket-purchase');
  const bottomElement = document.querySelector('.bottom-content');

  /////// PURCHASE BUTTON //////
  const purchaseBtn = document.getElementById('purchase-btn');
  purchaseBtn.addEventListener('click', purchaseFun);
  //////////////////////////////////

  function purchaseFun(e) {
    e.preventDefault();
    const numTickets = Number(numTicketsInput.value.trim());
    const seatingPreferences = seatingPreferencesInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phoneNumber = phoneNumberInput.value.trim();
    if (
      seatingPreferences == 'seating-preference' ||
      !numTickets ||
      !seatingPreferences ||
      !fullName ||
      !email ||
      !phoneNumber ||
      Number.isNaN(Number(numTickets))
    ) {
      return;
    }
    const li = document.createElement('li');
    li.classList.add('ticket-purchase');
    li.innerHTML = `<article>
        <p>Count: ${numTickets}</p>
        <p>Preference: ${seatingPreferences}</p>
        <p>To: ${fullName}</p>
        <p>Email: ${email}</p>
        <p>Phone Number: ${phoneNumber}</p>
        </article>
        <div class="btn-container">
        <button class= "edit-btn">Edit</button>
        <button class= "next-btn">Next</button>
        </div>`;
    ulTicketPreview.appendChild(li);

    numTicketsInput.value = '';
    seatingPreferencesInput.value = '';
    fullNameInput.value = '';
    emailInput.value = '';
    phoneNumberInput.value = '';
    purchaseBtn.disabled = true;
    li.querySelector('.edit-btn').addEventListener('click', function () {
      numTicketsInput.value = numTickets;
      seatingPreferencesInput.value = seatingPreferences;
      fullNameInput.value = fullName;
      emailInput.value = email;
      phoneNumberInput.value = phoneNumber;
      purchaseBtn.disabled = false;
      li.remove();
    });
    li.querySelector('.next-btn').addEventListener('click', function () {
      li.querySelector('div').remove();
      li.remove();

      const buyBtn = document.createElement('button');
      buyBtn.classList.add('buy-btn');
      buyBtn.textContent = 'Buy';
      li.querySelector('article').appendChild(buyBtn);
      ulTicketPurchase.appendChild(li);

      ulTicketPurchase
        .querySelector('.buy-btn')
        .addEventListener('click', function () {
          ulTicketPurchase.removeChild(li);
          ///// H2 ELEMENT ////
          const h2 = document.createElement('h2');
          h2.textContent = 'Thank you for your purchase!';
          //// BACK BUTTON ELEMENT ////
          const btn = document.createElement('button');
          btn.textContent = 'Back';
          btn.classList.add('back-btn');
          bottomElement.appendChild(h2);
          bottomElement.appendChild(btn);
          btn.addEventListener('click', function () {
            window.location.reload();

            ////////
          });
        });
    });
  }
}
///////////////////////
