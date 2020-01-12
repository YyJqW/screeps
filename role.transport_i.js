
var CS = require('container sort');
var FS_unfull = require('findstructure_energy_unfull');
var roleTransport_i =
{
    run:function(creep,lo,tower)
    {
        if (creep.memory.goal==-10||creep.memory.goal==undefined||Game.getObjectById(creep.memory.goal.id).store.getFreeCapacity()==0)
        creep.memory.done = true;
        creep.memory.goods=RESOURCE_ENERGY;
        var transmode = false;
        var s_c=new Array()
        CS.run('storage',s_c);
        var struc = FS_unfull.run(creep);
        var storage_ = Game.rooms[creep.memory.home.room.name].storage;
        tower = Game.rooms[creep.memory.home.room.name].find(FIND_MY_STRUCTURES,{
            filter: { structureType: STRUCTURE_TOWER }
        });
        tower.sort((a,b)=>a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
        if (creep.memory.link==-10)
        {
        for (var name in lo)
        {
            if (lo[name].room.name==creep.memory.home.room.name)
            {
            creep.memory.link = lo[name];
            break;
            }
        }
        }
        else if (creep.memory.link!=undefined&&storage_!=undefined&&storage_.store.getFreeCapacity()>0&&Game.getObjectById(creep.memory.link.id).store.getUsedCapacity(RESOURCE_ENERGY)>0)
        transmode=true;
        if (creep.memory.done&&transmode)
        {
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)//收集
        {
            if (creep.memory.link!=undefined)
            {
                if (creep.withdraw(Game.getObjectById(creep.memory.link.id),RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(Game.getObjectById(creep.memory.link.id)),{ visualizePathStyle: { stroke: '#FFFF00'}};
                }
            }
        }
            else
            {
                for (var name in tower)
                {
                if (creep.memory.home.room.name==tower[name].room.name&&tower[name].store.getFreeCapacity(RESOURCE_ENERGY)>300)
        {
            if (tower[name].room.name==creep.memory.home.room.name&&creep.transfer(tower[name],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            {
            creep.moveTo(tower[name],{ visualizePathStyle: { stroke: '#FFFF00'}});
            break;
            }
            else if (creep.transfer(tower[name],RESOURCE_ENERGY)==OK)
            break;
        }
                else if(creep.transfer(storage_,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
                {
                creep.moveTo(storage_);
                break;
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
                    creep.moveTo(storage_),{ visualizePathStyle: { stroke: '#FFFF00'}};
                }
            }
            else if (creep.withdraw(s_c[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
            creep.moveTo(s_c[0]),{ visualizePathStyle: { stroke: '#FFFF00'}};
        }
        }
        else
        {
        if (Game.spawns[creep.memory.home.name].store.getFreeCapacity(RESOURCE_ENERGY)>150&&creep.memory.done)
        {
            creep.memory.goal=Game.spawns[creep.memory.home.name];
            creep.memory.done=false;
        }
        else if (struc!=undefined&&creep.memory.done)
        {
            creep.memory.goal = struc;
            creep.memory.done=false;
    }
    else if (creep.memory.done)
    {
        for (var name in tower)
        if (creep.memory.home.room.name==tower[name].room.name&&tower[name].store.getFreeCapacity(RESOURCE_ENERGY)>300)
        {
            creep.memory.goal = tower[name];
            creep.memory.done=false;
            break;
        }
    }
    if (creep.memory.goal!=undefined&&creep.memory.goal!=-10)
    {
        if (creep.transfer(Game.getObjectById(creep.memory.goal.id),creep.memory.goods)==ERR_NOT_IN_RANGE)
        creep.moveTo(Game.getObjectById(creep.memory.goal.id))
        else if (creep.transfer(Game.getObjectById(creep.memory.goal.id),creep.memory.goods)==OK)
        creep.memory.done = true;
    }
}
    }
}
};
module.exports = roleTransport_i;