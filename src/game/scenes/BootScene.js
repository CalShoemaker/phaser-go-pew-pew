import { Scene } from 'phaser'
import background from '@/game/assets/milkyway.png'
import background2 from '@/game/assets/background.png'

import { playerConfig } from '../objects/player'
import { explosionConfig } from '../objects/explosion'
import { powerUpConfig } from '../objects/powerup'
import { beamConfig } from '../objects/beam'
import { enemyConfig } from '../objects/enemy'
import LevelScene from './LevelScene'

const Levels = [{
  key: 'Level0',
  index: 0,
  background: background,
  acts:[{
    index: 0,
    title: 'Act 1',
    next: 1000,
    events: [{
      loop: false,
      delay: 1000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship1'
    }]
  },{
    index: 1,
    title: 'Act 2',
    next: 2000,
    events: [{
      loop: false,
      delay: 1000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship1'
    },{
      loop: false,
      delay: 3500,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship2'
    }]
  },{
    index: 2,
    title: 'Act 3',
    next: 3000,
    events: [{
      loop: false,
      delay: 1000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship1'
    },{
      loop: false,
      delay: 5000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship2'
    },{
      loop: false,
      delay: 3000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship3'
    }]
  }]
},{
  key: 'Level1',
  index: 1,
  background: background2,
  acts:[{
    index: 0,
    title: 'Act 1',
    next: 1000,
    events: [{
      loop: false,
      delay: 1000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship1'
    }]
  },{
    index: 1,
    title: 'Act 2',
    next: 2000,
    events: [{
      loop: false,
      delay: 1000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship1'
    },{
      loop: false,
      delay: 3500,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship2'
    }]
  },{
    index: 2,
    title: 'Act 3',
    next: 3000,
    events: [{
      loop: false,
      delay: 1000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship1'
    },{
      loop: false,
      delay: 5000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship2'
    },{
      loop: false,
      delay: 3000,
      callback: 'enemy',
      multiplyer: 5,
      type: 'ship3'
    }]
  }]
}];

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    //this.load.image('background', background);

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
    
    for(let l=0; l < Levels.length; l++){
      this.scene.add(Levels[l].key, new LevelScene(Levels[l]), false);
    }

    //this.scene.start('PlayScene')
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
