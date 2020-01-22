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
var roleTransport_m = require('role.Transporter_m');
var NS = require('new spawn');
var war = require('war');
var CNC = require('CNC');
var trade = require('trade');
var GSBI = require('GetStructuresById');
var CS = require('container sort');
var lab = require('lab');
var factory = require('factory');
var facilities = require('facilities');
var FP = require('factory produce');
var reaction = false;
var resultantnum = 3000;
var reactant1 = RESOURCE_LEMERGIUM;
var reactant2 = RESOURCE_OXYGEN;
var LAB_SPAWN = 'Spawn2';
var wartrriger = false;
var tradetrriger = false;
var tradegoods = RESOURCE_OXYGEN;
var goodsnum_t = 0;
var factorytrriger = false;
var factorygoods = RESOURCE_ZYNTHIUM;
var goodsnum_f = 30000;
var production = RESOURCE_ZYNTHIUM_BAR;
var material = RESOURCE_ZYNTHIUM;
var MemoryClean = true;
var labtrriger = false;
module.exports.loop = function () {
    var lo=new Array();
    var tower = new Array();
    var li=new Array();
    var lc=new Array();
    GSBI.run(lo,li,lc,tower);
    var s_c = new Array();
    CS.run('storage',s_c);
    var m_c=new Array()
    CS.run('miner',m_c);
    var terminals=new Array();
    CS.run('terminal',terminals);
     var m_co=new Array()
    CS.run('miner_o',m_co);
    if (MemoryClean)
    {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}
    for (var name in Game.spawns)
    {
       // console.log(Game.spawns[name],' working');
        if(Game.spawns[name].name=='')
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
    if (labtrriger&&!reaction&&Game.spawns[name].name==LAB_SPAWN)
    lab.run(resultantnum,reactant1,reactant2,Game.spawns[name],reaction);
    FP.run(Game.spawns[name],production,material);
    }
    TC.run(tower,m_c);
    LK.run(lo,li,lc);
    roleWatch.run();
    for(var name in Game.creeps)
    {
    var creep = Game.creeps[name];
            if(creep.memory.role == 'transport_i') {
            roleTransport_i.run(creep,lo,tower,s_c,factorytrriger,tradetrriger,tradegoods,factorygoods,goodsnum_t,goodsnum_f);
         }
        if(creep.memory.role == 'transport') {
            if (!creep.memory.lab)
            roleTransport.run(creep,s_c);
        }
        if(creep.memory.role == 'transport_m')
        {
            roleTransport_m.run(creep,s_c);
        }
         if(creep.memory.role == 'Har') {
            roleHar.run(creep,m_c);
        }
        if (creep.memory.role=='mine')
        {
            roleMine.run(creep);
        }
                if(creep.memory.role == 'up') {
            roleUp.run(creep,li,s_c);
        }
        if(creep.memory.role == 'build') {
            roleBuild.run(creep,li,s_c);
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
           roleTransport_o.run(creep,s_c,m_co,terminals);
         }
        if (creep.memory.role == 'claim')
        {
            roleClaim.run(creep);
        }
    }
}
