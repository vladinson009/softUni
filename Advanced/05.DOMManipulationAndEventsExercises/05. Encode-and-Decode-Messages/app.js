function encodeAndDecodeMessages() {
    const [sent, received] = document.querySelectorAll('textarea');
    const [sentBtn, receivedBtn] = document.querySelectorAll('button');
    sentBtn.addEventListener('click', sending);
    receivedBtn.addEventListener('click', receiving);


    function sending() {
        const text = sent.value;
        const newText = [];
        for (let i = 0; i < text.length; i++) {
            const newCharCode = text.charCodeAt(i) + 1;
            newText.push(String.fromCharCode(newCharCode));
        }
        received.value = newText.join('');
        sent.value = '';
    }

    function receiving(e) {
        const text = received.value;
        const newText = [];
        for (let i = 0; i < text.length; i++) {
            const newCharCode = text.charCodeAt(i) - 1;
            newText.push(String.fromCharCode(newCharCode));
        }
        received.value = newText.join('');
    }
}