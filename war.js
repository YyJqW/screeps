var container = '5e0d9f0446f9f55ce46a437a';
var TARGET_CONTROLLER_ID = '5bbcae399099fc012e63899e'
var UProom = 'E22S37';
var Attackernum = 0;
var Claimnum = 0;
var Warupmnum = 2;
var reapernum = 0;
var healer = 0;
var CS = require('container sort');
var attacktrriger = true;
var war =
{
    run: function(spawn)
    {
        var STORAGE = Game.getObjectById('5dc8d0293253f2822f25293b');
var M_STORAGE = Game.getObjectById('5dd14b4d8b1d9b586a08b4e6');
var GOODS = 'O';
var EnemyController = Game.getObjectById(TARGET_CONTROLLER_ID);
        var front_container = Game.getObjectById(container);
        var s_c = new Array();
        CS.run('storage',s_c);
        s_c.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY));
        var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack');
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim_w');
        var waruper = _.filter(Game.creeps, (creep) => creep.memory.role == 'warup');
        var reaper = _.filter(Game.creeps, (creep) => creep.memory.role == 'reap');
        console.log('A=',attacker.length,' claimer=',claimer.length,' waruper=',waruper.length,' reaper=',reaper.length);
        if (attacker.length < Attackernum) {
            var newName = 'attacker' + Game.time;
            console.log('Spawning new attacker: ' + newName);
            spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,
            ATTACK,ATTACK,ATTACK,ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            HEAL,HEAL,HEAL], newName, {
                memory: {
                    role: 'attack'
                }
            });//1k6
            
        } //生成近战兵
        else if (claimer.length<Claimnum)
            {
                var newName = 'claimer' + Game.time;
            console.log('Spawning new claimer: ' + newName);
            spawn.spawnCreep([CLAIM,CLAIM,
            MOVE,MOVE,MOVE,MOVE], newName, {
                memory: {
                    role: 'claim_w'
                }
            });//650
            }
            else if (waruper.length<Warupmnum)
            {
                var newName = 'waruper' + Game.time;
            console.log('Spawning new waruper: ' + newName);
            spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            WORK,WORK,WORK,WORK], newName, {
                memory: {
                    role: 'warup'
                }
            });//1k700
            }
            else if (reaper.length < reapernum) {
        var newName = 'reap' + '['+spawn.name +']'+ Game.time;
        console.log('Spawning new reaper: ' + newName);
        spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], newName, {
            memory: {
                role: 'reap',home:spawn
            }
        });//900
     //自动生成搬运工人
}
        for (var name in attacker)
        {
            var target_creep = attacker[name].pos.findInRange(FIND_HOSTILE_CREEPS,1);
            var target_structure = attacker[name].pos.findInRange(FIND_HOSTILE_STRUCTURES,1);
           var target_heal = attacker[name].room.find(FIND_MY_CREEPS,{
            filter:(creep)=>creep.hits<creep.hitsMax
        });
            var attack_parts=new Array();
            for (var name_ in attacker[name].body)
            {
                if (attacker[name].body[name_].type==ATTACK) attack_parts[name_]=attacker[name].body[name_];
            }
            attack_parts.sort((a,b)=>b.hits-a.hits);
            if (attack_parts[0].hits==0)
            {
                attacker[name].moveTo(Game.flags.retreat, {visualizePathStyle: {stroke: '#FF0000'}});
                attacker[name].heal(attacker[name]);
                console.log(attacker[name],'retreating');
            }
            else if (attacktrriger&&target_creep[0]!=undefined)
            {
                console.log('target_c',target_creep[0]);
                if(attacker[name].attack(target_creep[0])==ERR_NOT_IN_RANGE)
                {
                    attacker[name].moveTo(target_creep[0], {visualizePathStyle: {stroke: '#FF0000'}});
                }
            }
            else if (attacktrriger&&target_structure[0]!=undefined&&target_structure[0].structureType!=STRUCTURE_STORAGE&&target_structure[0].structureType!=STRUCTURE_CONTROLLER)
            {
                console.log('target_s',target_structure[0]);
                attacker[name].attack(target_structure[0]);
                if(attacker[name].attack(target_structure[0])==ERR_NOT_IN_RANGE)
                {
                    attacker[name].moveTo(target_structure[0], {visualizePathStyle: {stroke: '#FF0000'}});
                }
            }
                        else if (attacker[name].hits<attacker[name].hitsMax)
            {
                attacker[name].heal(attacker[name]);
            }
            else if (target_heal[0]!=null)
            {
                //heal_target.sort((a,b)=>a.hits/a.hitsMax - b.hits/b.hitsMax);
                if (attacker[name].heal(target_heal[0])==ERR_NOT_IN_RANGE)
                {
                if (attacker[name].rangedHeal(target_heal[0])==ERR_NOT_IN_RANGE)
                {
                attacker[name].moveTo(target_heal[0], {visualizePathStyle: {stroke: '#00FF00'}});
                }
                }
            }
            else
            {
                console.log('attacker :',attacker[name],'moving to position',Game.flags.Flag2.pos);
                attacker[name].moveTo(Game.flags.Flag2, {visualizePathStyle: {stroke: '#FFFFFF'}});
            }

        }
        for (var name in claimer)
        {
            if (EnemyController!=null&&EnemyController.owner!='lijuhaoshaleni')
            {
            if (claimer[name].claimController(EnemyController)==ERR_INVALID_TARGET)
            {
            if(claimer[name].attackController(EnemyController)==ERR_NOT_IN_RANGE)
            {
            claimer[name].moveTo(EnemyController, {visualizePathStyle: {stroke: '#FF00FF'}});
            console.log('attacking',EnemyController.room.name,'s controller');
            }
            }
            else if (claimer[name].claimController(EnemyController)==ERR_NOT_IN_RANGE)
            {
                claimer[name].moveTo(EnemyController, {visualizePathStyle: {stroke: '#FF00FF'}});
            console.log('claiming',EnemyController.room.name,'s controller');
            }
            }
            else
            {
                console.log('claimer :',claimer[name],'moving to position',Game.flags.Flag1.pos);
                claimer[name].moveTo(Game.flags.Flag1, {visualizePathStyle: {stroke: '#FFFFFF'}});
            }
        }
        for (var name in waruper)
        {
            if(waruper[name].store.getUsedCapacity(RESOURCE_ENERGY)>0) {
                if(waruper[name].upgradeController(Game.rooms[UProom].controller) == ERR_NOT_IN_RANGE) {
                    waruper[name].moveTo(Game.rooms[UProom].controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                if (front_container!=undefined&&front_container.store.getUsedCapacity(RESOURCE_ENERGY)>300)
                {
                    if(waruper[name].withdraw(front_container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)   {
                      waruper[name].moveTo(front_container, {visualizePathStyle: {stroke: '#ffaa00'}});//采矿
                   }
                }
                 else if(s_c[0].store.getUsedCapacity(RESOURCE_ENERGY)>300)
                {
                    if(waruper[name].withdraw(s_c[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)   {
                      waruper[name].moveTo(s_c[0], {visualizePathStyle: {stroke: '#ffaa00'}});//采矿
                   }
                }
            }
        }
        for (var name in reaper)
        {
            reaper[name].memory.goods = GOODS;
            if (reaper[name].store.getFreeCapacity()>0)
            {
                if (STORAGE==null)
                {
                    reaper[name].moveTo(Game.flags.Flag1, {visualizePathStyle: {stroke: '#FFFFFF'}});
                    console.log(reaper[name],'moving to ',Game.flags.Flag1);;
                }
                if (reaper[name].withdraw(STORAGE,reaper[name].memory.goods)==ERR_NOT_IN_RANGE)
                {
                reaper[name].moveTo(STORAGE, {visualizePathStyle: {stroke: '#FFFFFF'}});
                console.log(reaper[name],'moving to ',STORAGE,'reaping');
                }
            }
            else if (reaper[name].room.storage!=undefined&&reaper[name].room.storage.owner=='lijunhaoshaleni')
        {
            if (reaper[name].room.storage.store.getFreeCapacity(reaper[name].memory.goods)>0&&reaper[name].transfer(reaper[name].room.storage,reaper[name].memory.goods)==ERR_NOT_IN_RANGE)
            reaper[name].moveTo(reaper[name].room.storage, {visualizePathStyle: {stroke: '#FFFFFF'}});
        }
        else 
        {
                if(M_STORAGE.store.getFreeCapacity(reaper[name].memory.gsoods)>0&&reaper[name].transfer(M_STORAGE,reaper[name].memory.goods)==ERR_NOT_IN_RANGE) //运输到仓库
            {
                console.log(reaper[name],'backing');
                reaper[name].moveTo(M_STORAGE,{ visualizePathStyle: { stroke: '#FFFF00'}});
            }//待修改
        }
        }
    }
};
module.exports = war;