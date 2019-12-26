var CS = require('container sort');
var Harnum = 6;
var Transnum_m = 1;
var Transnum = 0;
var Upnum = 1;
var buildnum = 1;
var Transnum_i = 1;
var Minernum = 1;
var Harnum_o =3;
var claimernum = 3;
var Transnumo = 4;
var watchernum = 3;
var guardiannum = 0;
var GBT = false;
var CAG = {
    run: function (spawn) {
        var mineral=spawn.room.find(FIND_MINERALS);
        var mine_c=mineral[0].pos.findInRange(FIND_STRUCTURES,3,{
            filter:(contai)=>contai.structureType==STRUCTURE_CONTAINER
        });
        var invader=new Array();
        var mineral = spawn.room.find(FIND_MINERALS);
        var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'mine'&&creep.memory.home.room.name==spawn.room.name);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Har');
        var harvesters_o = _.filter(Game.creeps, (creep) => creep.memory.role == 'O_Har');
        var upers = _.filter(Game.creeps, (creep) => creep.memory.role == 'up'&&creep.memory.home.room.name==spawn.room.name);
        var transporter_m = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_m'&&creep.memory.home.room.name==spawn.room.name);
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'build');
        var transporter_i = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_i'&&creep.memory.home.name==spawn.name);
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');
        var transporter_o = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_o');
        var watcher = _.filter(Game.creeps, (creep) => creep.memory.role == 'watch');
        var guardian = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
        var s_c = new Array();
        CS.run('storage',s_c);
        if(watcher[0]!=undefined)
        {
        for (var name in watcher)
        {
            if (watcher[name].room.find(FIND_HOSTILE_CREEPS)[0]!=undefined)
            invader.push(watcher[name].room.find(FIND_HOSTILE_CREEPS)[0]);
            if (watcher[name].room.find(FIND_HOSTILE_STRUCTURES)[0]!=undefined)
            invader.push(watcher[name].room.find(FIND_HOSTILE_STRUCTURES)[0]);
            if (invader.length>0) 
            {
                guardiannum=invader.length;
            }
        }
        }
        console.log('H=',harvesters.length,' U=',upers.length,' T=',transporter.length,' B=',builders.length,' T_i=',transporter_i.length,
        ' M=',miner.length,' Claim=',claimer.length,' oH=',harvesters_o.length,' OT=',transporter_o.length,'Guardian=',guardian.length,'TM= ',transporter_m.length);
        if (guardian.length<guardiannum) {
            var newName = 'guardian' + Game.time;
            console.log('Spawning new attacker: ' + newName);
            spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            ATTACK,ATTACK,ATTACK,ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        HEAL,HEAL], newName, {
                memory: {
                    role: 'guard',home:spawn,target:-10,patrol1:false
                }
            });//1k6
            
        } //生成近战兵
        if (transporter_i.length < Transnum_i){
                var newName = 'trans_i' + '['+spawn.name +']'+ Game.time;
        console.log('Spawning new transporter_i: ' + newName);
        spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY
        ,MOVE,MOVE], newName, {
            memory: {
                role: 'transport_i',home:spawn,done:true
            }
        });//300
        }
        else if (harvesters.length < Harnum) {
            var newName = 'Harvester' + spawn.name + Game.time;
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY
            ,MOVE,MOVE,MOVE,MOVE], newName, {
                memory: {
                    role: 'Har',home:spawn,container:-10
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
        else if (transporter_m.length < Transnum_m&&mine_c[0].store.getUsedCapacity()>600) {
            var newName = 'trans_m' + '['+spawn.name +']'+ Game.time;
            console.log('Spawning new transporter_m: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE], newName, {
                memory: {
                    role: 'transport_m',home:spawn,target:-10
                }
            });//900
         //自动生成搬运工人
    }
        else if (miner.length < Minernum&&mineral[0].mineralAmount>0) {
            var newName = 'Miner' + spawn.name + Game.time;
            spawn.spawnCreep([CARRY,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK
            ,MOVE,MOVE,MOVE,MOVE], newName, {
                memory: {
                    role: 'mine',home:spawn
                }
            });
        } //自动生成矿工
    else if (upers.length < Upnum) {
               var newName = 'U' + '['+spawn.name +']'+ Game.time;
               console.log('Spawning new uper: ' + newName);
               spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
               WORK,WORK,WORK,
               MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
                   memory: {
                       role: 'up',home:spawn
                   }
               });//1k600
           } //自动生成升级工人
    else{
            if (GBT)
            {
             if (builders.length < buildnum) {
               var newName = 'B' + '['+spawn.name +']'+ Game.time;
               console.log('Spawning new builder: ' + newName);
               spawn.spawnCreep([WORK, WORK,WORK,WORK,
               CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY
               ,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
                   memory: {
                       role: 'build',home:spawn
                   }
               });//1K500
           } //自动生成建筑工人
       }
    }
    if(spawn.name!=''&&spawn.name!='')
    {
    if (harvesters_o.length < Harnum_o){
        var newName = 'Harvester_o' + spawn.name + Game.time;
        spawn.spawnCreep([CARRY,
        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
            memory: {
                role: 'O_Har',home:spawn
            }
        });
    } //自动生成矿工
    else if (transporter_o.length < Transnumo) {
        var newName = 'trans_o' + '['+spawn.name +']'+ Game.time;
        console.log('Spawning new transporter: ' + newName);
        spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY
        ,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY
        ,WORK,WORK
        ,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
            memory: {
                role: 'transport_o',home:spawn,renewN:false,done:true
            }
        });//900
     //自动生成搬运工人
}
    else if (claimer.length < claimernum){
        var newName = 'claimer' + spawn.name + Game.time;
        spawn.spawnCreep([
        CLAIM,CLAIM,CLAIM,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {
            memory: {
                role: 'claim',home:spawn,number:claimer.length
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
        for (var name in guardian)
        {
        if (guardian[name].memory.target==-10)
        {
            if (invader.length>0&&invader[name].pos!=undefined) 
            {
                guardian[name].memory.target=invader[name].pos;
            }
        }
        }
    }
};
module.exports = CAG;