function attachEventsListeners() {
    document.getElementById('convert').addEventListener('click', convert);
    const distance = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254
    }
    const inputDistance = document.getElementById('inputDistance');
    const inputUnits = document.getElementById('inputUnits');
    const outputDistance = document.getElementById('outputDistance');
    const outputUnits = document.getElementById('outputUnits');

    function convert() {
        const input = Number(inputDistance.value) * distance[inputUnits.value];
        const output = input / distance[outputUnits.value];
        outputDistance.value = output;
    }

}