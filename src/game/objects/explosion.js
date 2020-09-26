import Phaser from 'phaser';

import explosionImg from '@/game/assets/explosion.png';

class Explosion extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "explosion");
        scene.add.existing(this);
        this.play("explosion");
    }

    create(){
    }
}

const explosionConfig = {
    name: 'explosion', 
    frame: { 
        frameWidth: 16, 
        frameHeight: 16 
    },
    anim: {
        key: "explosion",
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
    }
}

export { explosionConfig, explosionImg } 

export default Explosion;