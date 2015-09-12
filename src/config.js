var Screen = function(width, height){
	this.width 	= width;
	this.height	= height;
};

var Limit = function(minX, minY, maxX , maxY){
	this.x = {
		min: minX,
		max: maxX
	};
	this.y = {
		min: minY,
		max: maxY
	}
}

var Vector = function(x, y){
	this.x = x;
	this.y = y;
}

var screenDimentions = new Screen(800, 600);
var worldLimit = new Limit(0, 0, 1600, 1200);
var playerLimitMovement = new Limit(worldLimit.x.min + 100, worldLimit.y.min + 100, worldLimit.x.max - 100, worldLimit.y.max - 100);

var playerVelocity = new Vector(150, 150);
var playerStartingPoint = new Vector(100, 1000);
var cameraSpeed = new Vector(1.8, 1.8);

var err = 2;

var max_rats = 4;
var max_bullets = 11;