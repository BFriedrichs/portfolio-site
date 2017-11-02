var PIXI = PIXI || window.PIXI
var canvasHeaderContainer = canvasHeaderContainer || document.getElementById('canvasHeaderContainer')

var renderer = PIXI.autoDetectRenderer(1000, 200, {
  transparent: true,
  antialias: true
})

var stage = new PIXI.Container()
var graphicsContainer = new PIXI.Container()

canvasHeaderContainer.appendChild(renderer.view)
stage.addChild(graphicsContainer)

var logoCircleSize = canvasHeaderContainer.clientHeight / 4
var logoCircle = new PIXI.Graphics()
var logoCircleMask = new PIXI.Graphics()

graphicsContainer.addChild(logoCircle)
graphicsContainer.addChild(logoCircleMask)

var logoOutline = new PIXI.Graphics()
logoCircle.addChild(logoOutline)

var opacity = 0.3

function logoTextFactory () {
  return new PIXI.Text('BF', {fontFamily: 'OpenSans',
    fontSize: Math.round(canvasHeaderContainer.clientHeight / 4),
    fontWeight: 'bold',
    fill: 0xFFFFFF,
    align: 'left'})
}

var logoText = logoTextFactory()
logoCircle.addChild(logoText)

logoCircle.mask = logoCircleMask

var logoExtra = new PIXI.Graphics()
logoExtra.mask = logoText
logoCircle.addChild(logoExtra)

var Bubble = function () {
  this.init = false
  this.x = 0
  this.y = 0
  this.size = 0
  this.max_size = 0
  this.iterations_left = 1
}

var bubbles = []
var logoMaxCount = 35

var logoMinSize = 1
var logoMaxSize = canvasHeaderContainer.clientHeight

var interval = setInterval(function () {
  bubbles.push(new Bubble())
  if (bubbles.length >= logoMaxCount) {
    clearInterval(interval)
  }
}, 100)

// https://gist.github.com/gre/1650294
function ease (t) { return 1 + (--t) * t * t * t * t }

function addExtras () {
  logoExtra.clear()
  logoExtra.beginFill(0xFFFFFF)

  for (var i in bubbles) {
    var bubble = bubbles[i]

    if (bubble.init && bubble.size < bubble.max_size) {
      var curr = bubble.size / bubble.max_size
      bubble.size += (bubble.max_size * ease(curr) - bubble.size) / 40
    } else {
      if (bubble.iterations_left > 0) {
        var at = Math.random() * 2
        var radius = Math.min(Math.random(), 0.8) * logoCircleSize
        bubble.x = radius * Math.cos(at * Math.PI)
        bubble.y = radius * Math.sin(at * Math.PI)
        bubble.size = logoMinSize
        bubble.max_size = (logoMaxSize / bubble.iterations_left) * Math.min(0.5 + Math.random(), 1)
        bubble.iterations_left -= 1

        bubble.init = true
      }
    }

    logoExtra.drawCircle(bubble.x, bubble.y, bubble.size)
  }

  logoExtra.endFill()
}

var didResize = false

function redrawLogo () {
  if (didResize) {
    logoOutline.clear()
    logoOutline.lineStyle(4, 0xFFFFFF)
    logoOutline.beginFill(0x000000, opacity)
    logoOutline.drawCircle(0, 0, logoCircleSize)
    logoOutline.endFill()
    logoOutline.lineStyle(1, 0xFFFFFF)
    logoOutline.drawCircle(0, 0, logoCircleSize - logoCircleSize / 6)

    logoCircleMask.clear()
    logoCircleMask.beginFill(0xFF0000)
    logoCircleMask.drawCircle(0, 0, logoCircleSize)
    logoCircleMask.endFill()

    logoCircleMask.x = logoCircle.x = canvasHeaderContainer.clientWidth / 2
    logoCircleMask.y = logoCircle.y = canvasHeaderContainer.clientHeight / 2

    logoText.x = -logoText.width / 2
    logoText.y = -logoText.height / 2

    didResize = false
  }

  addExtras()
}

$('#topNav').on('mouseover', function() {
  opacity = 0.55
  didResize = true
})

$('#topNav').on('mouseout', function() {
  opacity = 0.3
  didResize = true
})

animate()
function animate () {
  setTimeout(function () {
    window.requestAnimationFrame(animate)

    redrawLogo()
    renderer.render(stage)
  }, 1000 / 140)
}

resize()
function resize () {
  if (renderer) {
    renderer.resize(canvasHeaderContainer.clientWidth, canvasHeaderContainer.clientHeight)
    for(var i in bubbles) {
      var bubble = bubbles[i]
      if(bubble.init) {
        bubble.x += (canvasHeaderContainer.clientHeight / 4 - logoCircleSize) / 4
        bubble.y += (canvasHeaderContainer.clientHeight / 4 - logoCircleSize) / 4
        bubble.max_size += (canvasHeaderContainer.clientHeight - logoMaxSize) / 8
      }
    }
  }

  logoCircleSize = canvasHeaderContainer.clientHeight / 4
  logoMaxSize = canvasHeaderContainer.clientHeight / 8

  logoCircle.removeChild(logoText)
  logoText = logoTextFactory()
  logoExtra.mask = logoText
  logoCircle.addChild(logoText)
  didResize = true

  redrawLogo()
  renderer.render(stage)
}
window.onresize = resize
