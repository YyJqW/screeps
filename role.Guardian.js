var roleGuard=
{
    run:function(creep)
    {
        var target_creep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,2);
            var target_structure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,2);
            var target_heal = creep.pos.findClosestByRange(FIND_MY_CREEPS,2);
            var attack_parts=new Array();
            for (var name_ in creep.body)
            {
                if (creep.body[name_].type==ATTACK) attack_parts[name_]=creep.body[name_]
            }
            attack_parts.sort((a,b)=>a.hits-b.hits);
            if (attack_parts[0].hits!=attack_parts[0].hitsMax)
            {
                creep.moveTo(Game.flags.retreat);
                creep.heal(creep);
            }
            else if (attacktrriger&&target_creep!=null)
            {
                console.log('target_c',target_creep);
                if(creep.attack(target_creep)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target_creep);
                }
            }
            else if (attacktrriger&&target_structure!=null)
            {
                console.log('target_s',target_structure);
                creep.attack(target_structure);
                if(creep.attack(target_structure)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target_structure);
                }
            }
            else if (target_heal[0]!=null)
            {
                //heal_target.sort((a,b)=>a.hits/a.hitsMax - b.hits/b.hitsMax);
                if (creep.heal(target_heal[0])==ERR_NOT_IN_RANGE)
                {
                if (creep.rangedHeal(target_heal[0])==ERR_NOT_IN_RANGE)
                {
                creep.moveTo(target_heal[0]);
                }
                }
            }
            else
            {
                console.log('guardian :',creep,'moving to position',Game.flags.Flag1.pos);
                creep.moveTo(Game.flags.Flag1);
            }
    }
}

module.exports = roleGuard;