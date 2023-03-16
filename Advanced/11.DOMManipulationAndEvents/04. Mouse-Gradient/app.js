function attachGradientEvents() {
    document.getElementById('gradient')
        .addEventListener('mousemove', (e) => document
            .getElementById('result')
            .textContent = Math.floor(e.offsetX / e.target.clientWidth * 100) + '%');
}