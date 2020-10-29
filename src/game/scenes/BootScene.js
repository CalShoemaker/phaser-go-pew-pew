import { Scene } from 'phaser'
import store from '../../store/index'
import { playerConfig } from '../objects/player'
import { explosionConfig } from '../objects/explosion'
import { powerUpConfig } from '../objects/powerup'
import { beamConfig } from '../objects/beam'
import { enemyConfig } from '../objects/enemy'
import LevelScene from './LevelScene'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
    this.levels = store.getters['game/levels']
  }

  preload () {

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
    
    for(let l=0; l < this.levels.length; l++){
      this.scene.add(this.levels[l].key, new LevelScene(this.levels[l]), false);
    }

    this.scene.start('Level0')
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
