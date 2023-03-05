function add(num) {

    let func = (second) => {
        return num + second;
    }
    return func
}


let add7 = add(7);
console.log(add7(2));
console.log(add7(3));