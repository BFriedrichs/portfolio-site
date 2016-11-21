var options = {
  transparent: true,
  antialias: true
}

var renderer = PIXI.autoDetectRenderer(300, 300, options);
var logo = document.getElementById('logo');
logo.appendChild(renderer.view);

var stage = new PIXI.Container();
var logo = new PIXI.Graphics();
stage.addChild(logo);

var Circle = function(x, y, radius, parent) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.parent = parent;
  this.color = 0xFFFFFF;
  this.thickness = 5;

  this.graphics = new PIXI.Graphics();
  this.parent.addChild(this.graphics);

  this.draw = function() {
    this.graphics.clear();
    this.graphics.lineStyle(this.thickness, this.color);
    this.graphics.drawCircle(this.x, this.y, this.radius);
    this.graphics.endFill();
  };
};

var circle = new Circle(150, 150, 125, logo);

animate();
function animate() {
    requestAnimationFrame(animate);

    circle.draw();

    renderer.render(stage);
}
