import {Input, Math, Scene }from 'phaser'

import Player from '../objects/player';
import Beam from '../objects/beam';
import Enemy from '../objects/enemy';
import Explosion from '../objects/explosion';
import PowerUp from '../objects/powerup';

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }

  // Create stuff
  create () {
    const background = this.add.tileSprite(0, 0, this.game.config.height, this.game.config.width, "background");
    const player = new Player(this);
    
    background.height = this.game.config.height;
    background.width = this.game.config.width;

    this.background = background;
    this.background.setOrigin(0,0);

    this.score = 0;
    this.scoreLabel = this.add.text(10,10, "SCORE " + this.score, {fontFamily:"VCR"});
    this.enemies = this.physics.add.group({ runChildUpdate: true });
    this.projectiles = this.add.group({ runChildUpdate: true });
    this.powerUps = this.physics.add.group({ runChildUpdate: true });
    this.players = this.physics.add.group();

    this.players.add(player);
    player.setCollideWorldBounds(true);

    this.cursorKeys = this.input.keyboard.createCursorKeys();    
    this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    
    this.physics.add.overlap(this.players, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.players, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    this.generateEnemies = this.time.addEvent({ 
      delay: 1000, 
      callback: this.generateEnemy, 
      callbackScope: this, 
      loop: true 
    });

    // this.generatePowerUps = this.time.addEvent({ 
    //   delay: 5000, 
    //   callback: this.generatePowerUp, 
    //   callbackScope: this, 
    //   loop: true 
    // });
  }

  // Generate an enemy
  generateEnemy(){
    let enemy = "ship" + Math.Between(1,3);
    //for(let x=0; x<=5; x++){
      this.enemies.add(new Enemy(this, enemy));
    //}
  }

  generatePowerUp(){
    let powerUp = new PowerUp(this);
    this.powerUps.add(powerUp);      
    powerUp.setRandomPosition(32, 32, this.game.config.width - 32, this.game.config.height - 32);
    powerUp.setVelocity(50, 50)
    powerUp.setCollideWorldBounds(true);
    powerUp.setBounce(1);
  }

  // Pick up a power up
  pickPowerUp(player, powerUp){
    powerUp.disableBody(true, true);
  }

  // Crash
  hurtPlayer(player, enemy){
    this.updateScore(0)
    this.resetShipPosition(enemy);
    player.x = this.game.config.width / 2 - 8;
    player.y = this.game.config.height - 64;
  }

  // Blow ship up
  hitEnemy(projectile, enemy){
    projectile.destroy();
    this.updateScore(enemy.speed * 10);
    this.destroyShip(enemy);
  }

  // Update Score
  updateScore(value){
    if(value) {
      this.score += value;
    } else {
      this.score = 0;
    }
    this.scoreLabel.text = "SCORE " + this.score;
  }

  // the loop
  update () {

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
  }

  // Pew pew
  shootBeam(){
    return this.projectiles.add(new Beam(this));
  }

  // Move Player
  movePlayer(){
    let player1 = this.players.getChildren()[0];
    
    player1.update(this.cursorKeys);
    if(Input.Keyboard.JustDown(this.spacebar)){
      player1.shootBeam();
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
