/// <reference path='explist.ts'/>

const formBase = <HTMLFormElement> document.getElementById('formBase');
const formExpItems = <HTMLFormElement> document.getElementById('formExpItems');

const r4 = <HTMLFormElement> document.getElementById('rarity4');
const r3 = <HTMLFormElement> document.getElementById('rarity3');
const r2 = <HTMLFormElement> document.getElementById('rarity2');
const relR4 = document.getElementsByClassName('relR4');
const relR3 = document.getElementsByClassName('relR3');
const relR2 = document.getElementsByClassName('relR2');
const rarityList = ['r4','r3','r2'];
const relRarityList = ['relR4','relR3','relR2']

const pLv = <HTMLFormElement> document.getElementById('paramLv');
const pHp = <HTMLFormElement> document.getElementById('paramHp');
const pPa = <HTMLFormElement> document.getElementById('paramPa');
const pPd = <HTMLFormElement> document.getElementById('paramPd');
const pMa = <HTMLFormElement> document.getElementById('paramMa');
const pMd = <HTMLFormElement> document.getElementById('paramMd');
const relLv = document.getElementsByClassName('relLv');
const relHp = document.getElementsByClassName('relHp');
const relPa = document.getElementsByClassName('relPa');
const relPd = document.getElementsByClassName('relPd');
const relMa = document.getElementsByClassName('relMa');
const relMd = document.getElementsByClassName('relMd');
const relNotLv = document.getElementsByClassName('relNotLv');
//const paramList = ['Lv','Hp','Pa','Pd','Ma','Md'];
const relParamList = ['relLv','relHp','relPa','relPd','relMa','relMd']

// イベントリスナー
const rarityRadio = document.getElementsByName('rarity');
for(let i=0; i<rarityRadio.length; i++){
  rarityRadio[i].addEventListener('change',selectRarity)
}
const paramRadio = document.getElementsByName('param');
for(let i=0; i<paramRadio.length; i++){
  paramRadio[i].addEventListener('change',selectParam)
}
const doCalc = document.getElementsByClassName('calc');
for(let i=0; i<doCalc.length; i++){
  doCalc[i].addEventListener('change',calc)
}
const doReset = document.getElementsByClassName('btnReset');
for(let i=0; i<doReset.length; i++){
  doReset[i].addEventListener('click',reset)
}
const doPlus = document.getElementsByClassName('spin-plus');
for(let i=0; i<doPlus.length; i++){
  doPlus[i].addEventListener('click',calc)
  doPlus[i].addEventListener('touchend',calc)
}
const doMinus = document.getElementsByClassName('spin-minus');
for(let i=0; i<doMinus.length; i++){
  doMinus[i].addEventListener('click',calc)
  doMinus[i].addEventListener('touchend',calc)
}


// 初期状態
new Promise(function(resolve){
  resolve();
}).then(function(){
  clearRel();
}).then(function(){
  r4.checked = true;
  pLv.checked = true;
}).then(function(){
  selectRarity();
  selectParam();
}).then(function(){
  calc();
})


// リセット
function reset(){
  new Promise(function(resolve){
    resolve(
      console.log('RESET')
    );
  }).then(function(){
    formBase.reset();
    formExpItems.reset();
  }).then(function(){
    r4.checked = true;
    pLv.checked = true;
  }).then(function(){
    selectRarity();
    selectParam();
  })
}


// キー押下時リアルタイムcalc()実行
document.addEventListener('keyup', calc);


// タグinputに変更があった場合、calc()を実行する
const input = document.getElementsByTagName('input');
for(let i = 0; i < input.length; i++) {
  input[i].addEventListener('change', calc);
}


// class^=rel要素のスタイル
function clearRel() {
  let query = document.querySelectorAll('[class^=rel]');
  for(let i=0; i < query.length; i++) {
    (query[i] as HTMLElement).style.display = 'none';
  }
}


// 指定したclass名が付与された要素のスタイルを操作
// x クラス名
// y CSSプロパティ名
// z CSSプロパティ値
function setClassStyle(x:string, y:string, z:string){
  const targetClass = document.getElementsByClassName(x) as HTMLCollectionOf<HTMLElement>;
  function fn(){
    for(let i = 0; i < targetClass.length; i++){
      targetClass[i].style.setProperty(y, z);
    }
  }
  return fn();
}


// レアリティフィルタ
function rarityFilter(x:string){
  if (x){
    // 引数と一致した配列の値を返す
    const match = relRarityList.filter(
      function(y){
        return y == x;
      }
    )
    // matchで返されたclass名にスタイル付与
    setClassStyle(match[0], 'display', 'block')
    // 引数と不一致の配列の値を返す
    const matchNot = relRarityList.filter(
      function(y){
        return y != x;
      }
    )
    // matchNotで返されたclass名それぞれにスタイル付与
    for(let i= 0; i < matchNot.length; i++){
      setClassStyle(matchNot[i], 'display', 'none')
    }
  }
}


// レアリティ選択時
function selectRarity(){
  const expMaxR = document.getElementById('expMaxR');
  function selectedRarityFn(x:string,y:string){
    new Promise(function(resolve){
      resolve();
    }).then(function(){
      expMaxR.innerText = '(' + x + ')';
      clearRel();
      rarityFilter('rel' + y);
      calc();
    });
  }
  // レアリティ選択分岐
  if(r4.checked){
    selectedRarityFn('★4','R4');
  } else if(r3.checked){
    selectedRarityFn('★3','R3');
  } else if(r2.checked){
    selectedRarityFn('★2','R2');
  }
}


// パラメータフィルタ
function paramFilter(x:string){
  if (x){
    // 引数と一致した配列の値を返す
    const match = relParamList.filter(
      function(y){
        return y == x;
      }
    )
    // matchで返されたclass名にスタイル付与
    setClassStyle(match[0], 'display', 'flex')
    // 引数と不一致の配列の値を返す
    const matchNot = relParamList.filter(
      function(y){
        return y != x;
      }
    )
    // matchNotで返されたclass名それぞれにスタイル付与
    for(let i= 0; i < matchNot.length; i++){
      setClassStyle(matchNot[i], 'display', 'none')
    }
  }
}


// パラメータ選択時
function selectParam(){
  if(pLv.checked && r4.checked){
    clearRel();
    paramFilter('relLv');
    setClassStyle('relR4', 'display', 'block');
    setClassStyle('relR3', 'display', 'none');
    setClassStyle('relR2', 'display', 'none');
    setClassStyle('relNotLv', 'display', 'none');
    calc();
  } else if(pLv.checked && r3.checked){
    clearRel();
    paramFilter('relLv');
    setClassStyle('relR4', 'display', 'none');
    setClassStyle('relR3', 'display', 'block');
    setClassStyle('relR2', 'display', 'none');
    calc();
  } else if(pLv.checked && r2.checked){
    clearRel();
    paramFilter('relLv');
    setClassStyle('relR4', 'display', 'none');
    setClassStyle('relR3', 'display', 'none');
    setClassStyle('relR2', 'display', 'block');
    calc();
  } else if(pHp.checked){
    clearRel();
    paramFilter('relHp');
    calc();
  } else if(pPa.checked){
    clearRel();
    paramFilter('relPa');
    calc();
  } else if(pPd.checked){
    clearRel();
    paramFilter('relPd');
    calc();
  } else if(pMa.checked){
    clearRel();
    paramFilter('relMa');
    calc();
  } else if(pMd.checked){
    clearRel();
    paramFilter('relMd');
    calc();
  }
}


// Lv最大値セレクトの値を取得
  function getSelect(rarity:string){
    const maxValLv = (<HTMLFormElement>document.getElementById('maxValLv' + rarity ));
    const maxValLvOptions = maxValLv.options;
    const maxValLvSelected = maxValLv.selectedIndex;
    const result = maxValLvOptions[maxValLvSelected].value - 1;
    //console.log(result);
    return result;
  }


// 計算
function calc(){
  const itemLv = document.getElementsByName('itemLv');
  const itemHp = document.getElementsByName('itemHp');
  const itemPa = document.getElementsByName('itemPa');
  const itemPd = document.getElementsByName('itemPd');
  const itemMa = document.getElementsByName('itemMa');
  const itemMd = document.getElementsByName('itemMd');
  const itemLvTotal = ((itemLv[0] as HTMLFormElement).value * 300)
    + ((itemLv[1] as HTMLFormElement).value * 3000)
    + ((itemLv[2] as HTMLFormElement).value * 15000);
  const itemHpTotal = ((itemHp[0] as HTMLFormElement).value * 100)
    + ((itemHp[1] as HTMLFormElement).value * 1000)
    + ((itemHp[2] as HTMLFormElement).value * 5000);
  const itemPaTotal = ((itemPa[0] as HTMLFormElement).value * 5)
  + ((itemPa[1] as HTMLFormElement).value * 50)
  + ((itemPa[2] as HTMLFormElement).value * 250);
  const itemPdTotal = ((itemPd[0] as HTMLFormElement).value * 5)
  + ((itemPd[1] as HTMLFormElement).value * 50)
  + ((itemPd[2] as HTMLFormElement).value * 250)
  + ((itemPd[3] as HTMLFormElement).value * 1250);
  const itemMaTotal = ((itemMa[0] as HTMLFormElement).value * 5)
  + ((itemMa[1] as HTMLFormElement).value * 50)
  + ((itemMa[2] as HTMLFormElement).value * 250);
  const itemMdTotal = ((itemMd[0] as HTMLFormElement).value * 5)
  + ((itemMd[1] as HTMLFormElement).value * 50)
  + ((itemMd[2] as HTMLFormElement).value * 250)
  + ((itemMd[3] as HTMLFormElement).value * 1250);

  // 選択されたパラメータによって計算
  // 引数 x は表示上のパラメータ名[Lv,HP,物攻,物防,魔攻,魔防]
  // 引数 y は数式上のパラメータ名[R4,R3,R2,Hp,Pa,Pd,Ma,Md]
  function expResultParam(x:string,y:string){
    // パラメータ名表示
    const expResultParam = document.getElementById('expResultParam');
    expResultParam.innerText = '(' + x + ')';
    // フォーム入力値取得
    const currentLv:number = (<HTMLFormElement>document.getElementById('currentValLv')).value - 1;
    const currentHp:number = (<HTMLFormElement>document.getElementById('currentValHp')).value;
    const currentPa:number = (<HTMLFormElement>document.getElementById('currentValPa')).value;
    const currentPd:number = (<HTMLFormElement>document.getElementById('currentValPd')).value;
    const currentMa:number = (<HTMLFormElement>document.getElementById('currentValMa')).value;
    const currentMd:number = (<HTMLFormElement>document.getElementById('currentValMd')).value;
    const maxLvR4:number = (<HTMLFormElement>document.getElementById('maxValLvR4')).value - 1;
    const maxLvR3:number = (<HTMLFormElement>document.getElementById('maxValLvR3')).value - 1;
    const maxLvR2:number = (<HTMLFormElement>document.getElementById('maxValLvR2')).value - 1;
    const maxHp:number = (<HTMLFormElement>document.getElementById('maxValHp')).value;
    const maxPa:number = (<HTMLFormElement>document.getElementById('maxValPa')).value;
    const maxPd:number = (<HTMLFormElement>document.getElementById('maxValPd')).value;
    const maxMa:number = (<HTMLFormElement>document.getElementById('maxValMa')).value;
    const maxMd:number = (<HTMLFormElement>document.getElementById('maxValMd')).value;
    const next:number = (<HTMLFormElement>document.getElementById('nextVal')).value;
    // 各パラメータのx番目までの合計経験値
    // x パラメータ名
    // y 最大値
    function expTotal(x:string,y:number){
      interface paramInterface{
        r4: any;
        r3: any;
        r2: any;
        hp: any;
        atk: any;
        def: any;
        [key: string]: any;
      };
      const param = {
        r4: r4NextList,
        r3: r3NextList,
        r2: r2NextList,
        hp: hpNextList,
        atk: atkNextList,
        def: defNextList
      } as paramInterface;
      let sum = 0;
      for(let i=0; i<y; i++){
        sum += param[x][i];
      }
      return sum;
    }
    // 合計値の条件分岐
    function total(){
      /*
      if (z >= 0){return z;}
      else if(z < 0){return '<small>' + z + '</small>';}
      else{console.log('無効な数値です');}
      */
      if(y == 'R4'){
        const z = expTotal('r4',maxLvR4) - expTotal('r4',currentLv) - (r4NextList[currentLv] - next) - itemLvTotal;
        if (z >= 0){return z;}
        else if(z < 0){return '<small>' + z + '</small>';}
        else{console.log('無効な数値です');}
      } else if(y == 'R3'){
        const z = expTotal('r3',maxLvR3) - expTotal('r3',currentLv) - (r3NextList[currentLv] - next) - itemLvTotal;
        if (z >= 0){return z;}
        else if(z < 0){return '<small>' + z + '</small>';}
        else{console.log('無効な数値です');}
      } else if(y == 'R2'){
        const z = expTotal('r2',maxLvR2) - expTotal('r2',currentLv) - (r2NextList[currentLv] - next) - itemLvTotal;
        if (z >= 0){return z;}
        else if(z < 0){return '<small>' + z + '</small>';}
        else{console.log('無効な数値です');}
      } else if(y == 'Hp'){
        const z = expTotal('hp',maxHp/10) - expTotal('hp',currentHp/10) - (hpNextList[currentHp/10] - next) - itemHpTotal;
        if (z >= 0){return z;}
        else if(z < 0){return '<small>' + z + '</small>';}
        else{console.log('無効な数値です');}
      } else if(y == 'Pa'){
        const z = expTotal('atk',maxPa) - expTotal('atk',currentPa) - (atkNextList[currentPa] - next) - itemPaTotal;
        if (z >= 0){return z;}
        else if(z < 0){return '<small>' + z + '</small>';}
        else{console.log('無効な数値です');}
      } else if(y == 'Pd'){
        const z = expTotal('def',maxPd) - expTotal('def',currentPd) - (defNextList[currentPd] - next) - itemPdTotal;
        if (z >= 0){return z;}
        else if(z < 0){return '<small>' + z + '</small>';}
        else{console.log('無効な数値です');}
      } else if(y == 'Ma'){
        const z = expTotal('atk',maxMa) - expTotal('atk',currentMa) - (atkNextList[currentMa] - next) - itemMaTotal;
        if (z >= 0){return z;}
        else if(z < 0){return '<small>' + z + '</small>';}
        else{console.log('無効な数値です');}
      } else if(y == 'Md'){
        const z = expTotal('def',maxMd) - expTotal('def',currentMd) - (defNextList[currentMd]- next) - itemMdTotal;
        if (z >= 0){return z;}
        else if(z < 0){return '<small>' + z + '</small>';}
        else{console.log('無効な数値です');}
      }
    }
    // 計算結果の表示
    const resultExp = <HTMLFormElement>document.getElementById('resultExp');
    resultExp.innerHTML = (String(total()));
  }

  // パラメータ選択時の条件分岐
  (pLv.checked && r4.checked) ? expResultParam('Lv','R4'):
  (pLv.checked && r3.checked) ? expResultParam('Lv','R3'):
  (pLv.checked && r2.checked) ? expResultParam('Lv','R2'):
  (pHp.checked) ? expResultParam('HP','Hp'):
  (pPa.checked) ? expResultParam('物攻','Pa'):
  (pPd.checked) ? expResultParam('物防','Pd'):
  (pMa.checked) ? expResultParam('魔攻','Ma'):
  (pMd.checked) ? expResultParam('魔防','Md'):
  console.log('無効なパラメータ');
}

// 経験値アイテム選択時の処理
function selectItem(){
  const grade1 = 300;
  const grade2 = 3000;
  const grade3 = 15000;
  const grade4 = 300;
}

// 確認最大値
const hpMax = document.getElementsByClassName('hpMax') as HTMLCollectionOf<HTMLElement>;
for(let i=0; i<hpMax.length; i++){
  //hpMax[i].innerText = String((hpNextList.length - 1) * 10);
  hpMax[i].innerText = '14950';
}
const atkMax = document.getElementsByClassName('atkMax') as HTMLCollectionOf<HTMLElement>;
for(let i=0; i<atkMax.length; i++){
  //atkMax[i].innerText = String(atkNextList.length - 1);
  atkMax[i].innerText = '190';
}
const defMax = document.getElementsByClassName('defMax') as HTMLCollectionOf<HTMLElement>;
for(let i=0; i<atkMax.length; i++){
  //defMax[i].innerText = String(defNextList.length - 1);
  defMax[i].innerText = '162';
}

