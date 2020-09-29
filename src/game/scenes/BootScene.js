import { Scene } from 'phaser'
import background from '@/game/assets/background.png'

import { playerConfig, playerImg } from '../objects/player'
import { explosionConfig, explosionImg } from '../objects/explosion'
import { powerUpConfig, powerUpImg } from '../objects/powerup'
import { beamConfig, beamImg } from '../objects/beam'
import { enemyConfig, enemyImgs } from '../objects/enemy'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('background', background);

    this.load.spritesheet(playerConfig.name, playerImg, playerConfig.frame);
    this.load.spritesheet(powerUpConfig.name, powerUpImg, powerUpConfig.frame);
    this.load.spritesheet(explosionConfig.name, explosionImg, explosionConfig.frame);
    this.load.spritesheet(beamConfig.name, beamImg, beamConfig.frame);

    for(let elen = 0; elen < enemyConfig.length; elen++){
      let enemy = enemyConfig[elen];
      this.load.spritesheet(enemy.name, enemyImgs[elen], enemy.frame);
    }
  }

  create () {
    
    // playerConfig.anim.frames = this.anims.generateFrameNumbers(playerConfig.name);
    // this.anims.create(playerConfig.anim);

    // beamConfig.anim.frames = this.anims.generateFrameNumbers(beamConfig.name);
    // this.anims.create(beamConfig.anim);
    
    // explosionConfig.anim.frames = this.anims.generateFrameNumbers(explosionConfig.name)
    // this.anims.create(explosionConfig.anim);

    // for(let plen = 0; plen < powerUpConfig.anim.length; plen++){
    //   let powerUpAnim = powerUpConfig.anim[plen];
    //   let frames = powerUpAnim.frames;

    //   powerUpAnim.frames = this.anims.generateFrameNumbers(powerUpConfig.name, frames)
    //   this.anims.create(powerUpAnim);
    // }

    // for(let elen = 0; elen < enemyConfig.length; elen++){
    //   let enemy = enemyConfig[elen];
    //   enemy.anim.frames = this.anims.generateFrameNumbers(enemy.name)
    //   this.anims.create(enemy.anim)
    // }    
    this.createAnimations(playerConfig);
    this.createAnimations(beamConfig);
    this.createAnimations(explosionConfig);

    this.createAnimations(powerUpConfig, powerUpConfig.anim.length, powerUpConfig.anim);
    
    this.createAnimations(enemyConfig, enemyConfig.length);
    
    this.scene.start('PlayScene')
  }

  // Create Animations
  createAnimations(config, length = 1, frames){
    for(let len = 0; len < length; len++){
      let frame = frames ? frames[len] : null;
      let configs = config.length > 0 ? config[len] : config;
      let anims = configs.anim.length > 0 ? configs.anim[len] : configs.anim;

      anims.frames = this.anims.generateFrameNumbers(configs.name, frame);
      this.anims.create(anims);
    }
  }
}
