var expCalculator=document.getElementById("expCalculator"),formUnits=document.getElementById("formUnits"),idBlack99=document.getElementById("black99");document.getElementById("expMaxRarity").innerText="ブラック",document.getElementById("expMaxBlack").style.display="flex",idBlack99.checked=!0;var expUnits=document.getElementById("expUnits"),expUnitsForm=expUnits.getElementsByTagName("form")[0],expMaxRadio=document.getElementsByName("expMax");function clearRadio(){for(var e=0;e<expMaxRadio.length;e++)expMaxRadio[e].checked=!1}function clearRel(){for(var e=document.querySelectorAll("[class^=rel]"),t=0;t<e.length;t++)e[t].style.display="none"}clearRel();for(var relBk=document.getElementsByClassName("relBk"),i=0;i<relBk.length;i++)relBk[i].style.display="flex";expCalculate(),document.addEventListener("keyup",expCalculate);var input=document.getElementsByTagName("input");for(i=0;i<input.length;i++)input[i].addEventListener("change",expCalculate);var relList=["relBk","relPt","relGl","relSl"];function getClass(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];e.forEach((function(e){for(var t=document.getElementsByClassName(e),n=0;n<t.length;n++)t[n].style.display="flex"}))}function rarityFilter(e){e==e&&(getClass(relList.filter((function(t){return t==e}))),getClass(relList.filter((function(t){return t!=e}))))}function selectRarity(){var e=document.getElementById("expMaxRarity"),t=document.getElementById("rarityBlack"),n=document.getElementById("rarityPlatinum"),l=document.getElementById("rarityGold"),r=document.getElementById("raritySilver"),a=document.getElementById("uSarriette");function c(){1==a.checked?(formUnits.reset(),a.checked=!0):0==a.checked&&(formUnits.reset(),a.checked=!1)}t.checked?(e.innerText="ブラック",c(),clearRadio(),clearRel(),rarityFilter("relBk"),document.getElementById("black99").checked=!0):n.checked?(e.innerText="プラチナ",c(),clearRadio(),clearRel(),rarityFilter("relPt"),document.getElementById("platinum99").checked=!0):l.checked?(e.innerText="ゴールド",c(),clearRadio(),clearRel(),rarityFilter("relGl"),document.getElementById("gold99").checked=!0):r.checked&&(e.innerText="シルバー",c(),clearRadio(),clearRel(),rarityFilter("relSl"),document.getElementById("silver55").checked=!0)}function expCalculate(){var e=expCalculator.expMax.value,t=expCalculator.expCurrent.value-1,n=expCalculator.expNext.value,l=(expCalculator.expMax,document.getElementById("inputResult"),document.getElementById("expResult")),r=document.getElementById("uSarriette");function a(){return 1==r.checked?11:0==r.checked?10:void 0}var c=document.getElementById("uBarmor"),d=document.getElementById("uParmor"),u=document.getElementById("uFarah"),i=document.getElementById("uFreude"),m=document.getElementById("uAlegria"),o=document.getElementById("uPlease"),x=document.getElementById("uPrazer"),E=document.getElementById("uSpiritSame"),y=document.getElementById("uSpiritOthers");document.getElementById("uBarmorExp").innerText=4e4*a()/10+"EXP",document.getElementById("uParmorExp").innerText=5e3*a()/10+"EXP",document.getElementById("uFarahExp").innerText=2e4*a()/10+"EXP",document.getElementById("uFreudeExp").innerText=19e3*a()/10+"EXP",document.getElementById("uAlegriaExp").innerText=18e3*a()/10+"EXP",document.getElementById("uPleaseExp").innerText=18e3*a()/10+"EXP",document.getElementById("uPrazerExp").innerText=1e4*a()/10+"EXP",document.getElementById("uSpiritSameExp").innerText=1e3*a()/10+"EXP",document.getElementById("uSpiritOthersExp").innerText=500*a()/10+"EXP";var p=4e4*c.value*a()/10+5e3*d.value*a()/10+2e4*u.value*a()/10+19e3*i.value*a()/10+18e3*m.value*a()/10+18e3*o.value*a()/10+1e4*x.value*a()/10+1e3*E.value*a()/10+500*y.value*a()/10,B=document.getElementById("rarityBlack"),g=document.getElementById("rarityPlatinum"),s=document.getElementById("rarityGold"),I=document.getElementById("raritySilver");Number(e);function k(r,a,c,d){var u=a[r.indexOf(Number(e))]-c[t]-(d[t]-n);l.innerHTML=u?"必要経験値　<span>"+(u-p)+"</span>":"必要経験値　<span>無効な数値が入力されています</span>"}B.checked?k([50,80,99],[2e4,8e4,145967],totalBlackExp,nextBlackExp):g.checked?k([50,70,90,99],[18666,51334,107334,136235],totalPlatinumExp,nextPlatinumExp):s.checked?k([50,60,80,99],[17333,30333,69333,126504],totalGoldExp,nextGoldExp):I.checked&&k([50,55],[16e3,21492],totalSilverExp,nextSilverExp)}function reset(){expCalculator.reset(),formUnits.reset(),clearRadio(),clearRel(),rarityFilter("relBk"),idBlack99.checked=!0,document.getElementById("expMaxRarity").innerText="ブラック",expCalculate()}
//# sourceMappingURL=aigiscalculator.js.map