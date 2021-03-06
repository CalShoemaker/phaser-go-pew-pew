import Phaser from 'phaser';

import beamImg from '@/game/assets/beam.png'

const beamConfig = {
    name: 'beam',
    image: beamImg,
    frame: { 
        frameWidth: 16, 
        frameHeight: 16 
    },
    anim: {
        key: "beam_anim",
        frameRate: 20,
        repeat: -1
    }
}


class Beam extends Phaser.GameObjects.Sprite{
    
    constructor(scene, ship){
        var x = ship.x;
        var y = ship.y - 16;

        super(scene, x, y, "beam");

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.body.velocity.y = - 250;
        
        this.play("beam_anim")
    }

    update(){
        if(this.y < 0){
            this.destroy();
        }
    }
}

export { beamConfig };

export default Beam