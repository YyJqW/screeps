var attacktrriger = true;
var roleGuard=
{
    run:function(creep)
    {
        if (creep.memory.target.pos == undefined)
        {
            creep.memory.target = -10;
        }
        var target_creep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,2);
            var target_structure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,2);
            var target_heal = creep.room.find(FIND_MY_CREEPS,{
            filter:(creep)=>creep.hits<creep.hitsMax
        });
            var attack_parts=new Array();
            for (var name_ in creep.body)
            {
                if (creep.body[name_].type==ATTACK) attack_parts[name_]=creep.body[name_]
            }
            attack_parts.sort((a,b)=>b.hits-a.hits);
            if (attack_parts[0].hits<attack_parts[0].hitsMax)
            {
                creep.moveTo(Game.flags.retreat,{ visualizePathStyle: { stroke: '#FF0000'}});
                creep.heal(creep);
            }
            else if (attacktrriger&&target_creep!=null)
            {
                console.log('target_c',target_creep);
                if(creep.attack(target_creep)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target_creep,{ visualizePathStyle: { stroke: '#FF0000'}});
                }
            }
            else if (attacktrriger&&target_structure!=null)
            {
                console.log('target_s',target_structure);
                creep.attack(target_structure);
                if(creep.attack(target_structure)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target_structure,{ visualizePathStyle: { stroke: '#FF0000'}});
                }
            }
            else if (target_heal[0]!=null)
            {
                //heal_target.sort((a,b)=>a.hits/a.hitsMax - b.hits/b.hitsMax);
                if (creep.heal(target_heal[0])==ERR_NOT_IN_RANGE)
                {
                if (creep.rangedHeal(target_heal[0])==ERR_NOT_IN_RANGE)
                {
                creep.moveTo(target_heal[0],{ visualizePathStyle: { stroke: '#00FF00'}});
                }
                }
            }
            else if (creep.memory.target == -10)
            {
                console.log(creep,' patroling');
                if (!creep.memory.patrol1)
                {
                    creep.moveTo(Game.flags.patrol1,{ visualizePathStyle: { stroke: '#00FFFF'}});
                    if (creep.pos.x==Game.flags.patrol1.pos.x&&creep.pos.y==Game.flags.patrol1.pos.y)
                    {
                    creep.memory.patrol1 = true;
                    creep.memory.patrol2 = false;
                    }
                }
                else if (!creep.memory.patrol2)
                {
                    creep.moveTo(Game.flags.patrol2,{ visualizePathStyle: { stroke: '#00FFFF'}});
                    if (creep.pos.x==Game.flags.patrol2.pos.x&&creep.pos.y==Game.flags.patrol2.pos.y)
                    {
                    creep.memory.patrol2 = true;
                    creep.memrry.patrol1 = false;
                    }
                }
            }
            else if (creep.memory.target!=-10)
            {
                creep.moveTo(creep.memory.target.pos,{ visualizePathStyle: { stroke: '#FF0000'}});
                console.log('guardian',creep,'moving to',creep.memory.target.pos);
            }
    }
}

module.exports = roleGuard;