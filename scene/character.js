export class Player{
    constructor(){
        this.jumpHeight = 500
        this.speed = 50
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
}