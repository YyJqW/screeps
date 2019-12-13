var CS = require('container sort');
var Harnum = 4;
var Transnum = 1;
var Upnum = 1;
var buildnum = 2;
var Transnum_i = 1;
var Minernum = 1;
var Harnum_o =2;
var claimernum = 2;
var Transnumo = 2;
var watchernum = 2;
var guardiannum = 0;
var CAG = {
    run: function (spawn) {
        var invader=new Array();
        var mineral = spawn.room.find(FIND_MINERALS);
        var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'mine'&&creep.memory.home.room.name==spawn.room.name);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Har');
        var harvesters_o = _.filter(Game.creeps, (creep) => creep.memory.role == 'O_Har');
        var upers = _.filter(Game.creeps, (creep) => creep.memory.role == 'up'&&creep.memory.home.room.name==spawn.room.name);
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'build');
        var transporter_i = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_i'&&creep.memory.home.room.name==spawn.room.name);
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');
        var transporter_o = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_o');
        var watcher = _.filter(Game.creeps, (creep) => creep.memory.role == 'watch');
        var guardian = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
        var s_c = new Array();
        CS.run('storage',s_c);
        if(claimer[0]!=undefined)
        {
        for (var name in claimer)
        {
            invader = claimer[name].room.find(FIND_HOSTILE_CREEPS);
            if (invader[0]!=undefined) 
            {
                guardiannum=Number(name)+1;
            }
        }
        }
        console.log('H=',harvesters.length,' U=',upers.length,' T=',transporter.length,' B=',builders.length,' T_i=',transporter_i.length,
        ' M=',miner.length,' Claim=',claimer.length,' oH=',harvesters_o.length,' OT=',transporter_o.length);
        if (guardian.length<guardiannum) {
            var newName = 'guardian' + Game.time;
            console.log('Spawning new attacker: ' + newName);
            spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            ATTACK,ATTACK,ATTACK,ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        HEAL,HEAL], newName, {
                memory: {
                    role: 'guard',home:spawn,target:-10
                }
            });//1k6
            
        } //生成近战兵
        if (transporter_i.length < Transnum_i){
                var newName = 'trans_i' + '['+spawn.name +']'+ Game.time;
        console.log('Spawning new transporter_i: ' + newName);
        spawn.spawnCreep([MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], newName, {
            memory: {
                role: 'transport_i',home:spawn
            }
        });//300
        }
        else if (harvesters.length < Harnum) {
            var newName = 'Harvester' + spawn.name + Game.time;
            spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY], newName, {
                memory: {
                    role: 'Har',home:spawn
                }
            });
        } //自动生成矿工
        else if (transporter.length < Transnum) {
            var newName = 'trans' + '['+spawn.name +']'+ Game.time;
            console.log('Spawning new transporter: ' + newName);
            spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], newName, {
                memory: {
                    role: 'transport',home:spawn
                }
            });//900
         //自动生成搬运工人
    }
    else if (transporter_o.length < Transnumo) {
        var newName = 'trans_o' + '['+spawn.name +']'+ Game.time;
        console.log('Spawning new transporter: ' + newName);
        spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], newName, {
            memory: {
                role: 'transport_o',home:spawn
            }
        });//900
     //自动生成搬运工人
}
        else if (miner.length < Minernum&&mineral[0].mineralAmount>0) {
            var newName = 'Miner' + spawn.name + Game.time;
            spawn.spawnCreep([CARRY,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK], newName, {
                memory: {
                    role: 'mine',home:spawn
                }
            });
        } //自动生成矿工
    else if (upers.length < Upnum) {
               var newName = 'U' + '['+spawn.name +']'+ Game.time;
               console.log('Spawning new uper: ' + newName);
               spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK], newName, {
                   memory: {
                       role: 'up',home:spawn
                   }
               });//1k600
           } //自动生成升级工人
    else{
        var construction = Game.rooms[spawn.room.name].find(FIND_CONSTRUCTION_SITES);
        for (var name in s_c){
            if (s_c[name].store.getUsedCapacity(RESOURCE_ENERGY)>200&&construction.length>0)
            {
             if (builders.length < buildnum) {
               var newName = 'B' + '['+spawn.name +']'+ Game.time;
               console.log('Spawning new builder: ' + newName);
               spawn.spawnCreep([WORK, WORK,WORK,WORK,
               MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
               CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], newName, {
                   memory: {
                       role: 'build',home:spawn
                   }
               });//1K500
           } //自动生成建筑工人
       }
       }
    }
    if (harvesters_o.length < Harnum_o){
        var newName = 'Harvester_o' + spawn.name + Game.time;
        spawn.spawnCreep([MOVE,MOVE,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK], newName, {
            memory: {
                role: 'O_Har',home:spawn
            }
        });
    } //自动生成矿工
    else if (claimer.length < claimernum){
        var newName = 'claimer' + spawn.name + Game.time;
        spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM], newName, {
            memory: {
                role: 'claim',home:spawn
            }
        });
    } //自动生成矿工
    if (watcher.length<watchernum){
        var newName = 'watcher' + spawn.name + Game.time;
        spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
            memory: {
                role: 'watch',home:spawn
            }
        });
    }
        if (spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name]; //孵化场工作显示
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y, {
                    align: 'left',
                    opacity: 0.8
                });
        }
        if (invader[0]!=undefined)
        {
            for (var name in guardian)
        {
            invader = claimer[name].room.find(FIND_HOSTILE_CREEPS);
            if (invader[0]!=undefined) 
            {
                guardian[name].memory.target=claimer[name].room.controller;
            }
        }
        }
    }
};
module.exports = CAG;