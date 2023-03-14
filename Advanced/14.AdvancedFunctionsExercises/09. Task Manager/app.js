function solve() {
    document.addEventListener('click', add);

    function add(e) {
        e.preventDefault();
        if (e.target.tagName == 'BUTTON') {
            if (e.target.className == 'green') {
                const article = e.target.parentElement.parentElement;
                const buttonsHolder = e.target.parentElement;
                const inProggress = document.getElementById('in-progress');
                inProggress.appendChild(article);
                article.querySelector('.green').remove();
                const thirdBtn = document.createElement('button');
                thirdBtn.className = 'orange';
                thirdBtn.textContent = 'Finish';
                buttonsHolder.appendChild(thirdBtn);
            } else if (e.target.className == 'red') {
                e.target.parentElement.parentElement.remove();
            } else if (e.target.className == 'orange') {
                const toGreenSection = document.querySelector('h1.green').parentElement.parentElement.children[1];
                const removeBtns = e.target.parentElement;
                toGreenSection.appendChild(removeBtns.parentElement);
                removeBtns.remove();
            } else {
                const [task, date] = document.querySelectorAll('input[type = "text"]');
                const description = document.getElementById('description');
                if (task.value != '' && date.value != '' && description.value != '') {
                    const openPush = document.querySelector('h1[class="orange"]').parentElement.parentElement.children[1];
                    const article = document.createElement('article');
                    const h3Task = document.createElement('h3');
                    const pDescr = document.createElement('p');
                    const pDate = document.createElement('p');
                    const divBtn = document.createElement('div');
                    const firstBtn = document.createElement('button');
                    const secondBtn = document.createElement('button');
                    h3Task.textContent = task.value;
                    pDescr.textContent = `Description: ${description.value}`;
                    pDate.textContent = `Due Date: ${date.value}`;
                    divBtn.className = 'flex';

                    firstBtn.className = 'green';
                    firstBtn.textContent = 'Start';
                    secondBtn.className = 'red';
                    secondBtn.textContent = 'Delete';

                    article.appendChild(h3Task);
                    article.appendChild(pDescr);
                    article.appendChild(pDate);
                    article.appendChild(divBtn);
                    divBtn.appendChild(firstBtn);
                    divBtn.appendChild(secondBtn);
                    openPush.appendChild(article);
                    [task.value, date.value, description.value] = ['', '', '']
                }
            }
        }
    }
}