var roleHar = require('role.Har');
var roleBuild = require('role.Build');
var roleUp = require('role.Up');
var roleTransport = require('transporter_e');
var roleMine = require('role.Mine');
var roleOHar = require('role.Outminer')
var roleClaim = require('role.Claimer');
var CAG = require('creep auto generation');
var TC = require('tower control');
var LK = require('link control');
var roleTransport_i = require('role.transport_i');
var roleTransport_o = require('role.transport_o');
var roleWatch = require('role.watch');
var roleGuard = require("role.Guardian");
var roleTransport_m = require('role.Transporter_m')
var NS = require('new spawn');
var war = require('war');
var CNC = require('CNC')
var trade = require('trade.js')
var wartrriger = true;
var tradegoods = -10;
var goodsnum = 0;
module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];                           //内存清理
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    for (var name in Game.spawns)
    {
        console.log(Game.spawns[name],' working');
        if(Game.spawns[name].name=='Spawn5')
        {
            NS.run(Game.spawns[name]);
        }
    else 
    {
    CAG.run(Game.spawns[name]);
    if (wartrriger)
    {
    if (Game.spawns[name].name!='Spawn3')
    war.run(Game.spawns[name]);
    }
    }
    }
    TC.run();
    LK.run();
    roleWatch.run();
    for(var name in Game.creeps)
    {
    var creep = Game.creeps[name];
            if(creep.memory.role == 'transport_i') {
            if (creep.memory.done)
            roleTransport_i.run(creep);
            if (creep.memory.done&&Game.rooms[creep.memory.home.name].storage.store.getUsedCapacity(tradegoods)>0)
            trade.run(creep,tradegoods,goodsnum);
         }
        if(creep.memory.role == 'transport') {
            roleTransport.run(creep);
        }
        if(creep.memory.role == 'transport_m')
        {
            roleTransport_m.run(creep);
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
        if (creep.memory.role == 'guard')
        {
            roleGuard.run(creep);
        }
        if(creep.memory.role == 'O_Har')
        {
           roleOHar.run(creep);
        }
        if(creep.memory.role == 'transport_o') {
            if(creep.ticksToLive<=400) creep.memory.renewN=true;
            if (creep.memory.renewN) CNC.run(creep);
            else
           roleTransport_o.run(creep);
         }
        if (creep.memory.role == 'claim')
        {
            roleClaim.run(creep);
        }
    }
    console.log('running');
}
