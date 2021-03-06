import Phaser from 'phaser';
import Beam from './beam';
import playerImg from '@/game/assets/player.png'

const playerConfig = {
    name: 'player',   
    speed: 100,
    image: playerImg,
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
    
    update(cursorKeys){
        const modifySpeed = (shift) => { return shift ? 2 : 1; };

        if(cursorKeys.left.isDown){
            this.setVelocityX(-playerConfig.speed * modifySpeed(cursorKeys.left.shiftKey))
        } else if(cursorKeys.right.isDown) {
            this.setVelocityX(playerConfig.speed * modifySpeed(cursorKeys.right.shiftKey))
        }else {
            this.setVelocityX(0)
        }
    
        if(cursorKeys.up.isDown){
            this.setVelocityY(-playerConfig.speed * modifySpeed(cursorKeys.up.shiftKey))
        } else if(cursorKeys.down.isDown) {
            this.setVelocityY(playerConfig.speed * modifySpeed(cursorKeys.down.shiftKey))
        }else {
            this.setVelocityY(0)
        }
    }

    shootBeam(){
        this.scene.projectiles.add(new Beam(this.scene, this));
    }
}

export { playerConfig };

export default Player