import Phaser from './lib/phaser.js'
import Game from './scene/game.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 832,
    height: 600,
    scene: Game,

    scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
        }
    }
})

