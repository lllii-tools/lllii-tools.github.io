/// <reference path='explist.ts'/>

/*
略称
Bk = Black
Pt = Platinum
Gl = Gold
Sl = Silver
*/


const expCalculator = <HTMLFormElement> document.getElementById('expCalculator')
const formUnits = <HTMLFormElement> document.getElementById('formUnits')
const idBlack99 = <HTMLInputElement> document.getElementById('black99');


// 初期設定
document.getElementById('expMaxRarity').innerText = 'ブラック';
document.getElementById('expMaxBlack').style.display = 'flex';
idBlack99.checked = true;
const expUnits = document.getElementById('expUnits');
const expUnitsForm = expUnits.getElementsByTagName('form')[0];
const expMaxRadio = document.getElementsByName('expMax');
// ラジオボタンの選択を解除
function clearRadio() {
  for(let i=0; i < expMaxRadio.length; i++) {
    (expMaxRadio[i] as HTMLInputElement).checked = false;
  }
}

// class^=rel要素のスタイル
function clearRel() {
  let query = document.querySelectorAll('[class^=rel]');
  for(let i=0; i < query.length; i++) {
    (query[i] as HTMLElement).style.display = 'none';
  }
}

// class^=rel要素の表示初期化
clearRel();
const relBk = document.getElementsByClassName('relBk');
for(let i=0; i < relBk.length; i++) {
  (relBk[i] as HTMLElement).style.display = 'flex';
}
expCalculate();

// キー押下時リアルタイムexpCalculate()実行
document.addEventListener('keyup', expCalculate);

// タグinputに変更があった場合、関数expCalculateを実行する
const input = document.getElementsByTagName('input');
for(let i = 0; i < input.length; i++) {
  input[i].addEventListener('change', expCalculate);
}

// レアリティ関連項目クラス名リスト
const relList = ['relBk', 'relPt', 'relGl', 'relSl'];

// 指定したclassが付けられた要素取得
function getClass(...x) {
  x.forEach(function(z) {
    const y = document.getElementsByClassName(z);
    for(let i=0; i < y.length; i++) {
      (y[i] as HTMLElement).style.display = 'flex';
    }
  })
}

// 選択したレアリティにより表示／非表示する要素
function rarityFilter(rr) {
  if(rr == rr) {

    // 選択レアリティの場合
    const selected = relList.filter(function(x) {
      return x == rr
    })
    getClass(selected);

    // 選択レアリティじゃない場合
    const selectedNot = relList.filter(function(x) {
      return x != rr
    })
    getClass(selectedNot);
  }
}


// レアリティ選択時
function selectRarity() {
  const selectedRarity = document.getElementById('expMaxRarity');

  let rareBk = <HTMLInputElement> document.getElementById('rarityBlack');
  let rarePt = <HTMLInputElement> document.getElementById('rarityPlatinum');
  let rareGl = <HTMLInputElement> document.getElementById('rarityGold');
  let rareSl = <HTMLInputElement> document.getElementById('raritySilver');

  // サリエットチェックの有無
  const sarriette = <HTMLInputElement> document.getElementById('uSarriette');
  function sarriChecked() {
    if(sarriette.checked == true) {
      formUnits.reset();
      sarriette.checked = true
    } else if(sarriette.checked == false) {
      formUnits.reset();
      sarriette.checked = false
    }
  }

  if(rareBk.checked) {
    selectedRarity.innerText = 'ブラック';
    sarriChecked();
    clearRadio();
    clearRel();
    rarityFilter('relBk');
    (document.getElementById('black99') as HTMLInputElement).checked = true;
  } else if(rarePt.checked) {
    selectedRarity.innerText = 'プラチナ';
    sarriChecked();
    clearRadio();
    clearRel();
    rarityFilter('relPt');
    (document.getElementById('platinum99') as HTMLInputElement).checked = true;
  } else if(rareGl.checked) {
    selectedRarity.innerText = 'ゴールド';
    sarriChecked();
    clearRadio();
    clearRel();
    rarityFilter('relGl');
    (document.getElementById('gold99') as HTMLInputElement).checked = true;
  } else if(rareSl.checked) {
    selectedRarity.innerText = 'シルバー';
    sarriChecked();
    clearRadio();
    clearRel();
    rarityFilter('relSl');
    (document.getElementById('silver55') as HTMLInputElement).checked = true;
  }
}


// 経験値計算
function expCalculate() {
  const max: number = expCalculator.expMax.value;
  const current: number = expCalculator.expCurrent.value - 1;
  const next: number = expCalculator.expNext.value;
  const expMax: number = expCalculator.expMax;
  const inputResult = document.getElementById('inputResult');
  const expResult = document.getElementById('expResult');

  // サリエット所持判定
  const sarriette =  <HTMLInputElement> document.getElementById('uSarriette');
  function sarri() {
    if(sarriette.checked == true){
      return 11;
    } else if(sarriette.checked == false) {
      return 10;
    }
  }

  // 経験値ユニット
  const uBarmor: any = <HTMLInputElement> document.getElementById('uBarmor');
  document.getElementById('uBarmorExp').innerText = 40000*sarri()/10 + 'EXP';
  const uParmor: any = <HTMLInputElement> document.getElementById('uParmor');
  document.getElementById('uParmorExp').innerText = 5000*sarri()/10 + 'EXP';
  const uFarah: any = <HTMLInputElement> document.getElementById('uFarah');
  document.getElementById('uFarahExp').innerText = 20000*sarri()/10 + 'EXP';
  const uFreude: any = <HTMLInputElement> document.getElementById('uFreude');
  document.getElementById('uFreudeExp').innerText = 19000*sarri()/10 + 'EXP';
  const uAlegria: any = <HTMLInputElement> document.getElementById('uAlegria');
  document.getElementById('uAlegriaExp').innerText = 18000*sarri()/10 + 'EXP';
  //const uAmour: any = <HTMLInputElement> document.getElementById('uAmour');
  //document.getElementById('uAmourExp').innerText = 4000*sarri()/10 + 'EXP';
  const uPlease: any = <HTMLInputElement> document.getElementById('uPlease');
  document.getElementById('uPleaseExp').innerText = 18000*sarri()/10 + 'EXP';
  const uPrazer: any = <HTMLInputElement> document.getElementById('uPrazer');
  document.getElementById('uPrazerExp').innerText = 10000*sarri()/10 + 'EXP';

  // 経験値ユニット合計
  const uExp = (
    uBarmor.value*40000*sarri()/10 +
    uParmor.value*5000*sarri()/10 +
    uFarah.value*20000*sarri()/10 +
    uFreude.value*19000*sarri()/10 +
    uAlegria.value*18000*sarri()/10 +
    //uAmour.value*4000*sarri()/10 +
    uPlease.value*18000*sarri()/10 +
    uPrazer.value*10000*sarri()/10
  )

  let rareBk = <HTMLInputElement> document.getElementById('rarityBlack');
  let rarePt = <HTMLInputElement> document.getElementById('rarityPlatinum');
  let rareGl = <HTMLInputElement> document.getElementById('rarityGold');
  let rareSl = <HTMLInputElement> document.getElementById('raritySilver');


  const maxBlackLevel = [50, 80, 99];
  const maxBlackExp = [20000, 80000, 145967];
  const maxPlatinumLevel = [50, 70, 90, 99];
  const maxPlatinumExp = [18666, 51334, 107334, 136235];
  const maxGoldLevel = [50, 60, 80, 99];
  const maxGoldExp = [17333, 30333, 69333, 126504];
  const maxSilverLevel = [50,55];
  const maxSilverExp = [16000, 21492];

  // ラジオボタンのvalueはデフォルトだとString型として扱われているようなのでNumber型指定をする。
  const selectedMax = Number(max);

  function reqExp(maxLevel, maxExp, totalExp, nextExp) {
    // indexOfで検索されるデータはデフォルトだとString型として扱われているようなのでNumber型指定をする。型指定が適切でないと「-1」を返す。
    const x = maxLevel.indexOf(Number(max));
    let requiredExp: number = (maxExp[x] - (totalExp[current]) - (nextExp[current] - next));
    if(!(requiredExp)) {
      expResult.innerHTML = '必要経験値　' + '<span>無効な数値が入力されています</span>';
    } else {
      expResult.innerHTML = '必要経験値　' + '<span>' + (requiredExp - uExp) + '</span>';
    }
  }

  if(rareBk.checked) {
    reqExp(maxBlackLevel, maxBlackExp, totalBlackExp, nextBlackExp);
  } else if(rarePt.checked) {
    reqExp(maxPlatinumLevel, maxPlatinumExp, totalPlatinumExp, nextPlatinumExp);
  } else if(rareGl.checked) {
    reqExp(maxGoldLevel, maxGoldExp, totalGoldExp, nextGoldExp);
  } else if(rareSl.checked) {
    reqExp(maxSilverLevel, maxSilverExp, totalSilverExp, nextSilverExp);
  }
}

// フォームリセット
function reset() {
  expCalculator.reset();
  formUnits.reset();
  clearRadio();
  clearRel();
  rarityFilter('relBk');
  idBlack99.checked = true;
  document.getElementById('expMaxRarity').innerText = 'ブラック';
  expCalculate();
}