import Phaser from 'phaser';

class Beam extends Phaser.GameObjects.Sprite{
    
    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y - 16;
        super(scene, x, y, "beam");

        // 3.2 add to scene
        scene.add.existing(this);
        // 3.3
        scene.anims.load("beam_anim", "new_beam_anim");
        scene.anims.play("new_beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 250;

        // 4.2 add the beam to the projectiles group
        scene.projectiles.add(this);
    }

    update(){
        if(this.y <32){
            this.destroy();
        }
    }
    preUpdate(time, delta){
        super.preUpdate(time, delta)
    }
}

export default Beam