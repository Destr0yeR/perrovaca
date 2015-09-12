var PlayerModel = function(){
	this.points = 0;
	this.StartingPoint = {
		x: playerStartingPoint.x,
		y: playerStartingPoint.y
	};
	this.sprite;
}

PlayerModel.prototype.hit = function() {
	this.sprite.tint = Math.random()*0xffffff;
};

PlayerModel.prototype.resetTint = function() {
	this.sprite.tint = 0xffffff;
};

PlayerModel.prototype.kill = function() {
	this.resetStartingPoint();
};

PlayerModel.prototype.checkPoint = function(x, y) {
	this.StartingPoint.x = x;
	this.StartingPoint.y = y;
};

PlayerModel.prototype.resetStartingPoint = function() {
	this.StartingPoint.x = playerStartingPoint.x;
	this.StartingPoint.y = playerStartingPoint.y;
};

PlayerModel.prototype.getStartingPoint = function() {
	return this.StartingPoint;
};

PlayerModel.prototype.addPlayerSprite = function(sprite) {
	this.sprite = sprite;
};

var playerModel = new PlayerModel;