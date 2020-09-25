const canvas = document.getElementById('canvas');
const c = canvas.getContext("2d");

let x = undefined;
let y = undefined;
let isMouseDown = false;

let color = "rgb(0,0,0)";
let isEraser = false;

// so that when we download we have a white background
c.fillStyle = 'white';
c.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);

canvas.addEventListener('mousedown', (e) => {
    if (!x && !y) {
        x = e.offsetX;
        y = e.offsetY;
    }
    isMouseDown = true;
})

canvas.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        if (!isEraser) {
            draw(brushSize, color, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        } else {
            draw(65, 'white', e.offsetX, e.offsetY); // to erase fast
            x = e.offsetX;
            y = e.offsetY;
        }
    }
})

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
    x = undefined;
    y = undefined;
})

let brushSize = 8;

const downloadBtn = document.getElementById('download');

const plusBtn = document.getElementById('plus');
const sizeBox = document.getElementById('size');
const minusBtn = document.getElementById('minus');
const colorBtn = document.getElementById('color');
const eraseBtn = document.getElementById('erase');
const clearBtn = document.getElementById('clear');

sizeBox.innerHTML = brushSize;

downloadBtn.addEventListener('click', () => {
    download();
})

// size to be from 20 <= size <= 50
plusBtn .addEventListener('click', () => {
    isEraser = false;
    eraseBtn.classList.remove('selected');
    if (brushSize <= 47) {
        brushSize += 3;
    } else brushSize = 50;
    sizeBox.innerHTML = brushSize;
});
minusBtn.addEventListener('click', () => {
    isEraser = false;
    eraseBtn.classList.remove('selected');
    if (brushSize >= 5) {
        brushSize -= 3;
    } else brushSize = 2;
    sizeBox.innerHTML = brushSize;
});
colorBtn.addEventListener('change', (e) => {
    color = e.target.value;
    prevColor = color;
    isEraser = false;
    eraseBtn.classList.remove('selected');
})
eraseBtn.addEventListener('click', () => {
    isEraser = !isEraser;
    isEraser ? eraseBtn.classList.add('selected') : eraseBtn.classList.remove('selected');
});
clearBtn.addEventListener('click', () => {
    isEraser = false;
    eraseBtn.classList.remove('selected');
    c.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);
});

function draw(size, someColor, x2, y2) {
    c.beginPath();
    c.lineCap = 'round';
    c.strokeStyle = someColor;
    c.lineWidth = size;
    c.moveTo(x,y); // start 
    c.lineTo(x2,y2); // end
    c.stroke();
}

function download() {
    let dataURL = canvas.toDataURL('image/png');
    // console.log(dataURL);
    let  w = window.open('about:blank','image from canvas');
    w.document.write("<img src='"+dataURL+"' alt='from canvas'/>");
}