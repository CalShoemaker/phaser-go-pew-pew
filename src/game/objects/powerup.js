import Phaser from 'phaser'

import powerUpImg from '@/game/assets/power-up.png'

class PowerUp extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, "power-up");
        scene.add.existing(this);
        this.play("red");
    }
}

const powerUpConfig = {
    name:'power-up', 
    frame: { 
        frameWidth: 16, 
        frameHeight:16 
    },
    anim: [{
        key: "red",
        frames: { 
            start: 0, 
            end: 1 
        },
        frameRate: 20,
        repeat: -1
    },{
        key: "gray",
        frames: { 
            start: 2, 
            end: 3 
        },
        frameRate: 20,
        repeat: -1
    }]
}

export { powerUpConfig, powerUpImg }

export default PowerUp