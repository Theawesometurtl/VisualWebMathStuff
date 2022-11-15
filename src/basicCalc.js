const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function theFunction(num) {
    num = Math.sin(num);
    return num;
}

ctx.strokeStyle = 'black';
ctx.lineWidth = 1;
for (let i = 0; i < canvas.width; i++) {
    ctx.beginPath();
    ctx.moveTo(i, -(theFunction(i*.1)*50)+canvas.height-100);
    ctx.lineTo(i+1, -(theFunction((i+1)*.1)*50)+canvas.height-100);
    ctx.stroke();
}
ctx.strokeStyle = 'green';
ctx.lineWidth = 1;
for (let i = 0; i < canvas.width; i++) {
    prevy = theFunction(i*.1) - theFunction((i-1)*.1);
    y = theFunction((i+1)*.1) - theFunction(i*.1);
    ctx.beginPath();
    ctx.moveTo(i, -(prevy*200)+canvas.height-100);
    ctx.lineTo(i+1, -(y*200)+canvas.height-100);
    ctx.stroke();
}