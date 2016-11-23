var Header = new function() {
    this.container = document.getElementById('canvasHeaderContainer');
    this.renderer = PIXI.autoDetectRenderer(1, 1, {
      transparent: true,
      antialias: true
    });

    this.stage = new PIXI.Container;
    this.graphicsContainer = new DRAWABLE.GraphicsObject;

    this.init = function() {
      this.container.appendChild(this.renderer.view);
      this.stage.addChild(this.graphicsContainer);
    };

    this.render = function() {
      this.graphicsContainer.render();
      this.renderer.render(this.stage);
    };

    this.resize = function(w, h) {
      this.renderer.resize(w, h);
    };
}();


Header.init();

var resize = function() {
  if(Header.renderer) {
      Header.resize(canvasHeaderContainer.clientWidth, canvasHeaderContainer.clientHeight);
  }
};
window.onresize = resize;

var logo_circle = new DRAWABLE.Circle();
logo_circle.color = 0xFFFFFF;
logo_circle.radius = 125;
logo_circle.filled = true;
Header.graphicsContainer.addChild(logo_circle);

animate();
function animate() {
    requestAnimationFrame(animate);

    Header.render();
}

resize();
