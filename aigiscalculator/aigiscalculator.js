// <reference path='explist.ts'/>
/*
略称
Bk = Black
Pt = Platinum
Gl = Gold
Sl = Silver
*/
var expCalculator = document.getElementById('expCalculator');
var formUnits = document.getElementById('formUnits');
var idBlack99 = document.getElementById('black99');
// 初期設定
document.getElementById('expMaxRarity').innerText = 'ブラック';
document.getElementById('expMaxBlack').style.display = 'flex';
idBlack99.checked = true;
var expUnits = document.getElementById('expUnits');
var expUnitsForm = expUnits.getElementsByTagName('form')[0];
var expMaxRadio = document.getElementsByName('expMax');
// ラジオボタンの選択を解除
function clearRadio() {
    for (var i = 0; i < expMaxRadio.length; i++) {
        expMaxRadio[i].checked = false;
    }
}
// class^=rel要素のスタイル
function clearRel() {
    var query = document.querySelectorAll('[class^=rel]');
    for (var i = 0; i < query.length; i++) {
        query[i].style.display = 'none';
    }
}
// class^=rel要素の表示初期化
clearRel();
var relBk = document.getElementsByClassName('relBk');
for (var i = 0; i < relBk.length; i++) {
    relBk[i].style.display = 'flex';
}
expCalculate();
// キー押下時リアルタイムexpCalculate()実行
document.addEventListener('keyup', expCalculate);
// タグinputに変更があった場合、関数expCalculateを実行する
var input = document.getElementsByTagName('input');
for (var i = 0; i < input.length; i++) {
    input[i].addEventListener('change', expCalculate);
}
// レアリティ関連項目クラス名リスト
var relList = ['relBk', 'relPt', 'relGl', 'relSl'];
// 指定したclassが付けられた要素取得
function getClass() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    x.forEach(function (z) {
        var y = document.getElementsByClassName(z);
        for (var i = 0; i < y.length; i++) {
            y[i].style.display = 'flex';
        }
    });
}
// 選択したレアリティにより表示／非表示する要素
function rarityFilter(rr) {
    if (rr == rr) {
        // 選択レアリティの場合
        var selected = relList.filter(function (x) {
            return x == rr;
        });
        getClass(selected);
        // 選択レアリティじゃない場合
        var selectedNot = relList.filter(function (x) {
            return x != rr;
        });
        getClass(selectedNot);
    }
}
// レアリティ選択時
function selectRarity() {
    var selectedRarity = document.getElementById('expMaxRarity');
    var rareBk = document.getElementById('rarityBlack');
    var rarePt = document.getElementById('rarityPlatinum');
    var rareGl = document.getElementById('rarityGold');
    var rareSl = document.getElementById('raritySilver');
    // サリエットチェックの有無
    var sarriette = document.getElementById('uSarriette');
    function sarriChecked() {
        if (sarriette.checked == true) {
            formUnits.reset();
            sarriette.checked = true;
        }
        else if (sarriette.checked == false) {
            formUnits.reset();
            sarriette.checked = false;
        }
    }
    if (rareBk.checked) {
        selectedRarity.innerText = 'ブラック';
        sarriChecked();
        clearRadio();
        clearRel();
        rarityFilter('relBk');
        document.getElementById('black99').checked = true;
    }
    else if (rarePt.checked) {
        selectedRarity.innerText = 'プラチナ';
        sarriChecked();
        clearRadio();
        clearRel();
        rarityFilter('relPt');
        document.getElementById('platinum99').checked = true;
    }
    else if (rareGl.checked) {
        selectedRarity.innerText = 'ゴールド';
        sarriChecked();
        clearRadio();
        clearRel();
        rarityFilter('relGl');
        document.getElementById('gold99').checked = true;
    }
    else if (rareSl.checked) {
        selectedRarity.innerText = 'シルバー';
        sarriChecked();
        clearRadio();
        clearRel();
        rarityFilter('relSl');
        document.getElementById('silver55').checked = true;
    }
}
// 経験値計算
function expCalculate() {
    var max = expCalculator.expMax.value;
    var current = expCalculator.expCurrent.value - 1;
    var next = expCalculator.expNext.value;
    var expMax = expCalculator.expMax;
    var inputResult = document.getElementById('inputResult');
    var expResult = document.getElementById('expResult');
    // サリエット所持判定
    var sarriette = document.getElementById('uSarriette');
    function sarri() {
        if (sarriette.checked == true) {
            return 11;
        }
        else if (sarriette.checked == false) {
            return 10;
        }
    }
    // 経験値ユニット
    var uBarmor = document.getElementById('uBarmor');
    var uParmor = document.getElementById('uParmor');
    var uFarah = document.getElementById('uFarah');
    var uFreude = document.getElementById('uFreude');
    var uAlegria = document.getElementById('uAlegria');
    //const uAmour: any = <HTMLInputElement> document.getElementById('uAmour');
    var uPlease = document.getElementById('uPlease');
    var uPrazer = document.getElementById('uPrazer');
    var uSpiritSame = document.getElementById('uSpiritSame');
    var uSpiritOthers = document.getElementById('uSpiritOthers');
    document.getElementById('uBarmorExp').innerText = 40000 * sarri() / 10 + 'EXP';
    document.getElementById('uParmorExp').innerText = 5000 * sarri() / 10 + 'EXP';
    document.getElementById('uFarahExp').innerText = 20000 * sarri() / 10 + 'EXP';
    document.getElementById('uFreudeExp').innerText = 19000 * sarri() / 10 + 'EXP';
    document.getElementById('uAlegriaExp').innerText = 18000 * sarri() / 10 + 'EXP';
    //document.getElementById('uAmourExp').innerText = 4000*sarri()/10 + 'EXP';
    document.getElementById('uPleaseExp').innerText = 18000 * sarri() / 10 + 'EXP';
    document.getElementById('uPrazerExp').innerText = 10000 * sarri() / 10 + 'EXP';
    document.getElementById('uSpiritSameExp').innerText = 1250 * sarri() / 10 + 'EXP';
    document.getElementById('uSpiritOthersExp').innerText = 500 * sarri() / 10 + 'EXP';
    // 経験値ユニット合計
    var uExp = (uBarmor.value * 40000 * sarri() / 10 +
        uParmor.value * 5000 * sarri() / 10 +
        uFarah.value * 20000 * sarri() / 10 +
        uFreude.value * 19000 * sarri() / 10 +
        uAlegria.value * 18000 * sarri() / 10 +
        //uAmour.value*4000*sarri()/10 +
        uPlease.value * 18000 * sarri() / 10 +
        uPrazer.value * 10000 * sarri() / 10 +
        uSpiritSame.value * 1250 * sarri() / 10 +
        uSpiritOthers.value * 500 * sarri() / 10);
    var rareBk = document.getElementById('rarityBlack');
    var rarePt = document.getElementById('rarityPlatinum');
    var rareGl = document.getElementById('rarityGold');
    var rareSl = document.getElementById('raritySilver');
    var maxBlackLevel = [50, 80, 99];
    var maxBlackExp = [20000, 80000, 145967];
    var maxPlatinumLevel = [50, 70, 90, 99];
    var maxPlatinumExp = [18666, 51334, 107334, 136235];
    var maxGoldLevel = [50, 60, 80, 99];
    var maxGoldExp = [17333, 30333, 69333, 126504];
    var maxSilverLevel = [50, 55];
    var maxSilverExp = [16000, 21492];
    // ラジオボタンのvalueはデフォルトだとString型として扱われているようなのでNumber型指定をする。
    var selectedMax = Number(max);
    function reqExp(maxLevel, maxExp, totalExp, nextExp) {
        // indexOfで検索されるデータはデフォルトだとString型として扱われているようなのでNumber型指定をする。型指定が適切でないと「-1」を返す。
        var x = maxLevel.indexOf(Number(max));
        var requiredExp = (maxExp[x] - (totalExp[current]) - (nextExp[current] - next));
        if (!(requiredExp)) {
            expResult.innerHTML = '必要経験値　' + '<span>無効な数値が入力されています</span>';
        }
        else {
            expResult.innerHTML = '必要経験値　' + '<span>' + (requiredExp - uExp) + '</span>';
        }
    }
    if (rareBk.checked) {
        reqExp(maxBlackLevel, maxBlackExp, totalBlackExp, nextBlackExp);
    }
    else if (rarePt.checked) {
        reqExp(maxPlatinumLevel, maxPlatinumExp, totalPlatinumExp, nextPlatinumExp);
    }
    else if (rareGl.checked) {
        reqExp(maxGoldLevel, maxGoldExp, totalGoldExp, nextGoldExp);
    }
    else if (rareSl.checked) {
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
