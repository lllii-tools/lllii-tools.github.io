/// <reference path='explist.ts'/>

const formBase = <HTMLFormElement> document.getElementById('formBase');
const formExpItems = <HTMLFormElement> document.getElementById('formExpItems');

const r4 = <HTMLFormElement> document.getElementById('rarity4');
const r3 = <HTMLFormElement> document.getElementById('rarity3');
const r2 = <HTMLFormElement> document.getElementById('rarity2');
const relR4 = document.getElementsByClassName('relR4');
const relR3 = document.getElementsByClassName('relR3');
const relR2 = document.getElementsByClassName('relR2');
const rarityList = ['r4', 'r3', 'r2'];
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
    setClassStyle(match[0], 'display', 'block')
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
    setClassStyle('relNotLv', 'display', 'none');
    calc();
  } else if(pLv.checked && r2.checked){
    clearRel();
    paramFilter('relLv');
    setClassStyle('relR4', 'display', 'none');
    setClassStyle('relR3', 'display', 'none');
    setClassStyle('relR2', 'display', 'block');
    setClassStyle('relNotLv', 'display', 'none');
    calc();
  } else if(pHp.checked){
    clearRel();
    paramFilter('relHp');
    setClassStyle('relNotLv', 'display', 'none');
    calc();
  } else if(pPa.checked){
    clearRel();
    paramFilter('relPa');
    setClassStyle('relNotLv', 'display', 'block');
    calc();
  } else if(pPd.checked){
    clearRel();
    paramFilter('relPd');
    setClassStyle('relNotLv', 'display', 'block');
    calc();
  } else if(pMa.checked){
    clearRel();
    paramFilter('relMa');
    setClassStyle('relNotLv', 'display', 'block');
    calc();
  } else if(pMd.checked){
    clearRel();
    paramFilter('relMd');
    setClassStyle('relNotLv', 'display', 'block');
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
    const currentParam:number = (<HTMLFormElement>document.getElementById('currentValParam')).value;
    const maxHp:number = (<HTMLFormElement>document.getElementById('maxValHp')).value;
    const max:number = (<HTMLFormElement>document.getElementById('maxVal')).value;
    const next:number = (<HTMLFormElement>document.getElementById('nextVal')).value;
    // 各パラメータのx番目までの合計経験値
    function hpTotal(x:number){
      let sum = 0;
      for(let i=0; i<x; i++){
        sum += hpNextList[i];
      }
      return sum;
    }
    // 合計値の条件分岐
    function total(){
      if(y == 'R4'){
        const total = r4TotalList[getSelect(y)] - r4TotalList[currentLv] + r4NextList[currentLv] - next - itemLvTotal;
        if (total >= 0){
          return total;
        } else if(total < 0){
          return '<small>' + total + '</small>';
        }
      } else if(y == 'R3'){
        const total = r3TotalList[getSelect(y)] - r3TotalList[currentLv] + r3NextList[currentLv] - next - itemLvTotal;
        if (total >= 0){
          return total;
        } else if(total < 0){
          return '<small>' + total + '</small>';
        }
      } else if(y == 'R2'){
        const total = r2TotalList[getSelect(y)] - r2TotalList[currentLv] + r2NextList[currentLv] - next - itemLvTotal;
        if (total >= 0){
          return total;
        } else if(total < 0){
          return '<small>' + total + '</small>';
        }
      } else if(y == 'Hp'){
        const total = hpTotal(maxHp/10) - hpTotal(currentHp/10) + hpNextList[maxHp/10] - next - itemHpTotal;
        console.log(hpNextList[maxHp/10]);
        if (total >= 0){
          return total;
        } else if(total < 0){
          return '<small>' + total + '</small>';
        }
      } else if(y == 'Pa' || y == 'Pd' || y == 'Ma' || y == 'Md'){
        const total = paramTotalList[max] - paramTotalList[currentParam] - next;
        if (total >= 0){
          return total;
        } else if(total < 0){
          return '<small>' + total + '</small>';
        }
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




