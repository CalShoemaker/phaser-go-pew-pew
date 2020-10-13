import Phaser from 'phaser';

import explosionImg from '@/game/assets/explosion.png';

const explosionConfig = {
    name: 'explosion',
    image: explosionImg, 
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

class Explosion extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "explosion");
        scene.add.existing(this);
        this.play("explosion");
    }
}


export { explosionConfig } 

export default Explosion;