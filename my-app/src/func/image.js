import React, { PureComponent } from 'react';
let convertImage = function (source) {
        var canvas = document.createElement('canvas');
        var context2D = canvas.getContext('2d');
        self.convertImage = function (image, format) {
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            image.crossOrigin = "Anonymous";
            context2D.drawImage(image, 0, 0);
            return  canvas.toDataURL('image/' + (format || 'png'),  1);
        };
}



export { convertImage };

