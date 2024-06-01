function solve() {
  const fields = Array.from(document.querySelectorAll('#container input'));
  const name = fields[0];
  const age = fields[1];
  const kind = fields[2];
  const currentOwner = fields[3];
  const addBtn = document.querySelector('#container button');
  addBtn.addEventListener('click', onAdd);

  const adoptionList = document.querySelector('#adoption ul');
  const adoptedList = document.querySelector('#adopted ul');

  function onAdd(e) {
    e.preventDefault();
    if (Number.isNaN(Number(age.value))) {
      return;
    }
    for (let input of fields) {
      if (input.value == '') {
        return;
      }
    }
    const li = document.createElement('li');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const button = document.createElement('button');

    p.innerHTML = `<strong>${name.value}</strong> is a <strong>${age.value}</strong> year old <strong>${kind.value}</strong>`;
    span.textContent = `Owner: ${currentOwner.value}`;
    button.textContent = 'Contact with owner';
    li.appendChild(p);
    li.appendChild(span);
    li.appendChild(button);
    adoptionList.appendChild(li);

    name.value = '';
    age.value = '';
    kind.value = '';
    currentOwner.value = '';

    button.addEventListener('click', contactOwner);
  }
  function contactOwner(e) {
    const parent = e.target.parentElement;
    e.target.remove();
    const div = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');
    input.placeholder = 'Enter your names';
    button.textContent = 'Yes! I take it!';
    div.appendChild(input);
    div.appendChild(button);
    parent.appendChild(div);

    button.addEventListener('click', onTake);
  }
  function onTake(e) {
    const li = e.target.parentElement.parentElement;
    const input = li.querySelector('input');
    const span = li.querySelector('span');
    const newOwner = input.value.trim();

    if (newOwner) {
      span.textContent = `New Owner: ${newOwner}`;

      const checkedBtn = document.createElement('button');
      checkedBtn.textContent = 'Checked';
      li.appendChild(checkedBtn);
      li.querySelector('div').remove();
      adoptedList.appendChild(li);
      checkedBtn.addEventListener('click', function () {
        li.remove();
      });
    }
  }
  name.value = '';
  age.value = '';
  kind.value = '';
  currentOwner.value = '';
}
