import Phaser from 'phaser';

import playerImg from '@/game/assets/player.png'

class Player extends Phaser.GameObjects.Sprite{
    
    constructor(scene){
        var x = scene.game.config.width / 2 - 8;
        var y = scene.game.config.height - 64;

        super(scene, x, y, "player");

        scene.add.existing(this);
        //scene.physics.world.enableBody(this);
        
        //this.setCollideWorldBounds(true);
        this.play("thrust")
    }

    update(){
         
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