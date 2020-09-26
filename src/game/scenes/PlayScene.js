import {Input, Math, Scene }from 'phaser'

//import Player from '../objects/player';
import Beam from '../objects/beam';
import Enemy from '../objects/enemy';
import Explosion from '../objects/explosion';

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }
  
  // Create stuff
  create () {
    const background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background");

    background.height = this.game.config.height;
    background.width = this.game.config.width;

    this.background = background;
    this.background.setOrigin(0,0);
    
    //this.ship.setScale(2);
    this.enemies = this.physics.add.group();
    
    //this.powerUps = this.createPowerUps();
    
    this.player = this.physics.add.sprite(this.game.config.width / 2 - 8, this.game.config.height - 64, "player");
    this.player.play("thrust");
    this.player.setCollideWorldBounds(true);

    //this.player = new Player(this);

    this.cursorKeys = this.input.keyboard.createCursorKeys();    
    this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    
    this.projectiles = this.add.group();
    
    // this.physics.add.collider(this.projectiles, this.powerUps, (projectile)=>{ 
    //   projectile.destroy();
    // });

    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    this.timedEvent = this.time.addEvent({ 
      delay: 1000, 
      callback: this.generateEnemy, 
      callbackScope: this, 
      loop: true 
    });
  }

  // Generate an enemy
  generateEnemy(){
    //for(let x=0; x<=5; x++){
      this.enemies.add(new Enemy(this));
    //}
  }

  // Pick up a power up
  pickPowerUp(player, powerUp){
    powerUp.disableBody(true, true);
  }

  // Crash
  hurtPlayer(player, enemy){
    this.resetShipPosition(enemy);
    player.x = this.game.config.width / 2 - 8;
    player.y = this.game.config.height - 64;
  }

  // Blow ship up
  hitEnemy(projectile, enemy){
    projectile.destroy();
    this.destroyShip(enemy);
  }

  // TODO: Clean this up
  createPowerUps(objects){
    let maxObjects = objects || 4;
    let powerUps = this.physics.add.group();
    for(var i = 0; i <= maxObjects; i++){
      let powerUp = this.physics.add.sprite(16, 16, "power-up");
      powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, this.game.config.width, this.game.config.height);
      
      if( Math.Between(0, this.game.config.width) > 0.5){
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }
      powerUp.setVelocity(100,100)
      powerUp.setCollideWorldBounds(true);

      powerUp.setBounce(1);
    }
    
    return powerUps;
  }

  // the loop
  update () {
    
    // TODO: Enemy factory 
    for (let i = 0; i < this.enemies.getChildren().length; i++){
      let enemy = this.enemies.getChildren()[i];
      enemy.update();
    }

    let backgroundSpeed = 0;
    if(this.cursorKeys.up.isDown){
      backgroundSpeed = 0.75;
    } else if(this.cursorKeys.down.isDown) {
      backgroundSpeed = 0.25;
    }else {
      backgroundSpeed = 0.5;
    }
    
    this.background.tilePositionY -= backgroundSpeed;
    this.movePlayer();
    
    if(Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
    }
    
    // TODO: improve these updates
    for (let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  // Pew pew
  shootBeam(){
    return this.projectiles.add(new Beam(this));
  }

  // Move Player
  movePlayer(){
    let speed = 200;

    // TODO: Clean this up. This is two ternarys. Also, abstract speed. 
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-speed)
    } else if(this.cursorKeys.right.isDown) {
      this.player.setVelocityX(speed)
    }else {
      this.player.setVelocityX(0)
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-speed)
    } else if(this.cursorKeys.down.isDown) {
      this.player.setVelocityY(speed)
    }else {
      this.player.setVelocityY(0)
    }
  }

  // Move enemy ship
  moveShip(ship, speed){
    ship.y += speed;
    if (ship.y > this.game.config.height) {
      ship.destroy();
    }
  }

  // Destroy ship with an animation
  destroyShip(ship){
    ship.destroy();
    return new Explosion(this, ship.x, ship.y);
  }

  // [Deprecated] Reset enemy ship postion 
  resetShipPosition(ship){
    ship.y = 0;
    let randomX = Math.Between(0, this.game.config.width);
    ship.x = randomX;
  }
}
