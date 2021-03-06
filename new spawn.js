var CS = require('container sort');
var Harnum = 0;
var Transnum = 0;
var Transnum_m = 0;
var Upnum = 1;
var buildnum = 1;
var Transnum_i = 1;
var NS = {
    run: function (spawn) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Har'&&creep.memory.home.name==spawn.name);
        var upers = _.filter(Game.creeps, (creep) => creep.memory.role == 'up'&&creep.memory.home.name==spawn.name);
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport'&&creep.memory.home.name==spawn.name);
        var transporter_m = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_m'&&creep.memory.home.name==spawn.name);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'build'&&creep.memory.home.name==spawn.name);
        var transporter_i = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_i'&&creep.memory.home.name==spawn.name);
        var s_c = new Array();
        CS.run('storage',s_c);
        console.log('H=',harvesters.length,' U=',upers.length,' T=',transporter.length,' B=',builders.length,' T_i=',transporter_i.length,'TM= ',transporter_m.length);
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
            spawn.spawnCreep([MOVE,MOVE,WORK,WORK], newName, {
                memory: {
                    role: 'Har',home:spawn
                }
            });
        } //自动生成矿工
        else if (transporter.length < Transnum) {
            var newName = 'trans' + '['+spawn.name +']'+ Game.time;
            console.log('Spawning new transporter: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
                memory: {
                    role: 'transport',home:spawn
                }
            });//900
         //自动生成搬运工人
    }
    else if (transporter_m.length < Transnum_m) {
        var newName = 'trans' + '['+spawn.name +']'+ Game.time;
        console.log('Spawning new transporter_m: ' + newName);
        spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
            memory: {
                role: 'transport_m',home:spawn
            }
        });//900
     //自动生成搬运工人
}
    else if (upers.length < Upnum) {
               var newName = 'U' + '['+spawn.name +']'+ Game.time;
               console.log('Spawning new uper: ' + newName);
               spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,
               CARRY,CARRY,
               WORK,WORK,WORK,WORK,WORK,WORK], newName, {
                   memory: {
                       role: 'up',home:spawn
                   }
               });//1k600
           } //自动生成升级工人
    else{
        var construction = Game.rooms[spawn.room.name].find(FIND_CONSTRUCTION_SITES);
            if (construction.length>0)
            {
             if (builders.length < buildnum) {
               var newName = 'B' + '['+spawn.name +']'+ Game.time;
               console.log('Spawning new builder: ' + newName);
               spawn.spawnCreep([WORK,WORK,
               CARRY,CARRY,CARRY,CARRY,
               MOVE,MOVE,MOVE,MOVE], newName, {
                   memory: {
                       role: 'build',home:spawn
                   }
               });//1K500
           } //自动生成建筑工人
       }
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
    }
};
module.exports = NS;