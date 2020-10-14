import { Scene } from 'phaser'
import background from '@/game/assets/milkyway.png'

import { playerConfig } from '../objects/player'
import { explosionConfig } from '../objects/explosion'
import { powerUpConfig } from '../objects/powerup'
import { beamConfig } from '../objects/beam'
import { enemyConfig } from '../objects/enemy'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('background', background);

    this.load.spritesheet(playerConfig.name, playerConfig.image, playerConfig.frame);
    this.load.spritesheet(powerUpConfig.name, powerUpConfig.image, powerUpConfig.frame);
    this.load.spritesheet(explosionConfig.name, explosionConfig.image, explosionConfig.frame);
    this.load.spritesheet(beamConfig.name, beamConfig.image, beamConfig.frame);

    for(let elen = 0; elen < enemyConfig.length; elen++){
      let enemy = enemyConfig[elen];
      this.load.spritesheet(enemy.name, enemy.image, enemy.frame);
    }
  }

  create () {
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
