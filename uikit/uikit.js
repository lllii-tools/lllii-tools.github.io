for(var selectAll=document.getElementsByClassName("selectAll"),_loop_1=function(e){selectAll[e].addEventListener("focus",(function(){return selectAll[e].select()}))},i=0;i<selectAll.length;i++)_loop_1(i);var spinInput=document.getElementsByClassName("spin-input"),_loop_2=function(e){var t=spinInput[e].getAttribute("id"),n=document.getElementById(t),u=t+"Plus";document.getElementsByClassName("spin-plus")[e].setAttribute("id",u);var i=document.getElementById(u),s=i.getAttribute("value"),l=t+"Minus";document.getElementsByClassName("spin-minus")[e].setAttribute("id",l);var o,r,d=document.getElementById(l),a=d.getAttribute("value");function c(){n.value=""==n.value?1:Number(n.value)+Number(s)}function m(){n.value=0==n.value?0:Number(n.value)-Number(a)}function v(e){r=setTimeout((function(){o=setInterval(e,60)}),600)}function E(){clearTimeout(r),clearInterval(o)}i.addEventListener("click",c),i.addEventListener("mousedown",(function(){return v(c)})),i.addEventListener("mouseup",E),i.addEventListener("mouseout",E),d.addEventListener("click",m),d.addEventListener("mousedown",(function(){return v(m)})),d.addEventListener("mouseup",E),d.addEventListener("mouseout",E),i.addEventListener("touchstart",(function(){return v(c)})),i.addEventListener("touchend",E),d.addEventListener("touchstart",(function(){return v(m)})),d.addEventListener("touchend",E)};for(i=0;i<spinInput.length;i++)_loop_2(i);