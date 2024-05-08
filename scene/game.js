import Phaser from '../lib/phaser.js'
import { Setting } from './settings.js'
import { loadLevel } from './level.js';


export default class Game extends Phaser.Scene{
    constructor(){
        super('game')
        //this will be the central place where all the game settings come from
        this.gameSetting = new Setting;
    }

    preload(){

        this.load.spritesheet('tiles', './res/Death game - Tile map.png', {
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.spritesheet('cat', './res/Death game - cat.png', {
            frameWidth: 64,
            frameHeight: 64
        })

    }

    create(){
        //this creates the platform group
        this.platform = this.physics.add.staticGroup()
        
        this.cat = this.physics.add.sprite(30, 30, 'cat')

        this.physics.add.collider(this.cat, this.platform)

        const myClock = this.time.addEvent({
            delay: 3000, 
            callback: this.changeLevel,
            callbackScope: this,
            loop: false, // Repeat indefinitely
        });

    }

    update(){
        //this will change what maps generated
        if(this.gameSetting.cur_level === 'tutorial'){
            loadLevel(this.gameSetting.tutorial_lv, this.platform)
        }

        if(this.gameSetting.cur_level === 'lever'){
            loadLevel(this.gameSetting.lever_lv, this.platform)
        }

        if(this.gameSetting.cur_level === 'jump'){
            loadLevel(this.gameSetting.jump_lv, this.platform)
        }

        if(this.gameSetting.cur_level === 'saw'){
            loadLevel(this.gameSetting.saw_lv, this.platform)
        }
        
    }
    changeLevel(){
        this.gameSetting.lv_ind += 1
        this.gameSetting.cur_level = this.gameSetting.lv_list[this.gameSetting.lv_ind]
    }
}