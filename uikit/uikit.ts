const inputs = document.getElementsByTagName('input') as HTMLCollectionOf<HTMLElement>;
for(let i=0; i<inputs.length; i++){
  const names = inputs[i].getAttribute('name');
  //console.log(names);
}
inputs[6].addEventListener('click', function(){
  //console.log('input clicked!');
})


const testClass = document.getElementsByClassName('test') as HTMLCollectionOf<HTMLFormElement>;
const plusBtn = document.getElementsByClassName('plus') as HTMLCollectionOf<HTMLFormElement>;
const minusBtn = document.getElementsByClassName('minus') as HTMLCollectionOf<HTMLFormElement>;
const spinBtn = document.getElementsByClassName('spinBtn') as HTMLCollectionOf<HTMLFormElement>;
// クリック時
function plus(){
  testClass[0].value = (testClass[0].value == '') ? 1:
  Number(testClass[0].value) + Number(plusBtn[0].value);
}
function minus(){
  testClass[0].value = (testClass[0].value == '0') ? 0:
  Number(testClass[0].value) - Number(minusBtn[0].value);
}
plusBtn[0].addEventListener('click',plus);
minusBtn[0].addEventListener('click',minus);

// 長押し時
let timer;
let delay;
function start(x:any){
  function count(){
    timer = setInterval(x, 60);
  }
  delay = setTimeout(count,600);
}
function end(){
  clearTimeout(delay);
  clearInterval(timer);
}
plusBtn[0].addEventListener('mousedown',() => start(plus))
plusBtn[0].addEventListener('mouseup',end)
plusBtn[0].addEventListener('mouseout',end)
minusBtn[0].addEventListener('mousedown',() => start(minus))
minusBtn[0].addEventListener('mouseup',end)
minusBtn[0].addEventListener('mouseout',end)




function numberInput(){
  const target = document.getElementsByClassName('number-input') as HTMLCollectionOf<HTMLElement>;
  function targets(){
    for(let i=0; i<target.length; i++){
      const input = target[i].getElementsByTagName('input');
      const name = input[0].getAttribute('name');
      function calc(){
        const inputValue = Number(input[0].value);
        const plus = document.getElementsByClassName('number-input-plus');
        const plusVal = (plus[0] as HTMLFormElement).value;
        const minus = document.getElementsByClassName('number-input-minus');
        const minusVal = (minus[0] as HTMLFormElement).value;
        //if(){
          plus[0].addEventListener('click',function(){
            i++;
            const sum = inputValue + 1;
            input[0].value = String(sum);
            console.log('プラス' + sum);
          });
          minus[0].addEventListener('click',function(){
            i++;
            const sum = inputValue - i;
            input[0].value = String(sum);
            console.log('マイナス' + sum);
          });
        //}
        console.log(plus[0]);
      }
      calc();
      console.log(name);
    }
  }
  document.addEventListener('change',targets);
  /*
  const button = document.getElementsByTagName('button');
  for(let i=0; i<button.length; i++){
    button[i].addEventListener('click', calc);
  }
  */

  console.log('Hello');
}
numberInput();