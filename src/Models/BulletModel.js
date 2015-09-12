var BulletModel = function (PointA, PointB) {
	this.startingPoint = {
		x: PointA.x,
		y: PointA.y
	};
	this.finishingPoint = {
		x: PointB.x,
		y: PointB.y
	}

	this.frequency = 1.25;
	this.setVelocity();
	this.sprite;
	this.velocity;
	this.start = true;
};

BulletModel.prototype.addSprite = function(sprite) {
	this.sprite = sprite;
};

BulletModel.prototype.setVelocity = function() {
	this.velocity = new Vector((this.finishingPoint.x - this.startingPoint.x)/this.frequency, (this.finishingPoint.y - this.startingPoint.y)/this.frequency);
};

BulletModel.prototype.patrol = function() {
	this.sprite.body.velocity.x = this.velocity.x;
	this.sprite.body.velocity.y = this.velocity.y;
	if(this.distance(this.sprite.body, this.finishingPoint) < err && this.start){
		this.sprite.body.x = this.startingPoint.x;
		this.sprite.body.y = this.startingPoint.y;
	}
};

BulletModel.prototype.setFrequency = function(frequency) {
	this.frequency = frequency;
	this.setVelocity();
};

BulletModel.prototype.distance = function(A, B) {
	var dx = Math.abs(A.x - B.x);
	var dy = Math.abs(A.y - B.y);
	return Math.sqrt(dx*dx + dy*dy);
};

BulletModel.prototype.getStartingPoint = function() {
	return this.startingPoint;
};

var bulletModel = new Array();