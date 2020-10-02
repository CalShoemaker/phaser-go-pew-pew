import Phaser from 'phaser';
import ship1Img from '@/game/assets/ship.png'
import ship2Img from '@/game/assets/ship2.png'
import ship3Img from '@/game/assets/ship3.png'

class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, type){
        let rndX = Phaser.Math.Between(32, scene.game.config.width);
        let rndY = Phaser.Math.Between(32, scene.game.config.height);
        let rndSpeed = Phaser.Math.Between(1, 3);
        let name = type ? type : "ship" + rndSpeed;

        super(scene, rndX, -rndY, name);
        
        scene.add.existing(this);
        
        this.speed = rndSpeed;
        this.play(name + "_anim");
    }


    update(){
        this.y += this.speed;

        if(this.y > 300){
            this.destroy();
        }
    }
}

const enemyConfig = [{
    name: 'ship1',
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
const enemyImgs = [ship1Img, ship2Img, ship3Img];
export { enemyConfig, enemyImgs }
export default Enemy