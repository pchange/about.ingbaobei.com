// location.hash="#1";

$(document).ready(function() {
  $('#fullpage').fullpage({
    slidesColor: ['#11abe4', '#780678', '#cc0167', '#da4055', '#e23939', '#f5721a', '#c2c41e', '#66cd00', '#11abe4'],
    // css3: true,
    anchors: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    // navigation: true,
    navigation: false,
    navigationPosition: 'right',
    scrollingSpeed: 400,
    touchSensitivity: 3,
    // navigationTooltips: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    afterResize: function() {
      reCountImgSize();
    },
    onLeave: function(anchorLink, index, slideAnchor, slideIndex) {
      // 播放gif
      playGif( index );
      // |播放gif
      // console.log(index);
      if( index === 3 || index === 4 || index === 5 || index === 6 || index === 7 || index === 8 || index === 9){
        var audio = document.getElementById('audio-6');
        audio.play();
        $('#audio-1, #audio-2, #audio-3, #audio-4, #audio-5').each(function(index, elem) {
          if (elem && elem.pause) {
            elem.pause();
            // elem.load();
          }
        });
        // volumeDownElemAudio( audio );

      } else {
        stopAllAudio();
        endedAudio();
      }
      if( index === 9){
        $('.i-09-share-desc-marker').hide();
      }
    }
  });
});


// 监听播放完毕的动作
/**
 * @name endedAudio
 * @desc 音频播放完毕了
 * @depend ['jQuery']
 * @return null
 **/
function endedAudio(){
    // done playing
    // alert("Player stopped");
    $('.audio-box').removeClass('play');
}
$("audio").on('ended', endedAudio);
$("audio#audio-6").on('ended', function() {
  var audio = document.getElementById('audio-6');
  // console.log('replay');
  audio && audio.play && audio.play();
});
// |监听播放完毕的动作

// 点击进行其他页面跳转
$('.slide-tip.up').on('click', function() {
  $.fn.fullpage.moveSectionUp();
})
$('.slide-tip.down').on('click', function() {
  $.fn.fullpage.moveSectionDown();
})
// |点击进行其他页面跳转


/**
 * @name reCountImgSize
 * @desc 计算二维码位置及大小
 * @depend ['jQuery']
 * @return null
 **/
function reCountImgSize() {
  var bodyHeight = window.innerHeight;
  var bodyWidth = window.innerWidth;


  if (bodyWidth > bodyHeight) {
    // alert('系统检测到为横屏，请使用竖屏进行查看页面。');
  }

  // 录音 播放
  var audioBox = $('.audio-box');
  var audioBoxWidth = bodyWidth * 7.037037037037036 / 100;
  var audioBoxHeight = bodyHeight * 4.470588235294118 / 100;
  var audioBoxNum = audioBoxHeight > audioBoxWidth ? audioBoxWidth : audioBoxHeight;
  audioBox.css({
    width: audioBoxNum,
    height: audioBoxNum,
    marginLeft: -audioBoxNum/2,
    marginTop: -audioBoxNum/2,
  })
  // |录音 播放


  // 分享按钮 播放
  var shareBox = $('.i-09-share');
  var shareBoxWidth = shareBox.eq(0).width();
  var shareBoxHeight = bodyHeight * 11.058823529411764 / 100;
  var shareBoxNum = shareBoxHeight > shareBoxWidth ? shareBoxWidth : shareBoxHeight;
  shareBox.css({
    width: shareBoxNum,
    height: shareBoxNum
  })
  // |录音 播放



  // qr-img
  var qrImage = $('.qr-img');
  var qeIdWH = 980/534;
  var qrImageWidth = 180;
  if ((600 / 1707) < (180 / bodyHeight)) {
    qrImageWidth = 600 / 1707 * bodyHeight;
    // console.log(qrImageWidth);
  } else {
    qrImageWidth = 180;
  }
  qrImage.css({
    width: qrImageWidth * qeIdWH,
    height: qrImageWidth,
    marginLeft: -(qrImageWidth * qeIdWH / 2),
    marginTop: -(qrImageWidth / 2)
  })
  // |qr-img



}

reCountImgSize();



// audio api https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

/**
 * @name stopAudio
 * @desc 停止所有音频
 * @depend ['jQuery']
 * @return {null}
 **/
function stopAllAudio() {
  var audio = $('audio');
  audio.each(function(index, elem) {
    if (elem && elem.pause) {
      elem.pause();
      // elem.load();
    }
  })
}

/**
 * @name stopAudio
 * @desc 播放某音频
 * @return {null}
 **/
function playElemAudio(elem) {
  // alert( typeof elem.play )
  if (elem && elem.play) {
    // elem.load();
    // elem.pause();
    elem.play();
    elem.currentTime = 0.0;  
  }
}


$('.audio-box').on('click', function(e) {
  var self = $(this);
  var audioBox = $('.audio-box');
  var state = self.hasClass('play') ? 'play' : 'stop';
  var forAudio;
  var forAttr;
  audioBox.removeClass('play');
  if (state === 'play') {
    stopAllAudio();
    self.removeClass('play');
  } else if (state === 'stop') {
    stopAllAudio();
    self.addClass('play');
    forAttr = self.attr('for');
    // alert(forAttr);
    forAudio = $('#' + forAttr).get(0);
    // alert(forAudio);
    playElemAudio(forAudio);
  }
})

/**
 * @name volumeDownElemAudio
 * @desc 降低某音频
 * @return {null}
 **/
function volumeDownElemAudio(elem) {
  if (elem && elem.volume) {
    elem.volume -= 0.1;
  }
}

/**
 * @name volumeUpElemAudio
 * @desc 增加某音频
 * @return {null}
 **/
function volumeUpElemAudio(elem) {
  if (elem && elem.volume) {
    elem.volume += 0.1;
  }
}




/**
 * @name testIsWeiChatBrowsor
 * @desc 检测是否为微信的浏览器
 * @depend ['jQuery']
 * @return {null}
 **/
/*function testIsWeiChatBrowsor() {
  if( typeof navigator !== 'undefined' && typeof navigator.userAgent  !== 'undefined'){
    // alert( /micromessenger/ig.test(navigator.userAgent) );
    if( /micromessenger/ig.test(navigator.userAgent) === true){
      // 这里是微信浏览器
      // 点击 分享
      $('.i-09-share').on('click', function() {
        $('.i-09-share-desc-marker').show();
      })
      $('.i-09-share-desc-marker').on('click', function(){
        $('.i-09-share-desc-marker').hide();
      })
      // |点击 分享
    } else{
      // 这里不是微信浏览器
      // $('.i-09-share').hide();
      // 点击 分享
      $('.i-09-share').on('click', function() {
        alert('抱歉，只能在微信浏览器里面进行分享。请在微信进行分享。扫描二维码并关注，即可分享。');
      })
      // |点击 分享
    }
  } else {
    setTimeout(testIsWeiChatBrowsor, 300)
  }
}
testIsWeiChatBrowsor();*/



/**
 * @name playGif
 * @desc 检测是否为微信的浏览器
 * @depend ['jQuery']
 * @param {number} i, 哪个页码的i？从1开始下标。
 * @return {null}
 **/
function playGif( i ){
  if( typeof navigator !== 'undefined' && typeof navigator.onLine !== 'undefined' && navigator.onLine === false ){
    return;
  }
  var imgs;
  if( i === undefined ){
    imgs = $('img[src*=".gif"]');
    imgs.each(function(index, elem){
      elem.src = elem.src;
    });
  } else {
    i = i - 1;
    imgs = $('img[src*=".gif"]', $('.section').eq(i));
    imgs.each(function(index, elem){
      elem.src = elem.src;
    });
  }
}
playGif();
// stopAllAudio();

function closeAudio(){
  stopAllAudio()
  // return false;
}
window.onbeforeunload = closeAudio;
window.onunload = closeAudio;