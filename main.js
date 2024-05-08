import Phaser from './lib/phaser.js'
import Game from './scene/game.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Game,

    scale: {
        
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

