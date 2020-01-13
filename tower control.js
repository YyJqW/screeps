var roleRepair = require('role.Repair');
var TC ={
    run :function(tower,m_c)
    {
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
        roleRepair.run(tower[name],m_c);
        }
    }
};
module.exports = TC;