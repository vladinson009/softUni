function validate() {
    const email = document.getElementById('email');
    const regexp = /\w+@.+/g
    email.addEventListener('change', onChange);

    function onChange() {
        if (regexp.test(email.value)) {
            email.className = '';
        } else {
            email.className = 'error';
        }
    }
    //  <name>@<domain>.<extension>

}