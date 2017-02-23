
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

var logo_text = new PIXI.Text("BF", {fontFamily : 'Arial', fontSize: canvasHeaderContainer.clientHeight / 4, fill : 0xFFFFFF, align : 'left'});
logo_circle.addChild(logo_text);

var logo_extra = new PIXI.Graphics();
logo_extra.mask = logo_circle_mask;
logo_circle.addChild(logo_extra);

var mask_padding = 100;

var Bubble = function() {
  this.init = false;
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.max_size = 0;
};

var bubbles = [];
var bubble_max_count = 25;

var bubble_min_size = 10;
var bubble_max_size = canvasHeaderContainer.clientHeight / 8;

for(var i = 0; i < bubble_max_count; i++) {
  bubbles.push(new Bubble());
}

function addExtras() {
  logo_extra.clear();
  logo_extra.beginFill(0xFFFFFF);

  for(var i in bubbles) {
    var bubble = bubbles[i];

    if(bubble.init && bubble.size < bubble.max_size) {
      bubble.size += Math.random() / 2;
    } else {
      var at = Math.random() * 2;
      var radius = Math.min(0.5 + Math.random(), 1.1) * logo_circle_size;
      bubble.x = radius * Math.cos(at * Math.PI);
      bubble.y = radius * Math.sin(at * Math.PI);
      bubble.size = bubble_min_size;
      bubble.max_size = bubble_max_size * Math.min(0.5 + Math.random(), 1);

      bubble.init = true;
    }

    logo_extra.drawCircle(bubble.x, bubble.y, bubble.size);
  }

  logo_extra.endFill();
}

function redrawLogo() {
  logo_circle_mask.clear();
  logo_circle_mask.lineStyle(mask_padding, 0xFF0000);
  logo_circle_mask.drawCircle(0, 0, logo_circle_size + mask_padding / 2);
  logo_circle_mask.endFill();

  logo_circle_mask.x = logo_circle.x = canvasHeaderContainer.clientWidth / 2;
  logo_circle_mask.y = logo_circle.y = canvasHeaderContainer.clientHeight / 2;

  logo_text.x = -logo_text.width / 2 + 5;
  logo_text.y = -logo_text.height / 2;

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
  logo_circle_size = canvasHeaderContainer.clientHeight / 4;
  bubble_max_size = canvasHeaderContainer.clientHeight / 8;
  logo_text.style = {fontFamily : 'Arial', fontSize: canvasHeaderContainer.clientHeight / 4, fill : 0xFFFFFF, align : 'left'};

  if(renderer) {
    renderer.resize(canvasHeaderContainer.clientWidth, canvasHeaderContainer.clientHeight);
  }
}
window.onresize = resize;
