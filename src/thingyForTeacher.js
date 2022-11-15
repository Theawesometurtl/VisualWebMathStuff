const words = document.getElementById('numberFlops');
const numInput = document.getElementById('numberInput');
outputText = 'number flops:';



function flippityFlop(num, iterations) {
    iterations++;
    num = num.toString();
    let digits=[];
    let newNumLarge="";
    let newNumSmall="";
    for (let i = 0; i < num.length; i++) {
        if (num.charAt(i).toString() != '-') {
            digits.push(num.charAt(i).toString());
        }
    }
    digits.sort( function( a , b){
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
    });
        

    for (let i = 0; i < digits.length; i++) {
        newNumSmall+=digits[i]
    }
    digits.sort( function( a , b){
    if(a < b) return 1;
    if(a > b) return -1;
    return 0;
    });
    for (let i = 0; i < digits.length; i++) {
        newNumLarge+=digits[i]
    }
    words.innerHTML = words.innerHTML.toString() + ' '+ newNumLarge +'- ' + newNumSmall +' = ';
    newNumLarge = parseInt(newNumLarge, 10) - parseInt(newNumSmall, 10);
    words.innerHTML = words.innerHTML.toString() + newNumLarge + '\n'
    if (newNumLarge != num && iterations < 1000) {
        
        flippityFlop(newNumLarge, iterations); 
    }
    
}

function callFlippityFlop() {

    flippityFlop(numInput.value, 0);
}