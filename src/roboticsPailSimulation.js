const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const scale = 10
const ampPadding = 10

const pailLength = document.getElementById('formPailLength');
const pivotDistance = document.getElementById('formPivotDistance');
const pivotHeight = document.getElementById('formPivotHeight');
const pnematicLength = document.getElementById('formPnematicLength');
const sourceAngle = document.getElementById('formSourceAngle');
const ampAngle = document.getElementById('formAmpAngle');
const errorMessage = document.getElementById('errorMessage');

const pivotWidth = 2 * scale;
const chassisLength = 20 * scale;
const bumperLength = 3 * scale;
const bumperHeight = 8 * scale;
const chassisHeight = 7 * scale;

const ampPocketDepth = 3.775 * scale;
const ampTopPocketHeight = 44 * scale;
const ampBottomPocketHeight = 26 * scale;

const ampHeight = 48 * scale;
const ampWidth = 12 * scale;
const ampFront = ampPadding + ampWidth;

class PailBot {
    constructor() {
        this.pailEnd = { x: 0, y: 0 };
        this.pailStart = { x: 0, y: 0 };   
    }
    updatePail() {
        if (pailLength * Math.cos(sourceAngle) < pivotDistance) {
            error("Pivot too far");
        } else {
            this.pailEnd.x = pailLength - pivotDistance
        }
    }
    draw() {
        ctx.strokeStyle = 'purple';
        ctx.beginPath();
        ctx.moveTo(this.pailStart.x, this.pailStart.y);
        ctx.lineTo(this.pailEnd.x, this.pailEnd.y);
        ctx.stroke();

        //bumpers
        ctx.strokeStyle = 'green';
        ctx.fillStyle = 'green';
        //front bumper
        ctx.fillRect(ampFront, canvas.height - bumperHeight, bumperLength, bumperHeight);
        //back bumper
        ctx.fillRect(ampFront + bumperLength + chassisLength, canvas.height -bumperHeight, bumperLength, bumperHeight);

        //chassis
        ctx.strokeStyle = 'gray';
        ctx.fillStyle = 'gray';
        ctx.fillRect(ampFront + bumperLength, canvas.height -chassisHeight, chassisLength, chassisHeight)

        //pivot
        ctx.strokeStyle = 'black';
        ctx.fillStyle= 'black';
        ctx.fillRect(ampFront + bumperLength + pivotDistance - pivotWidth/2, canvas.height -pivotHeight, pivotWidth, pivotHeight);

    }
}

let pailBot = new PailBot()

function hideError() {
    errorMessage.display = 'none';
    errorMessage.text = "Error: "
}
function error(message) {
    errorMessage.display = 'block';
    errorMessage.text += message + '\n';
}

function main() {
    hideError();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;

    //amp
    
    ctx.beginPath();
    ctx.moveTo(ampPadding, canvas.height);
    ctx.lineTo(ampPadding, canvas.height -ampHeight);
    ctx.lineTo(ampFront, canvas.height -ampHeight);
    ctx.lineTo(ampFront, canvas.height -ampTopPocketHeight);
    ctx.lineTo(ampFront - ampPocketDepth, canvas.height -ampTopPocketHeight);
    ctx.lineTo(ampFront - ampPocketDepth, canvas.height -ampBottomPocketHeight);
    ctx.lineTo(ampFront, canvas.height -ampBottomPocketHeight);
    ctx.lineTo(ampFront, canvas.height);
    ctx.stroke();
    ctx.fillStyle = '#8a241d';
    ctx.fill();

    pailBot.draw();

}

setInterval(main, 100);


