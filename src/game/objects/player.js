import Phaser from 'phaser';
import Beam from './beam';
import playerImg from '@/game/assets/player.png'

class Player extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene){
        var x = scene.game.config.width / 2 - 8;
        var y = scene.game.config.height - 64;

        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setCollideWorldBounds(true);
        this.play("thrust")
    }
    
    create(){
        this.scene.physics.add.sprite(this)
    }

    update(cursorKeys){
        let speed = 200;
        if(cursorKeys.left.isDown){
            this.setVelocityX(-speed)
          } else if(cursorKeys.right.isDown) {
            this.setVelocityX(speed)
          }else {
            this.setVelocityX(0)
          }
      
          if(cursorKeys.up.isDown){
            this.setVelocityY(-speed)
          } else if(cursorKeys.down.isDown) {
            this.setVelocityY(speed)
          }else {
            this.setVelocityY(0)
          }
    }

    shootBeam(){
        this.scene.projectiles.add(new Beam(this.scene, this));
    }
}

const playerConfig = {
    name: 'player',   
    frame: { 
        frameWidth: 16, 
        frameHeight: 24 
    },
    anim: {
        key: "thrust",
        frameRate: 20,
        repeat: -1
    }
}

export { playerConfig, playerImg };

export default Player