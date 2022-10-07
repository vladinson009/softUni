function tseamAccount(list) {
    const games = list.shift().split(' ');
    const action = {
        'Install': install,
        'Uninstall': uninstall,
        'Update': update,
        'Expansion': expansion
    }
    for (each of list) {
        if (each == 'Play!') {
            break;
        } else {
            let [option, game] = each.split(' ');
            action[option](game)
        }
    }
    console.log(games.join(' '));

    function install(g) {
        if (!games.includes(g)) {
            games.push(g);
        }
    }

    function uninstall(g) {
        if (games.includes(g)) {
            let idx = games.indexOf(g);
            games.splice(idx, 1);
        }
    }

    function update(g) {
        if (games.includes(g)) {
            let idx = games.indexOf(g);
            games.push(games.splice(idx, 1).toString());
        }
    }

    function expansion(g) {
        let [game, expansion] = g.split('-');
        if (games.includes(game)) {
            games.splice(games.indexOf(game) + 1, 0, `${game}:${expansion}`)
        }
    }
}
tseamAccount(['CS WoW Diablo',
    'Uninstall XCOM',
    'Update PeshoGame',
    'Update WoW',
    'Expansion Civ-V',
    'Play!'
])