let Dcopy = function (source) {
    return JSON.parse(JSON.stringify(source))
}
let createGUID = function (source) {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    let result = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
    return result;
}
let isBlob = function (source) {
    try {
        return ArrayBuffer.isView(new DataView(source))
    } catch (error) {
        return false
    }
}



export { Dcopy, createGUID,isBlob };

