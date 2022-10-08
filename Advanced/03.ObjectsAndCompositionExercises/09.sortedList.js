function createSortedList() {
    let arr = [];
    //let size = arr.length;
    const obj = {
        add,
        remove,
        get,
        // size: arr.length
        get size() {
            return arr.length
        }

    }
    return obj;

    function add(element) {
        if (typeof element == 'number') {
            arr.push(element);
            arr.sort((a, b) => a - b);
            // obj.size = arr.length;

        } else {
            console.log('type of element is not a number');
        }
    }

    function remove(index) {
        if (index >= 0 && index < arr.length) {
            arr.splice(index, 1)
            // obj.size = arr.length;

        } else {
            console.log('Can not remove index. Index is out of bound');
        }
    }

    function get(index) {
        if (index >= 0 && index < arr.length) {
            return arr[index];
        } else {
            console.log('Can not get index. Index is out of bound');
        }
    }
}
let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));
console.log(list)