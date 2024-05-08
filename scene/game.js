import Phaser from '../lib/phaser.js';
import { Setting } from './settings.js';
import { loadLevel } from './level.js';
import { Player } from './character.js';



export default class Game extends Phaser.Scene{
    constructor(){
        super('game')
        //this will be the central place where all the game settings come from
        this.gameSetting = new Setting;
        this.player = new Player;
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
        //for the buttons
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

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
        //this moves the cat
        this.moveButtons()

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

    moveButtons(){
        if(this.spaceBar.isDown){
            this.player.jump(this.cat)
        }

        if(this.a.isDown){
            console.log("a clicked")
            this.player.move_dir(this.cat, 'left')
        }
        else if(this.d.isDown){
            this.player.move_dir(this.cat, 'right')
        }
        else {
            this.cat.setVelocityX(0)
        }
        
    }
}