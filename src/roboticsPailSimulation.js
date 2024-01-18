const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const scale = 5

const pailLength = document.getElementById('formPailLength');
const pivotDistance = document.getElementById('formPivotDistance');
const pivotHeight = document.getElementById('formPivotHeight');
const pnematicLength = document.getElementById('formPnematicLength');
const sourceAngle = document.getElementById('formSourceAngle');
const ampAngle = document.getElementById('formAmpAngle');




class PailBot {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.pailEnd = { x: 0, y: 0 };
        this.pailStart = { x: 0, y: 0 };   
    }
    updatePail() {
        
    }
    draw() {
        ctx.strokeStyle = 'purple';
        ctx.beginPath();
        ctx.moveTo(this.pailStart.x, this.pailStart.y);
        ctx.lineTo(this.pailEnd.x, this.pailEnd.y);
        ctx.stroke();
    }
}



function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;

    //normal grid
    ctx.beginPath();
    for (let i = -gridSize; i < gridSize; i+=10) {
        let x1 = i * iHatx + gridSize * jHatx;
        let y1 = i * iHaty + gridSize * jHaty;

        let x2 = i * iHatx + -gridSize * jHatx;
        let y2 = i * iHaty + -gridSize * jHaty;

        ctx.moveTo(x1 + centerX, y1 + centerY);
        ctx.lineTo(x2 + centerX, y2 + centerY);
    }
    ctx.stroke();

    for (let i = -gridSize; i < gridSize; i+=10) {
        let x1 = gridSize * iHatx + i * jHatx;
        let y1 = gridSize * iHaty + i * jHaty;

        let x2 = -gridSize * iHatx + i * jHatx;
        let y2 = -gridSize * iHaty + i * jHaty;

        ctx.moveTo(x1 + centerX, y1 + centerY);
        ctx.lineTo(x2 + centerX, y2 + centerY);
    }
    ctx.stroke();

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


