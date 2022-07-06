const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ihatx = document.getElementById('form1x');
const ihaty = document.getElementById('form1y');
const jhatx = document.getElementById('form2x');
const jhaty = document.getElementById('form2y');



let listOfVectors = [];

let xSize = 1000;
let ySize = 1000;
let centerX = xSize / 2;
let centerY = ySize / 2;

let jHatx = 0;
let jHaty = 1;
let iHatx = 1;
let iHaty = 0;

canvas.width = xSize;
canvas.height = ySize;


ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

ctx.beginPath();
ctx.moveTo(0, centerY);
ctx.lineTo(xSize, centerY);
ctx.stroke();

ctx.moveTo(centerX, 0);
ctx.lineTo(centerX, ySize);
ctx.stroke();

class Vector {
    constructor() {
        this.position = { x: 0, y: 0 };
    }
    draw() {
        ctx.strokeStyle = 'purple';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(this.position.x * iHatx + this.position.y * jHatx, this.position.x * iHaty + this.position.y * jHaty);
        ctx.stroke();
    }
}

function ihat() {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + iHatx * 25, centerY + iHaty * 25);
    ctx.stroke();
}

function jhat() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + jHatx * 25, centerY + jHaty * 25);
    ctx.stroke();
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;

    //normal grid
    ctx.beginPath();
    for (let i = 0; i < xSize; i+=10) {
        let x = (xSize * iHatx) + (i * jHatx);
        let y = (xSize * iHaty) + (i * jHaty);
        ctx.moveTo(-x + i, -y + centerY);
        ctx.lineTo(x + i, y + centerY);
    }
    ctx.stroke();

    for (let i = 0; i < xSize; i+=10) {
        let x = (i * iHatx) + (ySize * jHatx);
        let y = (i * iHaty) + (ySize * jHaty);
        ctx.moveTo(-x + centerX, -y + i);
        ctx.lineTo(x + centerX, y + i);
    }
    //ctx.stroke();

    //rotated grid
    

    iHatx = parseInt(ihatx.value);
    iHaty = parseInt(ihaty.value);
    jHatx = parseInt(jhatx.value);
    jHaty = parseInt(jhaty.value);
    ihat();
    jhat();

    for (var i = 0; i < listOfVectors.length; i++) {
        listOfVectors[i].draw();
    }



}

setInterval(main, 30);


canvas.addEventListener("click", findMousePos);

function findMousePos(event) {
    //needed to get mouse position relative to the canvas
    var rect = canvas.getBoundingClientRect();

    console.log(event.clientX - rect.left, event.clientY - rect.top);
    let vector = new Vector();
    vector.position.x = event.clientX - rect.left;
    vector.position.y = event.clientY - rect.top;
    listOfVectors.push(vector);

}