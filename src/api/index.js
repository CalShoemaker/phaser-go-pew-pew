// Note: Simple stub for future use

import background from '@/game/assets/milkyway.png'
import background2 from '@/game/assets/background.png'

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

export default class Api {
    constructor(config) {
        this.levels = config ? config.levels : Levels,
        this.score = config ? config.score : 0
    }

    getLevels() {
        return this.levels;
    }

    getScore() {
        return this.score;
    }
}