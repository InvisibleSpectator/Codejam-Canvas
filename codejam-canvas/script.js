const concat = (xs, ys) => xs.concat(ys);

const hexToRGBA = hexStr => {
    try {
        return [
            parseInt(hexStr.substr(0, 2), 16),
            parseInt(hexStr.substr(2, 2), 16),
            parseInt(hexStr.substr(4, 2), 16),
            255
        ]
    } catch {
        return hexStr;
    }
};

var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");

var button_4 = document.getElementById('4');
var button_32 = document.getElementById('32');
var button_512 = document.getElementById('512');

button_4.addEventListener('click', function() {
    fetch(
            'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json'
        )
        .then(res => res.json())
        .then(data => draw(data));
    event.stopPropagation();
});

button_32.addEventListener('click', function() {
    fetch(
            'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json'
        )
        .then(res => res.json())
        .then(data => draw(data));
    event.stopPropagation();
});

button_512.addEventListener('click', function() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth;
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src =
        'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png';

    event.stopPropagation();
});

function draw(picture) {
    canvas.height = picture.length;
    canvas.width = picture[0].length;

    let flattenedRGBAValues = picture
        .reduce(concat)
        .map(hexToRGBA)
        .reduce(concat);

    const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), canvas.width, canvas.height);
    ctx.putImageData(imgData, 0, 0);
}