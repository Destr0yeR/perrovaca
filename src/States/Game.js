SDD.Game =  function(game) {
    this.cursors;
    this.walls;
    this.rats;
    this.verticalKey;
    this.horizontalKey;
    this.score;
    //TEST

    this.ratTest = new Array();
    this.bulletTest = new Array();
    this.text;
    this.counter = 60;
};

SDD.Game.prototype.preload = function() {
    this.game.stage.backgroundColor = '#16181a';
    this.load.spritesheet('rat', 'assets/rat.png', 32 , 32);
    this.load.spritesheet('player', 'assets/personaje.png', 75 , 75);
    this.load.image('background', 'assets/background.jpg');
    this.load.image('wall', 'assets/pared-alcantarilla.png');
    this.load.image('wall-vertical', 'assets/pared-alcantarilla-vertical.png');
    this.load.image('sewer', 'assets/sewer.png');
    this.load.image('cannon-up', 'assets/cannon-up.png');
    this.load.image('cannon-down', 'assets/cannon-down.png');
    this.load.image('cannon-left', 'assets/cannon-left.png');
    this.load.image('cannon-right', 'assets/cannon-right.png');
    this.load.image('bullet', 'assets/bullet.png');
};


SDD.Game.prototype.create = function() {

    /*
        TODO(javier): Refactor method, create Factories
    */
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    /*
        SET LIMIT OF WORLD
    */
    this.createWalls();
    game.world.setBounds(worldLimit.x.min, worldLimit.y.min, worldLimit.x.max, worldLimit.y.max);
    this.game.add.tileSprite(worldLimit.x.min, worldLimit.y.min, worldLimit.x.max, worldLimit.y.max, 'background');

    this.createWalls();
    this.createCannons();
    this.createBullets();
    this.createPlayer();
    this.createRats();


    this.verticalKey = false;
    this.horizontalKey = false;

    /*
    TODO(javier): Change Input from keyboard to mouse, Check if it works
    */
    this.text = this.add.text(390, 100, this.counter, { font: "64px Arial", fill: "#ffffff", align: "center" });
    this.text.anchor.setTo(0.5, 0.5)
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.camera.follow(this.player);
    this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    this.text.fixedToCamera = true;
};

SDD.Game.prototype.update = function() {
    this.checkCollisions();
    this.movePlayer();
    this.moveRats();
    this.moveBullets();
};

SDD.Game.prototype.moveRats = function() {
    /*
    TODO(javier): Check rats pattern
    */
    for(var key = 0 ; key < max_rats ; ++key){
        ratModel[key].patrol();
    }
};

SDD.Game.prototype.moveBullets = function() {
    for(var key = 0 ; key < max_bullets ; ++key){
        bulletModel[key].patrol();
    }
};

SDD.Game.prototype.movePlayer = function() {

    /*
    TODO(javier): Refactor method, State + Command Patter?
    */
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if(!this.horizontalKey){
        this.verticalKey = true;
        if(this.cursors.up.isDown){
            this.player.body.velocity.y = -playerVelocity.y;
            this.player.animations.play('up');
            if(this.player.body.y < playerLimitMovement.y.min)
            {
                this.player.body.velocity.y = 0;
            }
        }
        else if(this.cursors.down.isDown){
            this.player.body.velocity.y = playerVelocity.y;
            this.player.animations.play('down');
            if(this.player.body.y > playerLimitMovement.y.max)
            {
                this.player.body.velocity.y = 0;
            }
        }
        else this.verticalKey = false;
    }
    else this.verticalKey = false;

    if(!this.verticalKey){
        this.horizontalKey = true;
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -playerVelocity.x;
            this.player.animations.play('left');
            if(this.player.body.x < playerLimitMovement.x.min)
            {
                this.player.body.velocity.x = 0;
            }
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = playerVelocity.x;
            this.player.animations.play('right');
            if(this.player.body.x > playerLimitMovement.x.max)
            {
                this.player.body.velocity.x = 0;
            }
        }
        else this.horizontalKey = false;
    }
    else this.horizontalKey = false;

    if(!this.horizontalKey && !this.verticalKey)
    {
        this.player.animations.stop();
        this.player.frame = 1;
    }
};

SDD.Game.prototype.createWalls = function() {
    /*
    TODO(javier): check Starting point for walls, Design Map
    */
    this.walls = this.add.group();
    this.physics.enable(this.walls, Phaser.Physics.ARCADE);
    this.walls.enableBody = true;
    this.walls.physicsBodyType = Phaser.Physics.ARCADE;
    for(var i = 300 ; i <= 1400 ; i+=100)this.addWall(i, 160);
    for(var i = 500 ; i <= 1100 ; i+=100)this.addWall(i, 320);
    this.addWall(1180, 320);
    for(var i = 350 ; i <= 850 ; i+=100)this.addWall(i,610);
    for(var i = 550 ; i <= 680 ; i+=10)this.addWall(i,750);
    for(var i = 50 ; i <= 250 ; i+=100)this.addWall(i, 942);
    this.addWall(275, 942);
    for(var i = 920 ; i <= 1210 ; i+=100)this.addWall(i,940);
    this.addWall(1180, 940);
    for(var i = 50 ; i <= 1350 ; i+=100)this.addWall(i,1100);


};

SDD.Game.prototype.addWall = function(x, y) {
    var wall = this.walls.create(x, y, 'wall');
    wall.body.collideWorldBounds = true;
    wall.body.immovable = true;
};

SDD.Game.prototype.createRats = function() {
    this.rats = this.add.group();

    /*
    TODO(javier): check Starting points for Rats, Design Map
    */

    ratModel[0] = new RatModel({x: 1410, y: 150}, {x: 1260, y: 300});
    ratModel[1] = new RatModel({x: 260, y: 150}, {x: 480, y: 310});
    ratModel[2] = new RatModel({x: 900, y: 600}, {x: 770, y: 750});
    ratModel[3] = new RatModel({x: 770, y: 750}, {x: 900, y: 900});
    for(var key = 0 ; key < max_rats ; ++key){
        this.createRat(key);
    }
};

SDD.Game.prototype.createRat = function(key) {
    var ratStartingPoint = ratModel[key].getStartingPoint();
    this.ratTest[key] = this.rats.create(ratStartingPoint.x, ratStartingPoint.y, 'rat');
    this.ratTest[key].scale.setTo(2,2);
    this.game.physics.arcade.enable(this.ratTest[key]);
    console.log(this.ratTest[key]);
    this.ratTest[key].body.width = 60;
    this.ratTest[key].body.height = 60;
    ratModel[key].addSprite(this.ratTest[key]);
};

SDD.Game.prototype.createPlayer = function() {

    var playerStartingPoint = playerModel.getStartingPoint();

    this.player = this.game.add.sprite(playerStartingPoint.x, playerStartingPoint.y, 'rat');
    this.player.scale.setTo(1.5, 1.5);
    this.player.anchor.set(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.width = 25;
    this.player.body.height = 25;

    this.player.animations.add('down', [0, 1, 2], 10, true);
    this.player.animations.add('left', [3, 4, 5], 10, true);
    this.player.animations.add('right', [6, 7, 8], 10, true);
    this.player.animations.add('up', [9, 10, 11], 10, true);

    playerModel.addPlayerSprite(this.player);
};

SDD.Game.prototype.checkCollisions = function() {
    playerModel.resetTint();
    this.physics.arcade.overlap(this.player, this.walls, this.collisionHandlerWalls, null, this);
    this.physics.arcade.overlap(this.player, this.rats, this.collisionHandlerWalls, null, this);
    this.physics.arcade.overlap(this.player, this.bullets, this.collisionHandlerWalls, null, this);
};

SDD.Game.prototype.collisionHandlerWalls = function(player, wall) {
    playerModel.hit();
    console.log(Phaser.Timer.SECOND * 5);
    this.score = 0;
    firstTimer= game.time.events.add(Phaser.Timer.SECOND * 0.3, this.reset, this);


};
SDD.Game.prototype.reset = function () {
    this.counter = 60;
    this.state.restart(true, true);
}

SDD.Game.prototype.render = function() {

    game.debug.body(this.player);
    for(var key = 0 ; key < max_rats ; ++key){
        game.debug.body(this.ratTest[key]);
    }

    for(var key = 0 ; key < max_bullets ; ++key){
        game.debug.body(this.bulletTest[key]);
    }
}

SDD.Game.prototype.createBullets = function() {
    this.bullets = this.add.group();

    bulletModel[0] = new BulletModel({x: 271, y: 330}, {x: 500, y: 330});
    bulletModel[0].setFrequency(1.2);
    bulletModel[1] = new BulletModel({x: 271, y: 350}, {x: 500, y: 350});
    bulletModel[1].setFrequency(1.3);
    bulletModel[2] = new BulletModel({x: 271, y: 370}, {x: 500, y: 370});
    bulletModel[2].setFrequency(1.4);

    bulletModel[3] = new BulletModel({x: 920, y: 911}, {x: 920, y: 1140});
    bulletModel[3].setFrequency(1.2);
    bulletModel[4] = new BulletModel({x: 1020, y: 911}, {x: 1020, y: 1140});
    bulletModel[4].setFrequency(1.2);
    bulletModel[5] = new BulletModel({x: 1120, y: 911}, {x: 1120, y: 1140});
    bulletModel[5].setFrequency(1.2);
    bulletModel[6] = new BulletModel({x: 1220, y: 911}, {x: 1220, y: 1140});
    bulletModel[6].setFrequency(1.2);

    bulletModel[7] = new BulletModel({x: 1429, y: 910}, {x: 1200, y: 910});
    bulletModel[7].setFrequency(1.2);
    bulletModel[8] = new BulletModel({x: 1429, y: 890}, {x: 1200, y: 890});
    bulletModel[8].setFrequency(1.2);
    bulletModel[9] = new BulletModel({x: 1429, y: 870}, {x: 1200, y: 870});
    bulletModel[9].setFrequency(1.2);

    bulletModel[10] = new BulletModel({x: 1241, y: 790}, {x: 1470, y: 790});
    bulletModel[10].setFrequency(1.2);

    for(var key = 0 ; key < max_bullets ; ++key){
        this.createBullet(key);
    }
};

SDD.Game.prototype.createBullet = function(key) {
    var bulletStartingPoint = bulletModel[key].getStartingPoint();
    this.bulletTest[key] = this.bullets.create(bulletStartingPoint.x, bulletStartingPoint.y, 'bullet');
    this.bulletTest[key].scale.setTo(0.25,0.25);
    this.game.physics.arcade.enable(this.bulletTest[key]);
    bulletModel[key].addSprite(this.bulletTest[key]);
};

SDD.Game.prototype.createCannons = function() {
    this.add.sprite(270, 330, 'cannon-right');
    this.add.sprite(270, 350, 'cannon-right');
    this.add.sprite(270, 370, 'cannon-right');

    this.add.sprite(920, 910, 'cannon-down');
    this.add.sprite(1020, 910, 'cannon-down');
    this.add.sprite(1120, 910, 'cannon-down');
    this.add.sprite(1220, 910, 'cannon-down');   

    this.add.sprite(1430, 910, 'cannon-left');
    this.add.sprite(1430, 890, 'cannon-left');
    this.add.sprite(1430, 870, 'cannon-left');

    this.add.sprite(1240, 790, 'cannon-right');

};

SDD.Game.prototype.updateCounter = function() {
    this.counter--;
    this.text.setText(this.counter);
    if(!this.counter){
        this.reset();
    }
};