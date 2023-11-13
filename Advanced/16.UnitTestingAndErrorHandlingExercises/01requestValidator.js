function requestValidator(object) {

    const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const uriTest = /^[\w\.]+$/gm;
    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    const messageTest = /[<>\\&'"]/gm;

    if (object.method == undefined || !methods.includes(object.method)) {
        throw new Error('Invalid request header: Invalid Method');
    } else if (!uriTest.test(object.uri) || object.uri == undefined || object.uri == '') {
        throw new Error('Invalid request header: Invalid URI');
    } else if (!versions.includes(object.version) || object.version == undefined) {
        throw new Error('Invalid request header: Invalid Version');
    } else if (messageTest.test(object.message) || object.message == undefined) {
        throw new Error('Invalid request header: Invalid Message');

    }
    return object;
};
//////////////////////////////////////////////////////////////
function requestValidatorr(object) {

    const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const uriTest = /^[\w\.]+$/gm;
    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    const messageTest = /[<>\\&'"]/gm;
    try {
        if (object.method == undefined || !methods.includes(object.method)) {
            throw new Error('Method');
        } else if (!uriTest.test(object.uri) || object.uri == undefined || object.uri == '') {
            throw new Error('URI');
        } else if (!versions.includes(object.version) || object.version == undefined) {
            throw new Error('Version');
        } else if (messageTest.test(object.message) || object.message == undefined) {
            throw new Error('Message');
        }
    } catch (error) {
        throw new Error(`Invalid request header: Invalid ${error.message}`);
    }
    return object;
};
console.log(requestValidatorr({
    method: 'GEsT',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}));