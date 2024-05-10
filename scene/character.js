

export class Player{
    constructor(){
        this.jumpHeight = 700
        this.speed = 300
        
    }
    jump(cat){
        if(cat.body.onFloor()){
            cat.setVelocityY(-this.jumpHeight)
        }
    }
    
    move_dir(cat, dir){
        if(dir === "left"){
            cat.setVelocityX(-this.speed)
        }
        else if(dir === "right"){
            cat.setVelocityX(+this.speed)
        }
        
    }

    ghost_mode(cat){
        if(cat.alive === false){
            cat.setVelocityY(-1000)
            cat.setTexture('cat', 15) 
            
        }
        
    }

    dies(cat, deadly){
        cat.alive = false
        
    }

    reset(cat){
        cat.alive = true
        cat.x = 30
        cat.y = 64
        cat.setVelocityY(+100)
        cat.setTexture('cat', 1)
    }
}