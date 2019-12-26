
var _compCnt = 0;

// 初期設定
init();
function init() {

  _compCnt = 0;
  var num = $('.js-fall').length;
  $('.js-fall').each(function(i,e){

    var sw = window.innerWidth;
    var sh = window.innerHeight;

    TweenMax.killTweensOf($(e))
    TweenMax.set($(e), {
      y:-sh,
      x:range(sw * 0.025),
      rotationZ:range(10)
    });

    TweenMax.to($(e), 1, {
      y:0,
      rotationZ:range(10),
      delay:(num - i) * 0.5,
      ease:Elastic.easeOut.config(1, 0.95),
      onComplete:_eComeplete
    });

  });

}

function _eComeplete() {
  if(++_compCnt >= $('.js-fall').length) {
    init();
  }
}
