let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/','+/-','%'];

const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}


document.querySelector('.ac').onclick = clearAll;
document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('ac')) return;
    out.textContent = '';

    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a+= key;
            console.log(a, b, sign);
            out.textContent = a;
        }
        else if(a!=='' && sign!=='' && finish){
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.log(a, b, sign);
        return;
    }
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a, b, sign);
        return;
    }
    if (key === '=') {
        if (b === '') b = a;
        switch(sign) {
            case "+": a = (+a) + (+b); break;
            case "-": a = Math.floor((a - b) * 100)/100; break;
            case "X": a = Math.floor((a * b) * 100)/100; break;
            case "/": 
                if (b === '0') {
                    out.textContent = 'Помилка!'
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                    a = Math.floor((a / b)*100) / 100; break;
            case "+/-":
                if(a > 0 || a < 0 || a == 0 ) {
                    a *= -1;
                }
                break;
            case "%": a =  Math.floor((a * (b / 100))*100) / 100 ; break;
        }
        finish = true;
        out.textContent = a;
        console.log(a, b, sign)
    }
}