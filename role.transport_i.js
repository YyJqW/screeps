var FS_unfull = require('findstructure_energy_unfull');
var factory = require('factory');
var facilities = require('facilities');
var trade = require('trade');
var roleTransport_i =
{
    run:function(creep,lo,tower,s_c,factorytrriger,tradetrriger,tradegoods,factorygoods,goodsnum_t,goodsnum_f,production)
    {
        if (factorytrriger||tradetrriger)
            facilities.run(creep,tradegoods,factorygoods,goodsnum_t,goodsnum_f,production);
            if (creep.memory.factory&&factorytrriger&&creep.memory.func)
            factory.run(creep,factorygoods)
            else if (creep.memory.trade&&tradetrriger&&creep.memory.func)
            trade.run(creep,tradegoods);
            else
            {
        if (creep.memory.goal==-10||creep.memory.goal==undefined||Game.getObjectById(creep.memory.goal.id).store.getFreeCapacity()==0)
        creep.memory.done = true;
        creep.memory.goods=RESOURCE_ENERGY;
        var transmode = false;
        var tower_t=false;
        var struc = FS_unfull.run(creep);
        var storage_ = Game.rooms[creep.memory.home.room.name].storage;
        var terminal_ = Game.rooms[creep.memory.home.room.name].terminal;
        var Factory = Game.rooms[creep.memory.home.room.name].find(FIND_MY_STRUCTURES,{
            filter: { structureType: STRUCTURE_FACTORY }
        });
        tower = Game.rooms[creep.memory.home.room.name].find(FIND_MY_STRUCTURES,{
            filter: { structureType: STRUCTURE_TOWER }
        });
        tower.sort((a,b)=>a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
        for (var name in tower)
        if (creep.memory.home.room.name==tower[name].room.name&&tower[name].store.getFreeCapacity(RESOURCE_ENERGY)>300)
        {
            tower_t = tower[name];
            break;
        }
        for (var name in lo)
        {
            if (lo[name].room.name==creep.memory.home.room.name)
            {
            creep.memory.link = lo[name];
            break;
            }
        }
        if (creep.store.getUsedCapacity()==0&&creep.memory.link!=undefined&&storage_!=undefined&&Game.getObjectById(creep.memory.link.id).store.getUsedCapacity(RESOURCE_ENERGY)>0)
        transmode=true;
        if (creep.memory.done&&transmode)
        {
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)//收集
        {
            if (creep.memory.link!=undefined)
            {
                if (creep.withdraw(Game.getObjectById(creep.memory.link.id),RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(Game.getObjectById(creep.memory.link.id),{ visualizePathStyle: { stroke: '#FFFF00'},reusePath: 3});
                }
            }
        }
    }
    else
    {
        if(creep.store.getUsedCapacity() == 0)//收集
        {
            s_c.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY)/b.store.getCapacity(RESOURCE_ENERGY)*100 - a.store.getUsedCapacity(RESOURCE_ENERGY)/a.store.getCapacity(RESOURCE_ENERGY)*100);
            if (storage_!=undefined&&storage_.store.getUsedCapacity(RESOURCE_ENERGY)>0)
            {
                if (creep.withdraw(storage_,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(storage_,{ visualizePathStyle: { stroke: '#FFFF00'},reusePath: 3});
                }
            }
            else if (creep.withdraw(s_c[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
            creep.moveTo(s_c[0],{ visualizePathStyle: { stroke: '#FFFF00'},reusePath: 3});
        }
        }
        else
        {
        if (Game.spawns[creep.memory.home.name].store.getFreeCapacity(RESOURCE_ENERGY)>50&&creep.memory.done)
        {
            creep.memory.goal=Game.spawns[creep.memory.home.name];
            creep.memory.done=false;
        }
else if (tower_t&&creep.memory.done)
    {
            creep.memory.goal = tower_t;
            creep.memory.done=false;
    }
        else if (struc!=undefined&&creep.memory.done)
        {
            creep.memory.goal = struc;
            creep.memory.done=false;
    }
    else if (creep.memory.done&&terminal_.store.getUsedCapacity(RESOURCE_ENERGY)<70000)
    {
        creep.memory.goal = terminal_;
        creep.memory.done = false;
    }
    else if (creep.memory.done&&Factory[0]!=undefined&&Factory[0].store.getUsedCapacity(RESOURCE_ENERGY)<10000)
    {
        creep.memory.goal = Factory[0];
        creep.memory.done = false;
    }
    else if (creep.memory.done)
    {
        creep.memory.goal = storage_;
        creep.memory.done = false;
    }
    creep.memory.goal = Game.getObjectById(creep.memory.goal.id);
    if (!creep.memory.done&&creep.memory.goal!=undefined&&creep.memory.goal!=-10)
    {
        if (creep.transfer(Game.getObjectById(creep.memory.goal.id),creep.memory.goods)==ERR_NOT_IN_RANGE)
        creep.moveTo(Game.getObjectById(creep.memory.goal.id),{reusePath: 3});
        else if (creep.transfer(Game.getObjectById(creep.memory.goal.id),creep.memory.goods)==OK)
        {
        creep.memory.done = true;
        creep.memory.func = true;
        }
    }
}
    }
}
}
};
module.exports = roleTransport_i;