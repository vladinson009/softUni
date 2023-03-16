function lockedProfile() {
    Array.from(document.querySelectorAll('button')).forEach(x => x.addEventListener('click', onToggle));

    function onToggle(e) {
        const parent = e.target.parentElement;
        const isActive = parent.querySelector('input[type="radio"][value="unlock"]').checked;
        const hiddenField = Array.from(parent.querySelectorAll('div')).find(div => div.id.includes('HiddenFields'));
        if (isActive) {
            if (e.target.textContent == 'Show more') {
                e.target.textContent = 'Hide it';
                hiddenField.style.display = 'block'
            } else {
                e.target.textContent = 'Show more';
                hiddenField.style.display = ''
            }
        }
    }
}