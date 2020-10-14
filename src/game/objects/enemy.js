import Phaser from 'phaser';
import ship1Img from '@/game/assets/ship.png'
import ship2Img from '@/game/assets/ship2.png'
import ship3Img from '@/game/assets/ship3.png'

const enemyConfig = [{
    name: 'ship1',
    speed: 1,
    image: ship1Img,
    frame: { 
        frameWidth: 32, 
        frameHeight: 32 
    },
    anim: {
        key: "ship1_anim",
        frameRate: 20,
        repeat: -1
    }
},{
    name: 'ship2',
    speed: 2, 
    image: ship2Img,
    frame: { 
        frameWidth: 32, 
        frameHeight: 16 
    },
    anim: {
        key: "ship2_anim",
        frameRate: 20,
        repeat: -1
    }
},{
    name: 'ship3',
    speed: 3, 
    image: ship3Img,
    frame: { 
        frameWidth: 16, 
        frameHeight: 16 
    },
    anim: {
        key: "ship3_anim",
        frameRate: 20,
        repeat: -1
    }
}];

class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, type, x = Phaser.Math.Between(32, scene.game.config.width), y = Phaser.Math.Between(32, scene.game.config.height)){
        let enemy = enemyConfig.filter(e=> e.name === type)[0];
        super(scene, x, -y, enemy.name);
        
        scene.add.existing(this);
        
        this.speed = enemy.speed;
        this.play(enemy.anim.key);
    }


    update(){
        this.y += this.speed;

        if(this.y > this.scene.game.config.height){
            this.destroy();
        }
    }
}

export { enemyConfig }
export default Enemy