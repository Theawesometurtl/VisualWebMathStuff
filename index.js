const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ihatx = document.getElementById('form1x');
const ihaty = document.getElementById('form1y');
const jhatx = document.getElementById('form2x');
const jhaty = document.getElementById('form2y');



let listOfVectors = [];

let gridSize = 100;
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

let iHatx = 1;
let iHaty = 0;
let jHatx = 0;
let jHaty = 1;


ctx.strokeStyle = 'black';
ctx.lineWidth = 1;


class Vector {
    constructor() {
        this.position = { x: 0, y: 0 };
    }
    draw() {
        ctx.strokeStyle = 'purple';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        let x = this.position.x * iHatx + this.position.x * iHaty;
        let y = this.position.y * jHatx + this.position.y * jHaty;
        ctx.lineTo(x + centerX, y + centerY);
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
    for (let i = -gridSize; i < gridSize; i+=10) {
        let x = i * iHatx + i * iHaty;
        let y = gridSize * jHatx + gridSize * jHaty;

        ctx.moveTo(x + centerX, y + centerY);
        ctx.lineTo(x + centerX, -y + centerY);
    }
    ctx.stroke();

    for (let i = 0; i < xSize; i+=10) {

        ctx.moveTo();
        ctx.lineTo();
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