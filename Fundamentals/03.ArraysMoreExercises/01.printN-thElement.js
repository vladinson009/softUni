function N_element(list) {
    const step = Number(list.pop());
    const result = [];
    for (let i = 0; i < list.length; i += step) {
        result.push(list[i]);
    }
    console.log(result.join(' '));
}
N_element(['5', '20', '31', '4', '20', '3']);