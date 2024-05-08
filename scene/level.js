export const loadLevel = function(lv_map, platform){
    //this first clears the already existing list
    platform.clear(true)

    //this creates platforms depending on the map that 
    for(let r = 0; r < lv_map.length; r++){
        for(let c = 0; c < lv_map[0].length; c++){
            if(lv_map[r][c] == 1){
                platform.create(32+64*c, 0+64*r, 'tiles', 15)
            }
        }
    }
    //this will clear the platform list
    //platform.clear(true)
}