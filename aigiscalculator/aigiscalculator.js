/*
略称
Bk = Black
Pt = Plutinum
Gl = Gold
Sl = Silver
*/

// 初期設定
document.getElementById('expMaxRarity').innerText = 'ブラック';
document.getElementById('expMaxBlack').style.display = 'flex';
document.getElementById('black99').checked = true;
const expUnits = document.getElementById('expUnits');
const expUnitsForm = expUnits.getElementsByTagName('form')[0];
const expMaxRadio = document.getElementsByName('expMax');
// ラジオボタンの選択を解除
function clearRadio() {
  for(i=0; i < expMaxRadio.length; i++) {
    expMaxRadio[i].checked = false;
  }
}

// class^=rel要素のスタイル
function clearRel() {
  var query = document.querySelectorAll('[class^=rel]');
  for(i=0; i < query.length; i++) {
    query[i].style.display = 'none';
  }
}

// class^=rel要素のスタイル
clearRel();
const relBk = document.getElementsByClassName('relBk');
for(i=0; i < relBk.length; i++) {
  relBk[i].style.display = 'flex';
}
expCalculate();

// キー押下時リアルタイムexpCalculate実行
document.addEventListener('keyup', expCalculate);


// タグinputに変更があった場合、関数expCalculateを実行する
input = document.getElementsByTagName('input');
for(i = 0; i < input.length; i++) {
  input[i].addEventListener('change', expCalculate);
}

// レアリティ関連項目クラス名リスト
const relList = ['relBk', 'relPt', 'relGl', 'relSl'];

// 指定したclassが付けられた要素取得
function getClass(...x) {
  x.forEach(function(z) {
    const y = document.getElementsByClassName(z);
    for(i=0; i < y.length; i++) {
      y[i].style.display = 'flex';
    }
  })
}
//getClass('relBk', 'relPt');

// 選択したレアリティにより表示／非表示する要素
function rarityFilter(rr) {
  if(rr == rr) {

    // 選択レアリティの場合
    const selected = relList.filter(function(x) {
      return x == rr
    })
    getClass(selected);
    //console.log('一致：' + selected);

    // 選択レアリティじゃない場合
    const selectedNot = relList.filter(function(x) {
      return x != rr
    })
    getClass(selectedNot);
    //console.log('不一致：' + selectedNot);
  }
}
//rarityFilter('relBk')

// レアリティ選択時
function selectRarity() {
  const selectedRarity = document.getElementById('expMaxRarity');

  let rareBk = document.getElementById('rarityBlack');
  let rarePt = document.getElementById('rarityPlatinum');
  let rareGl = document.getElementById('rarityGold');
  let rareSl = document.getElementById('raritySilver');

  if(rareBk.checked) {
    selectedRarity.innerText = 'ブラック';
    document.formUnits.reset();
    clearRadio();
    clearRel();
    rarityFilter('relBk');
    document.getElementById('black99').checked = true;
  } else if(rarePt.checked) {
    selectedRarity.innerText = 'プラチナ';
    document.formUnits.reset();
    clearRadio();
    clearRel();
    rarityFilter('relPt');
    document.getElementById('platinum99').checked = true;
  } else if(rareGl.checked) {
    selectedRarity.innerText = 'ゴールド';
    document.formUnits.reset();
    clearRadio();
    clearRel();
    rarityFilter('relGl');
    document.getElementById('gold99').checked = true;
  } else if(rareSl.checked) {
    selectedRarity.innerText = 'シルバー';
    document.formUnits.reset();
    clearRadio();
    clearRel();
    rarityFilter('relSl');
    document.getElementById('silver55').checked = true;
  }
}


// 経験値計算
function expCalculate() {
  const max = expCalculator.expMax.value;
  const current = expCalculator.expCurrent.value - 1;
  const next = expCalculator.expNext.value;
  const expMax = expCalculator.expMax;
  const inputResult = document.getElementById('inputResult');
  const expResult = document.getElementById('expResult');

  // サリエット所持判定
  const sarriette = document.getElementById('uSarriette');
  function sarri() {
    if(sarriette.checked == true){
      return 11;
    } else if(sarriette.checked == false) {
      return 10;
    }
  }

  // 経験値ユニット
  const uBarmor = document.getElementById('uBarmor').value;
  document.getElementById('uBarmorExp').innerText = 40000*sarri()/10 + 'EXP';
  const uParmor = document.getElementById('uParmor').value;
  document.getElementById('uParmorExp').innerText = 8000*sarri()/10 + 'EXP';
  const uFarah = document.getElementById('uFarah').value;
  document.getElementById('uFarahExp').innerText = 20000*sarri()/10 + 'EXP';
  const uFreude = document.getElementById('uFreude').value;
  document.getElementById('uFreudeExp').innerText = 19000*sarri()/10 + 'EXP';
  const uAlegria = document.getElementById('uAlegria').value;
  document.getElementById('uAlegriaExp').innerText = 18000*sarri()/10 + 'EXP';
  //const uAmour = document.getElementById('uAmour').value;
  //document.getElementById('uAmourExp').innerText = 4000*sarri()/10 + 'EXP';
  const uPlease = document.getElementById('uPlease').value;
  document.getElementById('uPleaseExp').innerText = 18000*sarri()/10 + 'EXP';
  const uPrazer = document.getElementById('uPrazer').value;
  document.getElementById('uPrazerExp').innerText = 10000*sarri()/10 + 'EXP';

  // 経験値ユニット合計
  const uExp = (
    uBarmor*40000*sarri()/10 +
    uParmor*8000*sarri()/10 +
    uFarah*20000*sarri()/10 +
    uFreude*19000*sarri()/10 +
    uAlegria*18000*sarri()/10 +
    //uAmour*4000*sarri()/10 +
    uPlease*18000*sarri()/10 +
    uPrazer*10000*sarri()/10
  )



  let rareBk = document.getElementById('rarityBlack');
  let rarePt = document.getElementById('rarityPlatinum');
  let rareGl = document.getElementById('rarityGold');
  let rareSl = document.getElementById('raritySilver');

  // 必要経験値リスト
  const totalBlackExp = [
    0,
    48,
    98,
    150,
    203,
    258,
    317,
    375,
    437,
    500,//10
    627,
    759,
    897,
    1040,
    1187,
    1340,
    1497,
    1659,
    1827,
    2000,//202
    2255,
    2519,
    2793,
    3078,
    3374,
    3478,
    3993,
    4319,
    4655,
    5000,//30
    5424,
    5865,
    6323,
    6797,
    7289,
    7797,
    8322,
    8865,
    9423,
    10001,//40
    10848,
    11729,
    12644,
    13593,
    14577,
    15593,
    16644,
    17729,
    18848,
    20000,//50
    21272,
    22593,
    23966,
    25391,
    26865,
    28391,
    29966,
    31593,
    33272,
    35000,//60
    36695,
    38457,
    40289,
    42186,
    44153,
    46187,
    48288,
    50457,
    52695,
    55001,//70
    57119,
    59322,
    61610,
    63983,
    66441,
    68984,
    71610,
    74322,
    77118,
    80000,//80
    82967,
    86051,
    89255,
    92577,
    96017,
    99576,
    103254,
    107051,
    110966,
    115001,//90
    117966,
    121052,
    124254,
    127577,
    131018,
    134577,
    138254,
    142052,
    145967//99
  ];
  const totalPlatinumExp = [
    0,
    45,
    91,
    140,
    189,
    241,
    295,
    350,
    407,
    466,//10
    585,
    708,
    837,
    970,
    1107,
    1250,
    1397,
    1548,
    1705,
    1866,//20
    2104,
    2351,
    2607,
    2873,
    3149,
    3433,
    3727,
    4031,
    4344,
    4666,//30
    5062,
    5474,
    5901,
    6343,
    6803,
    7277,
    7767,
    8274,
    8795,
    9334,//40
    10125,
    10947,
    11801,
    12687,
    13605,
    14553,
    15534,
    16547,
    17591,
    18666,//50
    19853,
    21087,
    22368,
    23698,
    25074,
    26498,
    27968,
    29487,
    31053,
    32666,//60
    34248,
    35893,
    37603,
    39374,
    41209,
    43107,
    45069,
    47093,
    49182,
    51334,//70
    53311,
    55367,
    57502,
    59717,
    62012,
    64385,
    66836,
    69367,
    71977,
    74666,//80
    77435,
    80314,
    83304,
    86405,
    89615,
    92938,
    96370,
    99914,
    103568,
    107334,//90
    110102,
    112981,
    115970,
    119071,
    122283,
    125605,
    129037,
    132581,
    136235//99
  ];
  const totalGoldExp = [
    0,
    42,
    85,
    130,
    176,
    224,
    274,
    325,
    378,
    433,//10
    543,
    658,
    777,
    901,
    1028,
    1161,
    1297,
    1438,
    1583,
    1733,//20
    1954,
    2183,
    2421,
    2668,
    2924,
    3188,
    3461,
    3743,
    4034,
    4333,//30
    4701,
    5083,
    5480,
    5890,
    6317,
    6757,
    7212,
    7683,
    8167,
    8667,//40
    9402,
    10165,
    10958,
    11781,
    12633,
    13514,
    14425,
    15365,
    16335,
    17333,//50
    18435,
    19581,
    20770,
    22005,
    23283,
    24605,
    25970,
    27381,
    28835,
    30333,//60
    31802,
    33329,
    34917,
    36561,
    38266,
    40028,
    41850,
    43729,
    45669,
    47667,//70
    49503,
    51412,
    53395,
    55452,
    57582,
    59786,
    62062,
    64412,
    66836,
    69333,//80
    71904,
    74577,
    77354,
    80233,
    83214,
    86299,
    89487,
    92777,
    96170,
    99667,//90
    102237,
    104911,
    107687,
    110566,
    113549,
    116633,
    119820,
    123111,
    126504//99
  ];
  const totalSilverExp = [
    0,
    38,
    78,
    120,
    162,
    206,
    253,
    300,
    349,
    400,//10
    502,
    607,
    718,
    832,
    949,
    1072,
    1198,
    1327,
    1462,
    1600,//20
    1804,
    2015,
    2234,
    2462,
    2699,
    2942,
    3194,
    3455,
    3724,
    4000,//30
    4339,
    4692,
    5058,
    5437,
    5831,
    6238,
    6658,
    7092,
    7538,
    8000,//40
    8678,
    9383,
    10115,
    10874,
    11662,
    12474,
    13315,
    14183,
    15078,
    16000,//50
    17017,
    18074,
    19172,
    20312,
    21492//55
  ];

  const maxBlackLevel = [50, 80, 99];
  const maxBlackExp = [20000, 80000, 145967];
  const maxPlatinumLevel = [50, 70, 90, 99];
  const maxPlatinumExp = [18666, 51334, 107334, 136235];
  const maxGoldLevel = [50, 60, 80, 99];
  const maxGoldExp = [17333, 30333, 69333, 126504];
  const maxSilverLevel = [50,55];
  const maxSilverExp = [16000, 21492];

  // ラジオボタンのvalueは文字列として処理されているのでNumber型に直す。
  const selectedMax = Number(max);

  function reqExp(maxLevel, maxExp, totalExp) {
    // indexOfで検索されるデータは、デフォルトだとString型として扱われているようなのでNumber型指定をする。型指定が適切でないと「-1」を返す。
    const x = maxLevel.indexOf(Number(max));
    requiredExp = (maxExp[x] - (totalExp[current]) - (next));
  }
  function result() {
    if(!(requiredExp)) {
      expResult.innerHTML = '必要経験値：' + '<span>入力に誤りがあります</span>';
    } else {
      expResult.innerHTML = '必要経験値：' + '<span>' + (requiredExp - uExp) + '</span>';
    }
  }

  if(rareBk.checked) {
    reqExp(maxBlackLevel, maxBlackExp, totalBlackExp);
    result();
  } else if(rarePt.checked) {
    reqExp(maxPlatinumLevel, maxPlatinumExp, totalPlatinumExp);
    result();
  } else if(rareGl.checked) {
    reqExp(maxGoldLevel, maxGoldExp, totalGoldExp);
    result();
  } else if(rareSl.checked) {
    reqExp(maxSilverLevel, maxSilverExp, totalSilverExp);
    result();
  }
}

// フォームリセット
function reset() {
  document.expCalculator.reset();
  document.formUnits.reset();
  clearRadio();
  clearRel();
  rarityFilter('relBk');
  document.getElementById('black99').checked = true;
  expCalculate();
}
