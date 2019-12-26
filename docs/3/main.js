
var _take = [];
var _takeItem = [];
var _cnt = 0;

// 初期設定
init();
function init() {

  $('.take').each(function(i,e){

    item = [];
    _take.push({
      el:$(e),
      noiseA:random(-1, 1),
      noiseB:random(-1, 1),
      noiseC:random(0.5, 1.5),
      noiseD:random(0.5, 1.5) * 5,
      item:item,
      x:random(0, window.innerWidth)
    });

    $(e).find('> .item').each(function(i2,e2){

      item.push({
        el:$(e2),
        noiseA:random(0.95, 1),
        noiseB:random(-1, 1),
        noiseC:random(0.5, 1.5)
      })

    });

  });

}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  var sw = window.innerWidth;
  var sh = window.innerHeight;

  // スクロールの進捗率を0 ~ 1で計算
  var scroll = $(window).scrollTop();
  var scrollRate = (scroll) / ($(document).height() - sh);
  scrollRate = map(scrollRate, 0.1, 1, 0, 1)


  for(var i = 0; i < _take.length; i++) {

    var o = _take[i];
    var w = sw * 0.05 * o.noiseC;

    TweenMax.set(o.el, {
      width:w,
      x:o.noiseB * sw * 0.05,
      rotationZ: (o.noiseB * 2)
    });

    var len2 = o.item.length;
    for(var i2 = 0; i2 < len2; i2++) {

      var o2 = o.item[i2];

      var interval = 1 / len2;
      TweenMax.set(o2.el, {
        background: 'linear-gradient(' + ~~(90 * o2.noiseB) + 'deg, #318607, #4dbf07)',
        width: (w * o2.noiseA),
        height: (sh / len2) * o2.noiseC,
        rotationZ: (o2.noiseB * 2),
        scaleY: map(scrollRate, 0, 1, interval * i2, interval * i2 + interval)
      });

    }

  }

  // 0 ~ 1 で背景色を白に
  // 負荷高いから間引く
  if(_cnt % 2 == 0) {
    var bgColorA = chroma.mix(0x303f56, 0xffffff, map(scrollRate, 0, 1, 0, 1)).hex();
    var bgColorB = chroma.mix(0x080d11, 0xffffff, map(scrollRate, 0, 1, 0, 1)).hex();
    $('.main').css({
      background: 'linear-gradient(' + bgColorA + ',' + bgColorB + ')'
    })
  }

  _cnt++;

  window.requestAnimationFrame(update);
}
