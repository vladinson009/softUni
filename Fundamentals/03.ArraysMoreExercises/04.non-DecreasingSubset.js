function nonDecreasing(list) {
    let max = Number.MIN_SAFE_INTEGER;
    console.log(
        list.filter(e => {
            if (e >= max) {
                max = e;
                return true;
            } else {
                false;
            }
        })
        .join(' '));

}
nonDecreasing([1, 3, 8, 4, 10, 12, 3, 2, 24]);