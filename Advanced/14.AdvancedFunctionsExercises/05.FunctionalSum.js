function add(num) {

    function addMore(num2) {
        num += num2;
        return addMore;
    }
    addMore.toString = () => {
        return num;
    }
    return addMore
}

console.log(add(1)(6)(-3).toString());