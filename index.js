const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const jhatx = document.getElementById('form1x');
const jhaty = document.getElementById('form1y');
const ihatx = document.getElementById('form2x');
const ihaty = document.getElementById('form2y');





let xSize = 400;
let ySize = 400;

let jHatx = 0;
let jHaty = 1;
let iHatx = 1;
let iHaty = 0;

canvas.width = xSize;
canvas.height = ySize;


ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

ctx.beginPath();
ctx.moveTo(0, ySize/2);
ctx.lineTo(xSize, ySize/2);
ctx.stroke();

ctx.moveTo(xSize/2, 0);
ctx.lineTo(xSize/2, ySize);
ctx.stroke();

function jhat () {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(xSize/2, ySize/2);
    ctx.lineTo((xSize/2) + jHatx, (ySize/2) + jHaty);console.log(xSize/2 + jHatx, ySize/2 + jHaty);
    ctx.stroke();
}

function ihat () {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(xSize/2, ySize/2);
    ctx.lineTo((xSize/2) + iHatx, (ySize/2) + iHaty);
    ctx.stroke();
}

function main () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, ySize/2);
    ctx.lineTo(xSize, ySize/2);
    ctx.stroke();

    ctx.moveTo(xSize/2, 0);
    ctx.lineTo(xSize/2, ySize);
    ctx.stroke();

    iHatx = parseInt(ihatx.value);
    iHaty = parseInt(ihaty.value);
    jHatx = parseInt(jhatx.value);
    jHaty = parseInt(jhaty.value);
    ihat();
    jhat();


    
}

setInterval(main, 30);


canvas.addEventListener("click", findMousePos);

function findMousePos(event) {
    //needed to get mouse position relative to the canvas
    var rect = canvas.getBoundingClientRect();
    
    console.log(event.clientX - rect.left, event.clientY - rect.top);
    
  }