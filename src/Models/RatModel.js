var RatModel = function(PointA, PointB) {
	this.startingPoint = {
		x: PointA.x,
		y: PointA.y
	};
	this.finishingPoint = {
		x: PointB.x,
		y: PointB.y
	}
	//this.frequency = 1.25;
	this.frequency = 1.25;
	this.setVelocity();
	this.sprite;
	this.velocity;
	this.start = true;
};

RatModel.prototype.addSprite = function(sprite) {
	this.sprite = sprite;
};

RatModel.prototype.setVelocity = function() {
	this.velocity = new Vector((this.finishingPoint.x - this.startingPoint.x)/this.frequency, (this.finishingPoint.y - this.startingPoint.y)/this.frequency);
};

RatModel.prototype.patrol = function() {
	this.sprite.body.velocity.x = this.velocity.x;
	this.sprite.body.velocity.y = this.velocity.y;
	if(this.distance(this.sprite.body, this.finishingPoint) < err && this.start){
		this.velocity.x *=-1;
		this.velocity.y *=-1;
		this.start = false;
	}
	else if(!this.start && this.distance(this.sprite.body, this.startingPoint) < err){
		this.velocity.x *=-1;
		this.velocity.y *=-1;
		this.start = true;
	}
};

RatModel.prototype.setFrequency = function(frequency) {
	this.frequency = frequency;
};

RatModel.prototype.distance = function(A, B) {
	var dx = Math.abs(A.x - B.x);
	var dy = Math.abs(A.y - B.y);
	return Math.sqrt(dx*dx + dy*dy);
};

RatModel.prototype.getStartingPoint = function() {
	return this.startingPoint;
};

var ratModel = new Array();