function resizeElements() {
  $('.fancyList').each(function(i, e) {
    var childs = $(e).find('.fadeIn');
    $(e).find('.timeLine').css('height', $(e).height() - childs.last().outerHeight());
  });
}
$(window).load(resizeElements);
$(window).resize(resizeElements);

$(document).ready(function() {

  var ms = new Date() - new Date("January 15, 1995 00:00:00");
  $('#age').html(Math.floor(ms / 31536000000));

  var jwindow = $(window);
  var ignoreScrollActions = false;
  var scrollSpeed = 0.02;

  window.onscroll = function() {
    if(!ignoreScrollActions) {
      var scrollTop = jwindow.scrollTop() + jwindow.height();

      shouldFadeAnimate(scrollTop);
      shouldCirclesAnimate(scrollTop);
      shouldFormAnimate(scrollTop);

      $('.caption').each(function(i, e) {
        var elmOffset = $(e).offset().top,
            elBackgrounPos = "50% " + ((elmOffset - scrollTop) * scrollSpeed + 60) + "%";

        e.style.backgroundPosition = elBackgrounPos;
      });
    }
  }

  var fields = {
    name: {
      text: "Your name",
      elem: $("label[for='formName']")
    },
    email: {
      text: "Your email",
      elem: $("label[for='formEmail']")
    },
    msg: {
      text: "Your message",
      elem: $("label[for='formMsg']")
    }
  };

  var anim = {};
  var formDidAnimate = false;
  var self = this;
  function shouldFormAnimate(scrollTop) {
    var form = $('#form');
    if(!formDidAnimate && form.offset().top < scrollTop) {
      var cnt = 0;
      for(var i in fields) {
        setTimeout(function(y) {
          anim[i] = setInterval(function(x) {
            fields[x].elem.html(fields[x].elem.html() + fields[x].text.charAt(0));
            fields[x].text = fields[x].text.substr(1);
            if(fields[x].text.length == 0) {
              clearInterval(anim[x]);
            }
          }.bind(this, y), 100);
        }.bind(this, i), ++cnt * 900);
      }

      formDidAnimate = true;
    }
  }

  function shouldFadeAnimate(scrollTop) {
    $('.fadeLeft').each(function(i, e) {
      var elem = $(e);
      if(elem.offset().top < scrollTop) {
        elem.removeClass('fadeLeft');
      }
    });
    $('.fadeRight').each(function(i, e) {
      var elem = $(e);
      if(elem.offset().top < scrollTop) {
        elem.removeClass('fadeRight');
      }
    });
  }

  var circleValues = [75, 85, 85, 75, 60, 55];

  for(var i = 1; i <= circleValues.length; i++) {
    document.getElementById('circle' + i + '_bg').setAttribute("d", describeArc(80, 80, 70, 0, 359));
  }

  var circleDidAnimate = false,
      time = 0,
      tick = 10,
      duration = 3000;
  function shouldCirclesAnimate(scrollTop) {
    var circles = $('#skillCircles');

    if(!circleDidAnimate && circles.offset().top < scrollTop) {
      circleDidAnimate = true;
      var buildCircle = setInterval(function() {
        for(var i = 1; i <= circleValues.length; i++) {

          var fill = time / 100 * circleValues[i - 1];
          document.getElementById('circle' + i).setAttribute("d", describeArc(80, 80, 70, 0, fill * 3.6));
        }
        time += (100 / duration) * tick;
        if(time >= 100) {
          clearTimeout(buildCircle);
        }
      }, tick);

    }
  }

  var jhtml = $('html, body');
  $('#backTop').on('click', function() {
    ignoreScrollActions = true;
    jhtml.animate({ scrollTop: "0"}, 1500, function() { ignoreScrollActions = false; });
  });

  $('#toAbout').on('click', function() {
      jhtml.animate({ scrollTop: $('#content').offset().top}, 1500, function() { ignoreScrollActions = false; });
  });

  $('#toResume').on('click', function() {
      jhtml.animate({ scrollTop: $('#education').offset().top}, 1500, function() { ignoreScrollActions = false; });
  });

  $('#toSkills').on('click', function() {
      jhtml.animate({ scrollTop: $('#skills').offset().top}, 1500, function() { ignoreScrollActions = false; });
  });

  $('#toContact').on('click', function() {
      jhtml.animate({ scrollTop: $('#emailform').offset().top}, 1500, function() { ignoreScrollActions = false; });
  });

  $('#downloadButton').on('click', function() {
    $.ajax({
      method: 'POST',
      url: '/pdf'
    }).done(function(data) {
      if(data && data.ok) {
        console.log('success');
      }
    })
  });

  $('#sendButton').on('click', function() {

    var sender = $('#formName').val(),
        email = $('#formEmail').val(),
        message = $('#formMsg').val();

    if(!sender || !email || !message) {
      $('.bg-danger').css('max-height', '500px');
      $('.bg-success').css('max-height', '0');
    }

    $.ajax({
      method: 'POST',
      url: '/mail',
      data: {
        sender: sender,
        email: email,
        message: message
      }
    }).done(function(data) {
      if(data && data.ok) {
        $('.bg-danger').css('max-height', '0');
        $('.bg-success').css('max-height', '500px');

        $('#sendButton').css('border', '0').css('height', '0');
      }
    })
  });
});
