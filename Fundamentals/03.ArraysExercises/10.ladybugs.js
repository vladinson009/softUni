function ladybugs(input) {
    const field = new Array(Number(input.shift())).fill(0);
    let positions = input.shift().split(' ').map(Number)
    for (let i = 0; i < field.length; i++) {
        if (positions[i] >= 0 && positions[i] < field.length) {
            field[positions[i]] = 1
        }
    }
    for (let i = 0; i < input.length; i++) {
        let [idx, command, steps] = input[i].split(' ');
        idx = Number(idx);
        steps = Number(steps);
        if (field[idx] == 1) {
            field[idx] = 0;
        } else {
            continue;
        }
        if (command == 'right') {
            for (let i = 0; i < field.length; i++) {
                if (field[idx + steps] == 0) {
                    field[idx + steps] = 1;
                    break;
                }
                steps += steps;
            }
        } else if (command == 'left') {
            for (let i = 0; i < field.length; i++) {
                if (field[idx - steps] == 0) {
                    field[idx - steps] = 1;
                    break;
                }
                steps += steps;
            }
        }
    }
    console.log(field.join(' '));
}
ladybugs([3, '0 1',
    '0 right 1',
    '2 right 1'
]);


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function ladyBug(list) {
    let index = 0;
    let fieldSize = Number(list[index++]);
    let bugsPositions = (list[index++]).split(' ').map(Number);
    let ladyBugsArray = [];

    for (let i = 0; i < fieldSize; i++) {
        ladyBugsArray.push(0);
    }
    // mark starting ladybugs index

    for (let i = 0; i < fieldSize; i++) {
        let ladyBugIndex = bugsPositions[i];
        if (ladyBugIndex >= 0 && ladyBugIndex < fieldSize) {
            ladyBugsArray[ladyBugIndex] = 1;
        }
    }

    for (let i = 2; i < list.length; i++) {
        // JS destructuring;
        let [ladyBugIndex, command, jumpLength] = list[i].split(' ');
        let ladyBugIndex = Number(ladyBugIndex);
        let jumpLength = Number(jumpLength);
    }
}

ladyBug([3, '0 1', '0 right 1', '2 right 1'])



// check for negative steps

// Free Position

// Ladybug jumps one time

// Jump another time if there is a lady bug

// Lady bug jumps to the left

// Jump another time if there is a lady bug