var container = '5de0d75b9276c577635ded73';
var Attackernum = 1;
var Claimnum = 0;
var Warupmnum = 0;
var healnum = 0;
var CS = require('container sort');
var attacktrriger = true;
var war =
{
    run: function(spawn)
    {
        var front_container = Game.getObjectById(container);
        var s_c = new Array();
        CS.run('storage',s_c);
        s_c.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY));
        var healer = _.filter(Game.creeps, (creep) => creep.memory.role == 'heal');
        var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack');
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim_w');
        var waruper = _.filter(Game.creeps, (creep) => creep.memory.role == 'warup');
        console.log('A=',attacker.length,' Heal=',healer.length,' claimer=',claimer.length,' waruper=',waruper.length);
        if (attacker.length < Attackernum) {
            var newName = 'attacker' + Game.time;
            console.log('Spawning new attacker: ' + newName);
            spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            ATTACK,ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
                memory: {
                    role: 'attack'
                }
            });//1k6
            
        } //生成近战兵
        else if (healer.length<healnum)
            {
                var newName = 'healer' + Game.time;
            console.log('Spawning new healer: ' + newName);
            spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL], newName, {
                memory: {
                    role: 'heal'
                }
            });//1k2
            }
        else if (claimer.length<Claimnum)
            {
                var newName = 'claimer' + Game.time;
            console.log('Spawning new claimer: ' + newName);
            spawn.spawnCreep([MOVE,CLAIM], newName, {
                memory: {
                    role: 'claim_w'
                }
            });//650
            }
            else if (waruper.length<Warupmnum)
            {
                var newName = 'waruper' + Game.time;
            console.log('Spawning new waruper: ' + newName);
            spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            WORK,WORK], newName, {
                memory: {
                    role: 'warup'
                }
            });//1k700
            }
        for (var name in attacker)
        {
            var target_creep = attacker[name].pos.findClosestByRange(FIND_HOSTILE_CREEPS,2);
            var target_structure = attacker[name].pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,2);
            if (attacktrriger&&target_creep!=null)
            {
                console.log('target_c',target_creep);
                if(attacker[name].attack(target_creep)==ERR_NOT_IN_RANGE)
                {
                    attacker[name].moveTo(target_creep);
                }
            }
            else if (attacktrriger&&target_structure!=null)
            {
                console.log('target_s',target_structure);
                attacker[name].attack(target_structure);
                if(attacker[name].attack(target_structure)==ERR_NOT_IN_RANGE)
                {
                    attacker[name].moveTo(target_structure);
                }
            }
            else
            {
                console.log('attacker :',attacker[name],'moving to position',Game.flags.Flag1.pos);
                attacker[name].moveTo(Game.flags.Flag1);
            }

        }
        for (var name in healer)
        {
            var heal_target = healer[name].room.find(FIND_MY_CREEPS,
                {
                    filter : (target) => target.hits<target.hitsMax&&(
                    target.memory.role=='attack'||
                    target.memory.role == 'claim'||
                    target.memory.role == 'heal')
                });
            if (heal_target[0]!=null)
            {
                //heal_target.sort((a,b)=>a.hits/a.hitsMax - b.hits/b.hitsMax);
                if (healer[name].heal(heal_target[0])==ERR_NOT_IN_RANGE)
                {
                if (healer[name].rangedHeal(heal_target[0])==ERR_NOT_IN_RANGE)
                {
                healer[name].moveTo(heal_target[0]);
                }
                }
            }
            else
                {
                    healer[name].moveTo(Game.flags.Flag1);
                    console.log('healer:',healer[name],'moving to ',Game.flags.Flag1.pos);
                }
        }
        for (var name in claimer)
        {
            console.log('claiming');
            if(claimer[name].claimController(Game.getObjectById('5bbcae489099fc012e638b29'))==ERR_NOT_IN_RANGE)
            claimer[name].moveTo(Game.getObjectById('5bbcae489099fc012e638b29'));
        }
        for (var name in waruper)
        {
            if(waruper[name].store.getUsedCapacity(RESOURCE_ENERGY)>0) {
                if(waruper[name].upgradeController(Game.rooms['E23S39'].controller) == ERR_NOT_IN_RANGE) {
                    waruper[name].moveTo(Game.rooms['E23S39'].controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                if (front_container!=undefined&&front_container.store.getUsedCapacity(RESOURCE_ENERGY)>300)
                {
                    if(waruper[name].withdraw(front_container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)   {
                      waruper[name].moveTo(front_container, {visualizePathStyle: {stroke: '#ffaa00'}});//采矿
                   }
                }
                 if(s_c[0].store.getUsedCapacity(RESOURCE_ENERGY)>300)
                {
                    if(waruper[name].withdraw(s_c[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)   {
                      waruper[name].moveTo(s_c[0], {visualizePathStyle: {stroke: '#ffaa00'}});//采矿
                   }
                }
            }
        }
    }
};
module.exports = war;