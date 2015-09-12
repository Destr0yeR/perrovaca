var PlayerStateService = function(){
	this.state = IDLE;
};

PlayerStateService.prototype.setState = function(input) {
	switch(this.state){
		case IDLE:
			break;
		case WALKING_RIGHT:
			break;
		case WALKING_LEFT;
			break;
		case WALKING_UP;
			break;
		case WALKING_DOWN;
			break;
	}
};

PlayerStateService.prototype.getState = function() {
	return this.state;
};


