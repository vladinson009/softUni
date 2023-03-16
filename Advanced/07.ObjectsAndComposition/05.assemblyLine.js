function createAssemblyLine() {
    return {
        hasClima,
        hasAudio,
        hasParktronic
    };


    function hasClima(object) {

        object.temp = 21;
        object.tempSettings = 21,
            object.adjustTemp = () => {
                if (object.temp < object.tempSettings) {
                    object.temp++;
                } else if (object.temp > object.tempSettings) {
                    object.temp--;
                }

            }
    }

    function hasAudio(object) {
        object.currentTrack = {
            name: null,
            artist: null,
        }
        object.nowPlaying = () => {
            if (object.currentTrack.name != null && object.currentTrack.artist != null) {
                console.log(`Now playing '${object.currentTrack.name}' by ${object.currentTrack.artist}`);
            }
        }
        return object;
    }

    function hasParktronic(object) {
        object.checkDistance = (distance) => {
            let string = '';
            distance < 0.1 ? string = 'Beep! Beep! Beep!' :
                distance >= 0.1 && distance < 0.25 ? string = 'Beep! Beep!' :
                distance >= 0.25 && distance < 0.5 ? string = 'Beep!' :
                string;
            console.log(string);
        }
    }
}


const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};
assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);
assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();
assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);
console.log(myCar);