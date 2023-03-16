function carFactory(obj) {
    const result = {
        model: obj.model,
        engine: {},
        carriage: {
            type: obj.carriage,
            color: obj.color
        },
        wheels: []
    };
    if (obj.power <= 90) {
        result.engine.power = 90;
        result.engine.volume = 1800;
    } else if (obj.power > 90 && obj.power <= 120) {
        result.engine.power = 120;
        result.engine.volume = 2400;
    } else {
        result.engine.power = 200;
        result.engine.volume = 3500;
    }
    if (obj.wheelsize % 2 == 0) {
        obj.wheelsize -= 1
    }
    for (let i = 0; i < 4; i++) {
        result.wheels.push(obj.wheelsize);
    }
    return result;
}
carFactory({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
});