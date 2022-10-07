function cone(radius, height) {
    let volume = 1 / 3 * height * Math.PI * Math.pow(radius, 2)

    let l = Math.sqrt(Math.pow(height, 2) + Math.pow(radius, 2))

    let area = Math.PI * Math.pow(radius, 2) + Math.PI * radius * l


    console.log(`volume = ${volume.toFixed(4)}`);
    console.log(`area = ${area.toFixed(4)}`);
}
cone(3, 5);