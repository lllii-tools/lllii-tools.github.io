const accordion = document.getElementsByClassName('accordion');
for (let i=0; i<accordion.length; i++){
  const head = accordion[i].firstElementChild;//最初のdiv
  const body = accordion[i].lastElementChild;//最後のdiv

  // bodyをdivで囲む（padding込の高さを取得するため）
  body.innerHTML = '<div>' + body.innerHTML + '</div>';

  // bodyの高さ
  const bodyHeight = body.clientHeight;

  // bodyのスタイル
  (body as HTMLElement).style.transition = 'all 0.2s ease';
  (body as HTMLElement).style.height = bodyHeight + 'px';

  // 初期設定
  accordion[i].classList.add('close');
  (body as HTMLElement).style.height = '0';

  function evAccordion(){
    if (accordion[i].classList.contains('close') == true){
      accordion[i].classList.remove('close');
      (body as HTMLElement).style.height = bodyHeight + 'px';
    } else if(accordion[i].classList.contains('close') == false) {
      accordion[i].classList.add('close');
      (body as HTMLElement).style.height = '0';
    }
  }

  head.addEventListener('click', evAccordion)
}