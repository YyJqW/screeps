var towers = ['5dce10c0080252ca761c99b2','5dcb80c9b272c27f9ad4889f','5dd0be2aa851cf478471b88b',
'5dd3b16bca73bf5d5367786a','5de1042e8ed33a2b7a3a3763','5de7c139ee54d94612510544',
'5de89bced4468d7c3bdecd2a','5dfe41609f4c7d93393cff05','5dfe084edc7f996ea0e365f9','5e034b5fd705e495bf8c8e3b'
,'5e0e1f9f48a65b00882824bd'];
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
        var target_heal = tower[name].room.find(FIND_MY_CREEPS,{
            filter:(creep)=>creep.hits<creep.hitsMax
        });
        var enemy = tower[name].room.find(FIND_HOSTILE_CREEPS);
        if (target_heal!='')
        tower[name].heal(target_heal);
        if (enemy.length>0)
        tower[name].attack(enemy[0]);
        else
        roleRepair.run(tower[name]);
        }
    }
};
module.exports = TC;