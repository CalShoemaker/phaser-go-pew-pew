import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'

// let gameSettings = {
//   playerSpeed: 200
// }

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 768,
    height: 432,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        //gravity: { y: 300 },
        debug: false
      }
    },
    scene: [BootScene, PlayScene]
  })
}

export default launch
export { launch }
