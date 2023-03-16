// function solve() {
//     document.querySelector('body').addEventListener('click', action);
//     const [name, hall, ticketPrice] = document.querySelectorAll('#container input');
//     const movies = document.querySelector('#movies ul');
//     const archive = document.querySelector('#archive ul');

//     function action(e) {
//         const currentName = name.value;
//         e.preventDefault()
//         const action = e.target;
//         if (action.tagName == 'BUTTON') {
//             let li = document.createElement('li');
//             if (action.textContent == 'On Screen' &&
//                 name.value != '' &&
//                 hall.value != '' && !isNaN(Number(ticketPrice.value))) {
//                 li.innerHTML =
//                     `<span>${name.value}</span>
//                     <strong>Hall: ${hall.value}</strong>
//                      <div>
//                          <strong>${Number(ticketPrice.value).toFixed(2)}</strong>
//                          <input placeholder="Tickets Sold">
//                          <button>Archive</button>
//                      </div>`;
//                 movies.appendChild(li);
//                 [name.value, hall.value, ticketPrice.value] = ['', '', ''];
//             } else if (action.textContent == 'Archive' &&
//                 action.parentElement.children[1].value != '' &&
//                 !isNaN(Number(action.parentElement.children[1].value))) {
//                 li = action.parentElement.parentElement;
//                 const price = Number(action.parentElement.children[0].textContent);
//                 const qty = Number(action.parentElement.children[1].value);
//                 li.innerHTML = `<span>${currentName}</span>
//                                 <strong>Total amount: ${(price * qty).toFixed(2)}</strong>
//                                 <button>Delete</button>`
//                 // li.children[1].remove();
//                 // li.children[1].remove();
//                 // const strong = document.createElement('strong');
//                 // strong.textContent = `Total amount: ${(price * qty).toFixed(2)}`;
//                 // li.appendChild(strong);
//                 // const deleteBtn = document.createElement('button');
//                 // deleteBtn.textContent = 'Delete';
//                 // li.appendChild(deleteBtn);
//                 archive.appendChild(li);
//             } else if (action.textContent == 'Delete') {
//                 action.parentElement.remove();
//             } else if (action.textContent == 'Clear') {
//                 action.parentElement.children[1].innerHTML = '';

//             }
//         }
//     }
// }
////////////////////////////////////////////////////////////////////
// function solve() {
//     const [name, hall, ticketPrice] = document.querySelectorAll('#container input');
//     const movies = document.querySelector('#movies ul');
//     const archive = document.querySelector('#archive ul');
//     document.querySelector('body').addEventListener('click', func);
//     let target;
//     const actions = {
//         'On Screen': onScreenBtn,
//         'Archive': archiveBtn,
//         'Delete': deleteBtn,
//         'Clear': clearAllBtn
//     }

//     function func(e) {
//         target = e.target;
//         e.preventDefault();
//         if (e.target.tagName == 'BUTTON') {
//             actions[e.target.textContent]()
//         }
//     }

//     function onScreenBtn() {
//         if (name.value != '' && hall.value != '' && !isNaN(Number(ticketPrice.value)) && ticketPrice.value != '') {
// const li = document.createElement('li');
// li.innerHTML = `<span>${name.value}</span>
//                 <strong>Hall: ${hall.value}</strong>
//                 <div>
//                     <strong>${Number(ticketPrice.value).toFixed(2)}</strong>
//                     <input placeholder="Tickets Sold">
//                     <button>Archive</button>
//                 </div>`;
// movies.appendChild(li);
// [name.value, hall.value, ticketPrice.value] = ['', '', ''];
//         }
//     }

//     function archiveBtn() {
//         const parentLi = target.parentElement.parentElement;
//         const parentDiv = target.parentElement;
//         if (!isNaN(Number(parentDiv.children[1].value)) && parentDiv.children[1].value != '') {
//             const totalPrice = Number(parentDiv.children[0].textContent) * Number(parentDiv.children[1].value);
//             parentLi.children[1].textContent = 'Total amount: ' + totalPrice.toFixed(2);
//             parentLi.children[2].remove()
//             const button = document.createElement('button');
//             button.textContent = 'Delete';
//             parentLi.appendChild(button);
//             archive.appendChild(parentLi);
//         }
//     }

//     function deleteBtn() {
//         target.parentElement.remove()
//     }

//     function clearAllBtn() {
//         const allMovies = Array.from(archive.querySelectorAll('li'));
//         allMovies.forEach(x => x.remove());
//     }
// }


function solve() {
    const [name, hall, ticketPrice] = document.querySelectorAll('#container input');
    const movies = document.querySelector('#movies ul');
    const archive = document.querySelector('#archive ul');
    const addBtn = document.querySelector('#container button');
    addBtn.addEventListener('click', onScreen);
    const clearAllBtn = document.querySelector('#archive button');
    clearAllBtn.addEventListener('click', () => {
        archive.innerHTML = '';
    })

    function onScreen(e) {
        e.preventDefault();
        if (name.value != '' && hall.value != '' && !isNaN(Number(ticketPrice.value)) && ticketPrice.value != '') {
            const li = document.createElement('li');
            li.innerHTML = `<span>${name.value}</span>
                            <strong>Hall: ${hall.value}</strong>
                            <div>
                                <strong>${Number(ticketPrice.value).toFixed(2)}</strong>
                                <input placeholder="Tickets Sold">
                                <button>Archive</button>
                            </div>`;
            movies.appendChild(li);
            [name.value, hall.value, ticketPrice.value] = ['', '', ''];
            const addToArchive = li.querySelector('div button');
            addToArchive.addEventListener('click', archiveBtn)
        }

    }

    function archiveBtn(e) {
        const inputValue = e.target.parentElement.querySelector("input");
        const ticketPrice = e.target.parentElement.querySelector("strong");
        const movieName = e.target.parentElement.parentElement.querySelector("span");
        if (inputValue.value != "" && !isNaN(Number(inputValue.value))) {
            const income = Number(inputValue.value) * Number(ticketPrice.textContent);

            const liEl = document.createElement("li");
            liEl.innerHTML = `<span>${movieName.textContent}</span>
                              <strong>Total amount: ${income.toFixed(2)}</strong>
                              <button>Delete</button>`

            const button = liEl.querySelector("button");
            button.addEventListener("click", deleteEntry);
            archive.appendChild(liEl);
        }
        e.target.parentElement.parentElement.remove();
    }

    function deleteEntry(e) {
        e.target.parentElement.remove();
    }
}