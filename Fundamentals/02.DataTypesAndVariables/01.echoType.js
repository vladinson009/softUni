function echoType(input) {
    const type = typeof input;
    console.log(type);
    type == 'string' || type == 'number' ? console.log(input) :
        console.log('Parameter is not suitable for printing');
}
echoType(1);