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
        this.jump_point = null
        this.move_point = null
        this.fired = false
        this.mobile = true
        this.start_left = 0
    }

    preload(){
        //this is the tile map for all the platform blocks
        this.load.spritesheet('tiles', './res/Death game - Tile map.png', {
            frameWidth: 64,
            frameHeight: 64
        })

        //this is the spritesheet for the cat
        this.load.spritesheet('cat', './res/Death game - cat.png', {
            frameWidth: 64,
            frameHeight: 64
        })

        //these are for all the objects that kill the player
        this.load.spritesheet('death', './res/spikes.png', {
            frameWidth: 64,
            frameHeight: 64
        })

        //this is for the portal
        this.load.spritesheet('portal', './res/portal.png', {
            frameWidth: 64,
            frameHeight: 64
        })

    }

    create(){

        //for touch controls
        this.input.addPointer(3)
        
        //for the buttons
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        //this creates the platform group
        this.platform = this.physics.add.staticGroup()

        //this creates the platform for the deadly objects
        this.deadly = this.physics.add.staticGroup()

        //this creates a portal the the player has to get the ghost to
        this.port = this.physics.add.staticSprite( this.gameSetting.portal_pos[this.gameSetting.lv_ind][0],this.gameSetting.portal_pos[this.gameSetting.lv_ind][1], 'portal', 0)
        
        //this creates the cat
        this.cat = this.physics.add.sprite(30, 30, 'cat', 1)
        //adds a variable alive to the cat
        this.cat.alive = true

        //this adds a collider between the cat and the various game objects
        this.physics.add.collider(this.cat, this.platform)

        this.physics.add.collider(this.cat, this.deadly, this.player.dies, null, this)
        this.physics.add.collider(this.cat, this.port, this.changeLevel, null, this)
        this.port.body.enable = false
        this.storedx = 0
        this.newx = 0
        /* this is a clock to test the level transitions
        const myClock = this.time.addEvent({
            delay: 3000, 
            callback: this.changeLevel,
            callbackScope: this,
            loop: false, // Repeat indefinitely
        });*/

    }

    update(){
        //for touch controls
        if(this.input.pointer1.isDown){
            if(this.input.pointer1.x >= 420){
                this.jump_point = this.input.pointer1
            }
            if(this.input.pointer1.x < 420){
                this.move_point = this.input.pointer1
            }
        }
        if(this.input.pointer2.isDown){
            if(this.input.pointer2.x >= 420){
                this.jump_point = this.input.pointer2
            }
            if(this.input.pointer2.x < 420){
                this.move_point = this.input.pointer2
            }
        }
        if(this.jump_point != null){
            this.player.jump(this.cat)
            if(this.jump_point.isDown === false){
                this.jump_point = null
            }
        }
        if(this.move_point != null){
            if(this.fired === false){
                this.start_left = this.move_point.x
                this.fired = true
            }
            if(this.move_point.x < this.start_left-30){
                this.cat.setVelocityX(-300)
            }
            else if(this.move_point.x > this.start_left+30){
                this.cat.setVelocityX(300)
            }
            else{
                this.cat.setVelocityX(0)
            }
            if(this.move_point.isDown === false){
                this.move_point = null
                this.start_left = 0
                this.fired = false
                this.cat.setVelocityX(0)
            }
        }
        
        /*
        if(this.input.pointer1.isDown || this.input.pointer2.isDown){
            


            if(this.input.pointer1.x <= 420){
                this.player.move_dir(this.cat, 'right')
                this.newx = this.input.pointer1.x
                console.log("left side")
                if(this.newx > this.storedx){
                    this.cat.x += 5
                    this.storedx +=5
                }
                if(this.newx < this.storedx){
                    this.cat.x -= 5
                    this.storedx -=5
                }
            }
            if(this.input.pointer2.x <= 420){
                this.player.move_dir(this.cat, 'right')
                this.newx = this.input.pointer2.x
                
                
            }
            if(this.input.pointer1.x >= 420 || this.input.pointer2.x >= 420){
                this.player.jump(this.cat)
            }
            
        }
        */

        //this moves the cat
        this.moveButtons()

        this.player.ghost_mode(this.cat)
        
        if(this.cat.y <= 0){
            this.player.reset(this.cat)
        }
        if(this.cat.alive === false){
            this.port.body.enable = true
        }

        //this will change what maps generated
        if(this.gameSetting.cur_level === 'tutorial' && this.gameSetting.tutorial_loaded === false){
            loadLevel( this.gameSetting.tutorial_lv, this.platform, this.deadly, this.port, this.gameSetting, this.physics)
            this.gameSetting.tutorial_loaded = true
           
        }

        if(this.gameSetting.cur_level === 'lever' && this.gameSetting.lever_loaded === false){
            loadLevel( this.gameSetting.lever_lv, this.platform, this.deadly, this.port, this.gameSetting)
            this.gameSetting.lever_loaded = true
        }

        if(this.gameSetting.cur_level === 'jump'){
            loadLevel(this.gameSetting.jump_lv, this.platform, this.deadly, this.port, this.gameSetting)
        }

        if(this.gameSetting.cur_level === 'saw'){
            loadLevel( this.gameSetting.saw_lv, this.platform, this.deadly, this.port, this.gameSetting)
        }
        
    }
    changeLevel(){
 
        this.gameSetting.lv_ind += 1
        this.gameSetting.cur_level = this.gameSetting.lv_list[this.gameSetting.lv_ind]
        this.player.reset(this.cat)
        this.port.body.enable = false

    }

    moveButtons(){
        if(this.mobile === false){
            if(this.spaceBar.isDown){
                this.player.jump(this.cat)
            }

            if(this.a.isDown){
                
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
}