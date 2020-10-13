import Phaser from 'phaser'

import powerUpImg from '@/game/assets/power-up.png'

const powerUpConfig = {
    name:'power-up', 
    image: powerUpImg,
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
};

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, "power-up");
        scene.add.existing(this);
        this.play("red");
    }
}

export { powerUpConfig }

export default PowerUp