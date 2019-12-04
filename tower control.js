var towers = ['5dce10c0080252ca761c99b2','5dcb80c9b272c27f9ad4889f','5dd0be2aa851cf478471b88b','5dd3b16bca73bf5d5367786a','5de1042e8ed33a2b7a3a3763','5de7c139ee54d94612510544'];
var roleRepair = require('role.Repair');
var TC ={
    run :function()
    {
        var tower = new Array();
        for (var name in towers)
        {
            tower[name]=Game.getObjectById(towers[name]);
        }
        for (var name in tower)
        {
        var enemy = tower[name].room.find(FIND_HOSTILE_CREEPS);
        if (enemy.length>0)
        tower[name].attack(enemy[0]);
        else
        roleRepair.run(tower[name]);
        }
    }
};
module.exports = TC;