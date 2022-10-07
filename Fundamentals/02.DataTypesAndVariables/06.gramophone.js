function gramophone(name, album, song) {

    const lengthSeconds = album.length * name.length * song.length / 2
    const rotations = Math.ceil(lengthSeconds / 2.5)

    console.log(`The plate was rotated ${rotations} times.`);
}
gramophone('Rammstein', 'Sehnsucht', 'Engel');