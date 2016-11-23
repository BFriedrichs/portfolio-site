(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var core = module.exports = require('./core');

global.DRAWABLE = core;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./core":4}],2:[function(require,module,exports){
function GraphicsObject() {
  PIXI.Graphics.call(this);

  this.filled = false;
  this.color = 0x000;
  this.lineThickness = 1;
}

GraphicsObject.prototype = Object.create(PIXI.Graphics.prototype);
GraphicsObject.prototype.constructor = GraphicsObject;
module.exports = GraphicsObject;

GraphicsObject.prototype.render = function() {
  if(this.draw) {
      this.draw();
  }
  for(var i in this.children) {
    this.children[i].render();
  }
};

},{}],3:[function(require,module,exports){
var GraphicsObject = require('../GraphicsObject');

function Circle() {
  GraphicsObject.call(this);
  this.radius = 10;

  this.draw = function() {
    this.clear();
    if(this.filled) {
      this.beginFill(this.color);
    } else {
      this.lineStyle(this.lineThickness, this.color);
    }
    this.drawCircle(this.x, this.y, this.radius);
    this.endFill();
  };
};

Circle.prototype = Object.create(GraphicsObject.prototype);
Circle.prototype.constructor = Circle;
module.exports = Circle;
},{"../GraphicsObject":2}],4:[function(require,module,exports){
module.exports = {
  
  GraphicsObject: require('./GraphicsObject'),

  Circle: require('./elements/Circle')
};
},{"./GraphicsObject":2,"./elements/Circle":3}]},{},[1])

//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIlxudmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29yZScpO1xuXG5nbG9iYWwuRFJBV0FCTEUgPSBjb3JlOyJdfQ==