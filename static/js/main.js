var $ = $ || window.jQuery

$(document).ready(function () {
  function resizeElements () {
    $('.fancyList').each(function (i, e) {
      var childs = $(e).find('.fadeIn')
      $(e).find('.timeLine').css('height', $(e).height() - childs.last().outerHeight())
    })
  }
  $(window).load(resizeElements)
  $(window).resize(resizeElements)

  var ms = new Date() - new Date('January 15, 1995 00:00:00')
  $('#age').html(Math.floor(ms / 31536000000))

  var jwindow = $(window)
  var ignoreScrollActions = false
  var scrollSpeed = 0.05

  window.onscroll = function () {
    if (!ignoreScrollActions) {
      var scrollTop = jwindow.scrollTop() + jwindow.height()

      shouldFadeAnimate(scrollTop)
      shouldCirclesAnimate(scrollTop)
      shouldFormAnimate(scrollTop)

      $('.caption').each(function (i, e) {
        var elmOffset = $(e).offset().top
        var elmBackgrounPos = '50% ' + ((elmOffset - scrollTop) * scrollSpeed + 80) + '%'

        e.style.backgroundPosition = elmBackgrounPos
      })
    }
  }

  var fields = {
    name: {
      text: 'Your name',
      elem: $("label[for='formName']")
    },
    email: {
      text: 'Your email',
      elem: $("label[for='formEmail']")
    },
    msg: {
      text: 'Your message',
      elem: $("label[for='formMsg']")
    }
  }

  var anim = {}
  var formDidAnimate = false
  function shouldFormAnimate (scrollTop) {
    var form = $('#form')
    if (!formDidAnimate && form.offset().top < scrollTop) {
      var cnt = 0
      for (var i in fields) {
        setTimeout(function (y) {
          anim[y] = setInterval(function (x) {
            fields[x].elem.html(fields[x].elem.html() + fields[x].text.charAt(0))
            fields[x].text = fields[x].text.substr(1)
            if (fields[x].text.length === 0) {
              clearInterval(anim[x])
            }
          }.bind(this, y), 100)
        }.bind(this, i), ++cnt * 900)
      }

      formDidAnimate = true
    }
  }

  function shouldFadeAnimate (scrollTop) {
    $('.fadeIn').each(function (i, e) {
      var elem = $(e)
      if (elem.offset().top < scrollTop) {
        elem.addClass('fade')
      }
    })
  }

  var circleDidAnimate = false

  function intersects($c1, $c2) {
    var c1Size = $c1.width() * parseFloat($c1.css('transform').split('(')[1].split(',')[0])
    var c1Left = parseFloat($c1.css('left'))
    var c1Top = parseFloat($c1.css('top'))

    var c2Size = $c2.width() * parseFloat($c2.css('transform').split('(')[1].split(',')[0])
    var c2Left = parseFloat($c2.css('left'))
    var c2Top = parseFloat($c2.css('top'))

    return Math.sqrt(Math.pow(c1Left - c2Left, 2) + Math.pow(c1Top - c2Top, 2)) < c1Size / 2 + c2Size / 2
  }

  function shouldCirclesAnimate (scrollTop) {
    var $circles = $('#skillGraph')
    var alreadyAnimated = []

    if (!circleDidAnimate && $circles.offset().top < scrollTop) {
      circleDidAnimate = true

      var pHeight = $circles.height() - 100
      var pWidth = $circles.width() - 100

      $('.skillCircle').each(function(i, e) {
        $e = $(e);

        var intersection = false
        var counter = 50

        do {
          intersection = false
          $e.css('top', Math.random() * pHeight)
          $e.css('left', Math.random() * pWidth)

          for(var i in alreadyAnimated) {
            intersection = intersects($e, alreadyAnimated[i])
            if(intersection) {
              counter--
              break
            }
          }
        } while(intersection && counter > 0)

        alreadyAnimated.push($e);
      })

      $('.skillCircle').addClass('removeScale')

      var skillPopup = function() {
        if(alreadyAnimated.length > 0) {
          var $animated = alreadyAnimated.splice(0, 1)
          $animated[0].addClass('animatedSkill').removeClass('removeScale')
          setTimeout(skillPopup, Math.random() * 800)
        }
      }
      setTimeout(skillPopup, Math.random() * 800)
    }
  }

  var jhtml = $('html, body')
  $('#backTop').on('click', function () {
    ignoreScrollActions = true
    jhtml.animate({ scrollTop: '0' }, 1500, function () { ignoreScrollActions = false })
  })

  $('#toAbout').on('click', function () {
    jhtml.animate({ scrollTop: $('#content').offset().top }, 1500, function () { ignoreScrollActions = false })
  })

  $('#toResume').on('click', function () {
    jhtml.animate({ scrollTop: $('#education').offset().top }, 1500, function () { ignoreScrollActions = false })
  })

  $('#toSkills').on('click', function () {
    jhtml.animate({ scrollTop: $('#skills').offset().top }, 1500, function () { ignoreScrollActions = false })
  })

  $('#toContact').on('click', function () {
    jhtml.animate({ scrollTop: $('#emailform').offset().top }, 1500, function () { ignoreScrollActions = false })
  })

  $('#downloadButton').on('click', function () {
    $.ajax({
      method: 'POST',
      url: '/pdf'
    }).done(function (data) {
      if (data && data.ok) {
        console.log('success')
      }
    })
  })

  $('#sendButton').on('click', function () {
    var sender = $('#formName').val()
    var email = $('#formEmail').val()
    var message = $('#formMsg').val()

    if (!sender || !email || !message) {
      $('.bg-danger').css('max-height', '500px')
      $('.bg-success').css('max-height', '0')
    }

    $.ajax({
      method: 'POST',
      url: '/mail',
      data: {
        sender: sender,
        email: email,
        message: message
      }
    }).done(function (data) {
      if (data && data.ok) {
        $('.bg-danger').css('max-height', '0')
        $('.bg-success').css('max-height', '500px')

        $('#sendButton').css('border', '0').css('display', 'none')
      }
    })
  })
})
