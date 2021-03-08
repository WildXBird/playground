import React, { PureComponent } from 'react';
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
let Blob2ArrayBuffer = function (source) {
    return new Promise(function (resolve, reject) {
        try {
            var blob = new Blob([1, 2, 3, 4, 5])
            var reader = new FileReader()
            reader.readAsArrayBuffer(blob)

            reader.onload = function () {
                console.log(this.result)
            }
        } catch (error) {
            return false
        }
    })
}
// let MyComponent = function (source) {
window.MyComponent = function (source) {
    const MyComponent = React.memo(function MyComponent(props) {
       console.log("props",props)
       return performance.now()
      });
      return MyComponent
}



export { Dcopy, createGUID, isBlob };

