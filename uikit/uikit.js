//
// フォーカス時全選択
//
const selectAll = document.getElementsByClassName('selectAll');
for (let i = 0; i < selectAll.length; i++) {
    selectAll[i].addEventListener('focus', () => selectAll[i].select());
}
//
// スピンボタン
//
const spinInput = document.getElementsByClassName('spin-input');
for (let i = 0; i < spinInput.length; i++) {
    const spinInputId = spinInput[i].getAttribute('id');
    const spinInputIdEle = document.getElementById(spinInputId);
    const spinPlus = document.getElementsByClassName('spin-plus');
    const spinPlusId = spinInputId + 'Plus';
    spinPlus[i].setAttribute('id', spinPlusId);
    const plusBtn = document.getElementById(spinPlusId);
    const plusBtnVal = plusBtn.getAttribute('value');
    const spinMinus = document.getElementsByClassName('spin-minus');
    const spinMinusId = spinInputId + 'Minus';
    spinMinus[i].setAttribute('id', spinMinusId);
    const minusBtn = document.getElementById(spinMinusId);
    const minusBtnVal = minusBtn.getAttribute('value');
    function plus() {
        spinInputIdEle.value = (spinInputIdEle.value == '') ? 1 :
            Number(spinInputIdEle.value) + Number(plusBtnVal);
    }
    function minus() {
        spinInputIdEle.value = (spinInputIdEle.value == 0) ? 0 :
            Number(spinInputIdEle.value) - Number(minusBtnVal);
    }
    let timer;
    let delay;
    function start(x) {
        function count() {
            timer = setInterval(x, 60);
        }
        delay = setTimeout(count, 600);
    }
    function end() {
        clearTimeout(delay);
        clearInterval(timer);
    }
    // クリック
    plusBtn.addEventListener('click', plus);
    plusBtn.addEventListener('mousedown', () => start(plus));
    plusBtn.addEventListener('mouseup', end);
    plusBtn.addEventListener('mouseout', end);
    minusBtn.addEventListener('click', minus);
    minusBtn.addEventListener('mousedown', () => start(minus));
    minusBtn.addEventListener('mouseup', end);
    minusBtn.addEventListener('mouseout', end);
    // タップ
    plusBtn.addEventListener('touchstart', () => start(plus));
    plusBtn.addEventListener('touchend', end);
    minusBtn.addEventListener('touchstart', () => start(minus));
    minusBtn.addEventListener('touchend', end);
}
