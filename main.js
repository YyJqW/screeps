var roleHar = require('role.Har');
var roleBuild = require('role.Build');
var roleUp = require('role.Up');
var roleTransport = require('role.Transporter');
var roleMine = require('role.Mine');
var CAG = require('creep auto generation');
var TC = require('tower control');
var LK = require('link control');
var roleTransport_i = require('role.transport_i');
var NS = require('new spawn');
var war = require('war');
var wartrriger = false;

module.exports.loop = function () {
    console.log(11111);
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];                           //内存清理
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    for (var name in Game.spawns)
    {
        console.log(Game.spawns[name],' working');
        if(Game.spawns[name].name=='Spawn3')
        {
            NS.run(Game.spawns[name]);
        }
    else
    {
    CAG.run(Game.spawns[name]);
    if (wartrriger)
    {
    war.run(Game.spawns[name]);
    }
    }
    }
    TC.run();
    LK.run();
    for(var name in Game.creeps)
    {
    var creep = Game.creeps[name];
            if(creep.memory.role == 'transport_i') {
            roleTransport_i.run(creep);
         }
        if(creep.memory.role == 'transport') {
            roleTransport.run(creep);
        }
         if(creep.memory.role == 'Har') {
            roleHar.run(creep);
        }
        if (creep.memory.role=='mine')
        {
            roleMine.run(creep);
        }
                if(creep.memory.role == 'up') {
            roleUp.run(creep);
        }
        if(creep.memory.role == 'build') {
            roleBuild.run(creep);
        }
    }
    console.log('running');
}
