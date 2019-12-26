

// 初期設定
init();
function init() {


}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  var sw = window.innerWidth;
  var sh = window.innerHeight;

  // スクロールの進捗率を0 ~ 1で計算
  var scroll = $(window).scrollTop();
  var scrollRate = (scroll) / ($(document).height() - sh);

  var wrapper = $('.main');
  var circle = $('.circle');

  // 0 ~ 0.5 で登場
  var circleColor = chroma.mix(0xffffff, 0xff0000, map(scrollRate, 0, 1, 0, 0.5));
  TweenMax.set(circle, {
    color:circleColor.hex(),
    y: map(scrollRate, sh * 0.75, 0, 0, 0.5),
    border: map(scrollRate, 20, 0, 0.5, 1) + 'vw solid ' + circleColor // 0.5 ~ 1 でメッセージを表示
  });

  // 0 ~ 0.5 で背景色を白に
  var bgColorA = chroma.mix(0xfdbe88, 0xffffff, map(scrollRate, 0, 1, 0, 0.5)).hex();
  var bgColorB = chroma.mix(0xfbd6b5, 0xffffff, map(scrollRate, 0, 1, 0, 0.5)).hex();
  wrapper.css({
    background: 'linear-gradient(' + bgColorA + ',' + bgColorB + ')'
  })

  window.requestAnimationFrame(update);
}
