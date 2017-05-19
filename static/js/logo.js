
var container = document.getElementById('canvasHeaderContainer');

var renderer = PIXI.autoDetectRenderer(1, 1, {
  transparent: true,
  antialias: true
});

var stage = new PIXI.Container();
var graphicsContainer = new PIXI.Container();

container.appendChild(renderer.view);
stage.addChild(graphicsContainer);

var logo_circle_size = canvasHeaderContainer.clientHeight / 4;
var logo_circle = new PIXI.Graphics();
var logo_circle_mask = new PIXI.Graphics();

graphicsContainer.addChild(logo_circle);
graphicsContainer.addChild(logo_circle_mask);

var logo_outline = new PIXI.Graphics();
logo_circle.addChild(logo_outline);

function logoTextFactory() {
  return new PIXI.Text("BF", {fontFamily : 'OpenSans',
                              fontSize: canvasHeaderContainer.clientHeight / 4,
                              fontWeight: 'bold',
                              fill : 0xFFFFFF,
                              align : 'left'});
}

var logo_text = logoTextFactory();
logo_circle.addChild(logo_text);

logo_circle.mask = logo_circle_mask;

var logo_extra = new PIXI.Graphics();
logo_extra.mask = logo_text;
logo_circle.addChild(logo_extra);

var Bubble = function() {
  this.init = false;
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.max_size = 0;
  this.iterations_left = 1;
};

var bubbles = [];
var bubble_max_count = 35;

var bubble_min_size = 1;
var bubble_max_size = canvasHeaderContainer.clientHeight / 8;

var interval = setInterval(function() {
  bubbles.push(new Bubble());
  if(bubbles.length >= bubble_max_count) {
    clearInterval(interval);
  }
}, 100);

// https://gist.github.com/gre/1650294
function ease(t) { return 1+(--t)*t*t*t*t; }

function addExtras() {
  logo_extra.clear();
  logo_extra.beginFill(0xFFFFFF);

  for(var i in bubbles) {
    var bubble = bubbles[i];

    if(bubble.init && bubble.size < bubble.max_size - 5) {
      var curr = bubble.size / bubble.max_size;
      bubble.size += (bubble.max_size * ease(curr) - bubble.size) / 40;
    } else {
      if(bubble.iterations_left > 0) {
        var at = Math.random() * 2;
        var radius = Math.min(Math.random(), 1) * logo_circle_size;
        bubble.x = radius * Math.cos(at * Math.PI);
        bubble.y = radius * Math.sin(at * Math.PI);
        bubble.size = bubble_min_size;
        bubble.max_size = (bubble_max_size / bubble.iterations_left) * Math.min(0.5 + Math.random(), 1);
        bubble.iterations_left -= 1;

        bubble.init = true;
      }
    }

    logo_extra.drawCircle(bubble.x, bubble.y, bubble.size);
  }

  logo_extra.endFill();
}

var didResize = false;

function redrawLogo() {
  if(didResize) {
    logo_outline.clear();
    logo_outline.lineStyle(4, 0xFFFFFF);
    logo_outline.beginFill(0x000000, 0.3);
    logo_outline.drawCircle(0, 0, logo_circle_size);
    logo_outline.endFill();
    logo_outline.lineStyle(1, 0xFFFFFF);
    logo_outline.drawCircle(0, 0, logo_circle_size - 10);

    logo_circle_mask.clear();
    logo_circle_mask.beginFill(0xFF0000);
    logo_circle_mask.drawCircle(0, 0, logo_circle_size);
    logo_circle_mask.endFill();

    logo_circle_mask.x = logo_circle.x = canvasHeaderContainer.clientWidth / 2;
    logo_circle_mask.y = logo_circle.y = canvasHeaderContainer.clientHeight / 2;

    logo_text.x = -logo_text.width / 2;
    logo_text.y = -logo_text.height / 2 + 5;

    didResize = false;
  }

  addExtras();
}

animate();
function animate() {
  setTimeout(function() {
    requestAnimationFrame(animate);

    redrawLogo();

    renderer.render(stage);
  }, 1000 / 140);
}

resize();
function resize() {
  if(renderer) {
    renderer.resize(canvasHeaderContainer.clientWidth, canvasHeaderContainer.clientHeight);
  }

  logo_circle_size = canvasHeaderContainer.clientHeight / 4;
  bubble_max_size = canvasHeaderContainer.clientHeight / 8;

  logo_circle.removeChild(logo_text);
  logo_text = logoTextFactory();
  logo_extra.mask = logo_text;
  logo_circle.addChild(logo_text);
  didResize = true;
}
window.onresize = resize;
