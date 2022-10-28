function generateReport() {
    const output = document.getElementById('output');
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const info = Array.from(document.querySelectorAll('tbody tr'));
    const result = [];
    for (let i = 0; i < info.length; i++) {
        const obj = {};
        for (let j = 0; j < checkboxes.length; j++) {

            if (checkboxes[j].checked) {
                obj[checkboxes[j].name] = info[i].children[j].textContent;
            }
        }
        result.push(obj)
    }
    output.value = JSON.stringify(result, null, 2)

}