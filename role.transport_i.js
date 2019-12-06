var link_o = ['5dd0c9af25214e5302d1a290','5dd3e1c8a1ca0b0ae302acaf','5de7b2180a41178afdbcaef0'];
var towers = ['5dcb80c9b272c27f9ad4889f','5dce10c0080252ca761c99b2','5dd0be2aa851cf478471b88b','5dd3b16bca73bf5d5367786a','5de1042e8ed33a2b7a3a3763','5de7c139ee54d94612510544','5de89bced4468d7c3bdecd2a'];
var CS = require('container sort');
var FS_unfull = require('findstructure_energy_unfull');
var roleTransport_i =
{
    run:function(creep)
    {
        var s_c=new Array()
        CS.run('storage',s_c);
        var lo=new Array();
        var struc = FS_unfull.run(creep);
        var tower = new Array();
        var storage_ = Game.rooms[creep.memory.home.room.name].storage;
        for (var name in link_o)
        {
            lo[name]=Game.getObjectById(link_o[name]);
        }
        lo.sort((a,b)=>a.store.getCapacity(RESOURCE_ENERGY)-b.store.getCapacity(RESOURCE_ENERGY));
        for (var name in towers)
        {
            tower[name]=Game.getObjectById(towers[name]);
        }
        tower.sort((a,b)=>a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
        if(creep.store.getUsedCapacity() == 0)//收集
        {
            s_c.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY)/b.store.getCapacity(RESOURCE_ENERGY)*100 - a.store.getUsedCapacity(RESOURCE_ENERGY)/a.store.getCapacity(RESOURCE_ENERGY)*100);
            if (storage_!=undefined&&storage_.store.getUsedCapacity(RESOURCE_ENERGY)>0)
            {
                if (creep.withdraw(storage_,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(storage_),{ visualizePathStyle: { stroke: '#FFFF00'}};
                }
            }
            else if (creep.withdraw(s_c[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
            creep.moveTo(s_c[0]),{ visualizePathStyle: { stroke: '#FFFF00'}};
        }
        }
        else if (Game.spawns[creep.memory.home.name].store.getFreeCapacity(RESOURCE_ENERGY)>0)
        {
            if (creep.transfer(Game.spawns[creep.memory.home.name],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            creep.moveTo(Game.spawns[creep.memory.home.name]),{ visualizePathStyle: { stroke: '#FFFF00'}};
        }
        else if (struc!=undefined)
        {
          if (creep.transfer(struc,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE) //运输到工作建筑
        {
            creep.moveTo(struc,{ visualizePathStyle: { stroke: '#FFFF00'}});
        }
    }
    else if (creep.memory.home.room.name==tower[0].room.name&&tower[0].store.getFreeCapacity(RESOURCE_ENERGY)>300)
        {
            if (creep.transfer(tower[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            creep.moveTo(tower[0],{ visualizePathStyle: { stroke: '#FFFF00'}});
        }
        else 
        {
            for (var name in lo)
            {
            if (creep.memory.home.room.name==lo[name].room.name&&lo[name].store.getUsedCapacity(RESOURCE_ENERGY)<=600)
        {
            if(creep.transfer(lo[name],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            creep.moveTo(lo[name],{ visualizePathStyle: { stroke: '#FFFF00'}})
        }
            }
        }
    }
};
module.exports = roleTransport_i;