function evenOddSubtraction(list) {
    let even = 0;
    let odd = 0;
    for (let i = 0; i < list.length; i++) {
        const num = Number(list[i]);
        if (num % 2 == 0) {
            even += num;
        } else {
            odd += num;
        }
    }
    console.log(even - odd);
}
evenOddSubtraction([1, 2, 3, 4, 5, 6]);