export const loadLevel = function(lv_map, platform, deadly, port, setting, physics){
    //this first clears the already existing list
    if(platform != null){
        platform.clear(true)
    }

    //if(port === null){
        //port = physics.add.staticSprite( setting.portal_pos[setting.lv_ind][0],setting.portal_pos[setting.lv_ind][1], 'portal', 0)
    //}
    

    //this adds the portal to the new area
    port.x = setting.portal_pos[setting.lv_ind][0] 
    port.y = setting.portal_pos[setting.lv_ind][1]
    port.body.x = setting.portal_pos[setting.lv_ind][0] - 32
    port.body.y = setting.portal_pos[setting.lv_ind][1] -32

    //this creates platforms depending on the map that 
    for(let r = 0; r < lv_map.length; r++){
        for(let c = 0; c < lv_map[0].length; c++){
            //THESE ARE FOR THE GAME WALLS
            if(lv_map[r][c] == 1){
                platform.create(32+64*c, 0+64*r, 'tiles', 15)
            }
            if(lv_map[r][c] == 2){
                platform.create(32+64*c, 0+64*r, 'tiles', 11)
            }
            if(lv_map[r][c] == 3){
                platform.create(32+64*c, 0+64*r, 'tiles', 10)
            }

            //this is for deadly items
            if(lv_map[r][c] == 11){
                deadly.create(32+64*c, 0+64*r, 'death', 0)
                console.log("it gets here")
            }
        }
    }
    //this will clear the platform list
    //platform.clear(true)
}