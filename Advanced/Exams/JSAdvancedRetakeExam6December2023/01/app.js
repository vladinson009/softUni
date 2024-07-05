window.addEventListener('load', solve);

function solve() {
  const timeInput = document.getElementById('time');
  const dateInput = document.getElementById('date');
  const placeInput = document.getElementById('place');
  const eventInput = document.getElementById('event-name');
  const contactInput = document.getElementById('email');
  const addBtn = document.getElementById('add-btn');

  addBtn.addEventListener('click', onAdd);

  // CONTAINERS
  const lastCheck = document.getElementById('check-list');
  const upcomingList = document.getElementById('upcoming-list');
  const finishedList = document.getElementById('finished-list');

  function onAdd(e) {
    e.preventDefault();
    const form = {
      time: timeInput.value.trim(),
      date: dateInput.value.trim(),
      place: placeInput.value.trim(),
      event: eventInput.value.trim(),
      contact: contactInput.value.trim(),
    };
    if (
      !form.time ||
      !form.date ||
      !form.place ||
      !form.event ||
      !form.contact
    ) {
      return;
    }
    // CREATE <LI> & <ARTICLE> & <P> & <BUTTON> ELEMENTS AND ADD ATTRIBUTES TO THEM
    const liInfo = document.createElement('li');
    liInfo.className = 'event-content';

    const article = document.createElement('article');
    const pBegins = document.createElement('p');
    const pIn = document.createElement('p');
    const pEvent = document.createElement('p');
    const pContact = document.createElement('p');
    const editBtn = document.createElement('button');
    const continueBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    continueBtn.className = 'continue-btn';
    continueBtn.textContent = 'Continue';

    pBegins.textContent = `Begins: ${form.date} at: ${form.time}`;
    pIn.textContent = `In: ${form.place}`;
    pEvent.textContent = `Event: ${form.event}`;
    pContact.textContent = `Contact: ${form.contact}`;

    // APPEND CHILD IN CORRECT ORDER

    liInfo.appendChild(article);
    liInfo.appendChild(editBtn);
    liInfo.appendChild(continueBtn);
    article.appendChild(pBegins);
    article.appendChild(pIn);
    article.appendChild(pEvent);
    article.appendChild(pContact);
    lastCheck.appendChild(liInfo);

    // CLEAR INPUT FIELDS & DISABLE ADD <BUTTON>
    timeInput.value = '';
    dateInput.value = '';
    placeInput.value = '';
    eventInput.value = '';
    contactInput.value = '';
    addBtn.disabled = true;

    editBtn.addEventListener('click', onEdit);
    continueBtn.addEventListener('click', onContinue);

    function onEdit() {
      timeInput.value = form.time;
      dateInput.value = form.date;
      placeInput.value = form.place;
      eventInput.value = form.event;
      contactInput.value = form.contact;
      addBtn.disabled = false;
      liInfo.remove();
    }
    function onContinue() {
      editBtn.remove();
      continueBtn.remove();
      const finishedBtn = document.createElement('button');
      finishedBtn.className = 'finished-btn';
      finishedBtn.textContent = 'Move to Finished';
      liInfo.appendChild(finishedBtn);
      upcomingList.appendChild(liInfo);
      addBtn.disabled = false;

      finishedBtn.addEventListener('click', onFinished);

      function onFinished() {
        finishedBtn.remove();
        finishedList.appendChild(liInfo);

        const clearBtn = document.getElementById('clear');
        clearBtn.addEventListener('click', () => liInfo.remove());
      }
    }
  }
}
