function calorieObject(list) {
    const result = {};
    for (let i = 0; i < list.length; i += 2) {
        result[list[i]] = Number(list[i + 1]);
    }
    console.log(result);
}
calorieObject(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);