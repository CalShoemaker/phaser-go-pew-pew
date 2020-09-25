import {Input, Math, Scene }from 'phaser'
import Beam from './beam';

let gameSettings ={
  playerSpeed: 200
}
export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }

  create () {
    const background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background");

    background.height = this.game.config.height;
    background.width = this.game.config.width;
    //background.scrollFactorX = 100;
    this.background = background;
    this.background.setOrigin(0,0);

    this.ship = this.add.sprite(this.game.config.width/2 - 50, this.game.config.height/2, "ship");
    this.ship2 = this.add.sprite(this.game.config.width/2, this.game.config.height/2, "ship2");
    this.ship3 = this.add.sprite(this.game.config.width/2 + 50, this.game.config.height/2, "ship3");
    
    //this.ship.setScale(2);
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    
    this.ship.play("ship_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    // this.input.on('gameobjectdown', this.destroyShip, this);
    this.powerUps = this.createPowerUps();
    
    //this.ship.flipY=true;
    this.player = this.physics.add.sprite(this.game.config.width / 2 - 8, this.game.config.height - 64, "player");
    this.player.play("thrust");
    this.player.setCollideWorldBounds(true);

    this.cursorKeys = this.input.keyboard.createCursorKeys();    
    this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    
    this.projectiles = this.add.group();
    
    this.physics.add.collider(this.projectiles, this.powerUps, (projectile)=>{ 
      projectile.destroy();
    });

    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

  }

  pickPowerUp(player, powerUp){
    powerUp.disableBody(true, true);
  }

  hurtPlayer(player, enemy){
    this.resetShipPosition(enemy);
    player.x = this.game.config.width / 2 - 8;
    player.y = this.game.config.height - 64;
  }

  hitEnemy(projectile, enemy){
    projectile.destroy();
    this.destroyShip(enemy);
  }

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

  update () {
    this.moveShip(this.ship, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.background.tilePositionY -= 0.5;
    this.movePlayerManager();
    if(Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
    }
    for (let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  shootBeam(){
    return new Beam(this);
    //this.projectiles.add(beam);
  }

  movePlayerManager(){
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed)
    } else if(this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed)
    }else {
      this.player.setVelocityX(0)
    }
    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed)
    } else if(this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed)
    }else {
      this.player.setVelocityY(0)
    }
  }

  moveShip(ship, speed){
    ship.y += speed;
    if (ship.y > this.game.config.height) {
      this.resetShipPosition(ship);
    }
  }

  destroyShip(ship){
    //let original = ship.texture.key;
    //let animation = ship.texture.animation;

    //ship.setTexture("explosion");
    //ship.play("explosion");
    this.resetShipPosition(ship);
    this.time.addEvent({
      delay: 1500,
      callback: ()=>{
        //ship.setTexture(original);
        //ship.play(animation)
        
      }
    });
  }

  resetShipPosition(ship){
    ship.y = 0;
    let randomX = Math.Between(0, this.game.config.width);
    ship.x = randomX;
  }
}
