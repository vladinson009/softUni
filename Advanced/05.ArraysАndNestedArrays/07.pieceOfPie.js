function pieceOfPie(pieFlavours, firstFlavour, lastFlavour) {
    const firstIdx = pieFlavours.indexOf(firstFlavour);
    const lastIdx = pieFlavours.indexOf(lastFlavour) + 1;

    return pieFlavours.slice(firstIdx, lastIdx);

}
console.log(pieceOfPie(['Pumpkin Pie',
        'Key Lime Pie',
        'Cherry Pie',
        'Lemon Meringue Pie',
        'Sugar Cream Pie'
    ],
    'Key Lime Pie',
    'Lemon Meringue Pie'));