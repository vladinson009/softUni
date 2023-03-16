function heroicInventory(list) {
    const result = [];

    for (const hero of list) {
        let [name, level, items] = hero.split(' / ');
        level = Number(level);
        items = items ? items.split(', ') : [];
        result.push({
            name,
            level: Number(level),
            items
        })
    }
    console.log(JSON.stringify(result));

}
heroicInventory(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
])