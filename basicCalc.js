const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


ctx.strokeStyle = 'black';
ctx.lineWidth = 1;
for (let i = 0; i < canvas.width; i++) {
    y = i**2;
    ctx.fillRect( i, y, 1, 1 );
    
}
