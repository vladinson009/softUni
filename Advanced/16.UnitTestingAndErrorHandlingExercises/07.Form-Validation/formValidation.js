function validate() {

    const usernameRegExp = /^[A-Za-z0-9]{3,20}$/;
    const passwordRegExp = /^[a-zA-Z0-9_]{5,15}$/;
    const emailRegExp = /^[\w_]+@[\w\.]*\.[\w\.]*$/;

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const valid = document.getElementById('valid');

    const isCompany = document.getElementById('company');
    isCompany.checked = false;
    const compnayInfo = document.getElementById('companyInfo');
    const companyNumber = document.getElementById('companyNumber');

    const submit = document.getElementById('submit');

    submit.addEventListener('click', onClick);

    isCompany.addEventListener('change', () => {
        if (isCompany.checked) {
            compnayInfo.style.display = 'block';
        } else {
            compnayInfo.style.display = 'none';
        }
    });

    function onClick(e) {
        let validate = true
        const isMatchPass = password.value == confirmPassword.value;
        e.preventDefault();
        // USERNAME CHECK
        if (usernameRegExp.test(username.value)) {
            username.style.border = '';
        } else {
            username.style.borderColor = 'red';
            validate = false;
        };
        //PASSWORD CHECK
        if (passwordRegExp.test(password.value) &&
            passwordRegExp.test(confirmPassword.value) &&
            isMatchPass) {
            password.style.border = '';
            confirmPassword.style.border = '';

        } else {
            password.style.borderColor = 'red';
            confirmPassword.style.borderColor = 'red';
            validate = false;
        }
        // EMAIL CHECK
        if (emailRegExp.test(email.value)) {
            email.style.border = '';
        } else {
            email.style.borderColor = 'red';
            validate = false;
        };
        // COMPANY NUMBER
        if (isCompany.checked) {
            if (companyNumber.value >= 1000 && companyNumber.value <= 9999) {
                companyNumber.style.border = '';
            } else {
                companyNumber.style.borderColor = 'red';
                validate = false;
            };
        };
        // VALIDATE INPUTS //
        if (validate) {
            valid.style.display = 'block';
        } else {
            valid.style.display = 'none';
        };

    };

};