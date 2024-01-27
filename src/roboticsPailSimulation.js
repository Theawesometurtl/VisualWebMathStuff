const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const scale = 7
const ampPadding = 10



const errorMessage = document.getElementById('errorMessage');
const defaultPosition = document.getElementById('defaultPosition');
const pivotDistanceOnPailElement = document.getElementById('pivotDistanceOnPail');

const pivotWidth = 2 * scale;
const chassisLength = 32 * scale;
const bumperLength = 3.5 * scale;
const bumperHeight = 8 * scale;
const chassisHeight = 4.5 * scale;

const ampPocketDepth = 3.775 * scale;
const ampTopPocketHeight = 44 * scale;
const ampBottomPocketHeight = 26 * scale;

const ampHeight = 48 * scale;
const ampWidth = 12 * scale;
const ampFront = ampPadding + ampWidth;


const sourceHeight = 52 * scale;
const sourceWidth = 13.42 *scale;
const sourceOpeningHeight = 36.75 * scale;
const sourceChuteSize = 6 * scale;
const sourceFront = ampPadding + sourceWidth;

const modeSeperation = sourceFront + bumperLength*2 + chassisLength + ampPadding;

window.pailLength = 0
window.pivotDistance = 0
window.pivotHeight = 0
window.pnematicLength =0
window.sourceAngle = 0
window.ampAngle = 0

class PailBot {
    constructor() {
        this.pailEndSource = { x: 0, y: 0 };
        this.pailStartSource = { x: 0, y: 0 };   
        this.pailEndAmp = { x: 0, y: 0 };
        this.pailStartAmp = { x: 0, y: 0 };   
        this.defaultPailAngle = 0;
    }
    errorCheck() {
        let lengths = {'Pail Length': pailLength, 'Pivot Distance': pivotDistance, 'Pivot Height': pivotHeight, 'Pnematic Length':pnematicLength}
        for (const [key, value] of Object.entries(lengths)) {
            if (value < 0) {
                let message = key +' perameter must be positive'
                error(message);
            }
        }

        if (this.pailStartAmp.y < ampBottomPocketHeight) {
            error('The Amp Pail is too low');
        }
        if (this.pailStartSource.y > sourceOpeningHeight) {
            error('The Source Pail is too high');
        }
    }
    updatePail() {
        if (defaultPosition.selectedIndex === 0) {
        this.defaultPailAngle = sourceAngle;
        } else if (defaultPosition.selectedIndex === 1) {
            this.defaultPailAngle = ampAngle;
        } else if (defaultPosition.selectedIndex === 2) {
            this.defaultPailAngle = toRadian(0);
        } else if (defaultPosition.selectedIndex === 3) {
            this.defaultPailAngle = speakerAngle;
        } else {console.error('what the hell, defaultPosition.selectedIndex = ' + defaultPosition.selectedIndex);}

        if (pailLength * Math.cos(Math.abs(this.defaultPailAngle)) < pivotDistance) {
            error("Pivot too far");
        } else {
            //source
            let pivotDistanceOnPail = pivotDistance / Math.cos(Math.abs(this.defaultPailAngle)); //h = a/cos(0)
            pivotDistanceOnPailElement.innerHTML = 'Distance pivot is on the pail:' + (pivotDistanceOnPail/scale);
            this.pailStartSource.x = pivotDistance - pivotDistanceOnPail * Math.cos(Math.abs(sourceAngle)); //a = h * cos(0)
            this.pailStartSource.y = pivotHeight + Math.sin(sourceAngle) * pivotDistanceOnPail; //sin(0)*h = o
            this.pailEndSource.x = pivotDistance + (pailLength-pivotDistanceOnPail) * Math.cos(Math.abs(sourceAngle)); //a = h* cos(0)
            this.pailEndSource.y = pivotHeight - Math.sin(sourceAngle) * (pailLength-pivotDistanceOnPail); //sin(0)*h = o

            //amp
            this.pailStartAmp.x = pivotDistance - pivotDistanceOnPail * Math.cos(Math.abs(ampAngle)); //a = h * cos(0)
            this.pailStartAmp.y = pivotHeight + Math.sin(ampAngle) * pivotDistanceOnPail; //sin(0)*h = o
            this.pailEndAmp.x = pivotDistance + (pailLength-pivotDistanceOnPail) * Math.cos(Math.abs(ampAngle)); //a = h* cos(0)
            this.pailEndAmp.y = pivotHeight - Math.sin(ampAngle) * (pailLength-pivotDistanceOnPail); //sin(0)*h = o
            // console.log(this.pailStartAmp.x/scale, this.pailStartAmp.y/scale, this.pailEndAmp.x/scale, this.pailEndAmp.y/scale, this.pailStartSource.x/scale, this.pailStartSource.y/scale, this.pailEndSource.x/scale, this.pailEndSource.y/scale);
        }
    }
    draw() {
        
        //pivot
        ctx.strokeStyle = 'black';
        ctx.fillStyle= 'black';
        ctx.fillRect(ampFront + bumperLength + pivotDistance - pivotWidth/2, canvas.height -pivotHeight, pivotWidth, pivotHeight);

        ctx.strokeStyle = 'black';
        ctx.fillStyle= 'black';
        ctx.fillRect(sourceFront + bumperLength + pivotDistance - pivotWidth/2, canvas.height -pivotHeight -ampHeight -ampPadding, pivotWidth, pivotHeight);
        
        //bumpers
        ctx.lineWidth = .5;
        ctx.strokeStyle = 'green';
        ctx.fillStyle = 'green';
        //front bumper
        ctx.fillRect(ampFront, canvas.height - bumperHeight, bumperLength, bumperHeight);
        ctx.fillRect(sourceFront, canvas.height - bumperHeight  -ampHeight -ampPadding, bumperLength, bumperHeight);
        //back bumper
        ctx.fillRect(ampFront + bumperLength + chassisLength, canvas.height -bumperHeight, bumperLength, bumperHeight);
        ctx.fillRect(sourceFront + bumperLength + chassisLength, canvas.height -bumperHeight  -ampHeight -ampPadding, bumperLength, bumperHeight);
        
        //chassis
        ctx.strokeStyle = 'gray';
        ctx.fillStyle = 'gray';
        ctx.fillRect(ampFront + bumperLength, canvas.height -chassisHeight, chassisLength, chassisHeight)
        ctx.fillRect(sourceFront + bumperLength, canvas.height -chassisHeight  -ampHeight -ampPadding, chassisLength, chassisHeight)
        
        //pail
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(this.pailStartSource.x + sourceFront + bumperLength, canvas.height -this.pailStartSource.y -ampHeight -ampPadding);
        ctx.lineTo(this.pailEndSource.x + sourceFront + bumperLength, canvas.height -this.pailEndSource.y -ampHeight -ampPadding);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.pailStartAmp.x + ampFront + bumperLength, canvas.height -this.pailStartAmp.y);
        ctx.lineTo(this.pailEndAmp.x + ampFront + bumperLength, canvas.height -this.pailEndAmp.y);
        ctx.stroke();

        //piston
        ctx.strokeStyle = 'silver';

    }
}

let pailBot = new PailBot()

function hideError() {
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = "Error: "
}
function error(message) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML += message + '\n';
}

function toRadian(degrees)
{
  return degrees * (Math.PI/180);
}

function main() {
    hideError();
    pailBot.errorCheck();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;

    window.pailLength = document.getElementById('formPailLength').value * scale;
    window.pivotDistance = document.getElementById('formPivotDistance').value * scale;
    window.pivotHeight = document.getElementById('formPivotHeight').value * scale;
    // window.pnematicLength = parseInt(document.getElementById('formPnematicLength').value) * scale;
    window.sourceAngle = toRadian(document.getElementById('formSourceAngle').value);
    window.ampAngle = toRadian(document.getElementById('formAmpAngle').value);

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

    //source
    ctx.fillStyle = '#57b4f2';
    ctx.strokeStyle = '#57b4f2';
    ctx.beginPath();
    ctx.moveTo(ampPadding, canvas.height -ampHeight -ampPadding);
    ctx.lineTo(ampPadding, canvas.height -ampHeight -ampPadding -sourceHeight);
    ctx.lineTo(ampPadding + sourceWidth, canvas.height - sourceOpeningHeight -ampHeight -ampPadding);
    ctx.lineTo(ampPadding + sourceWidth, canvas.height -ampHeight -ampPadding);
    ctx.stroke();
    ctx.fill();

    pailBot.updatePail();
    pailBot.draw();

}

setInterval(main, 100);


