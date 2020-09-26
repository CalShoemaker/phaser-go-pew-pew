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

        this.setVelocityY(0);
        this.setVelocityX(0);

        let vel = cursorKeys.left.isDown || cursorKeys.up.isDown ? -speed : speed;

        if(cursorKeys.left.isDown || cursorKeys.right.isDown) { this.setVelocityX(vel); }
        if(cursorKeys.up.isDown || cursorKeys.down.isDown) { this.setVelocityY(vel); }
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