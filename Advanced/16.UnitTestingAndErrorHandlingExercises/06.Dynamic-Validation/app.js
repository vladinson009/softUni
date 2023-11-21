function validate() {
    const input = document.querySelector('#email');
    const regexp = /[a-z]+[a-z0-9_]*@[a-z]+[a-z0-9_]*\.[a-z]+[a-z0-9_]*/;
    input.addEventListener('change', onChange);

    function onChange() {
        if (regexp.test(input.value)) {
            input.classList.remove('error');
        } else {
            input.classList.add('error');
        };
    }
}