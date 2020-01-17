var CNC=
{
    run:function(creep)
    {
        if (creep.memory.renewN)
        {
            creep.moveTo(Game.spawns[creep.memory.home.name],{visualizePathStyle: { stroke: '#0000FF'},reusePath: 5});
            Game.spawns[creep.memory.home.name].renewCreep(creep);
        }
        if (Game.spawns[creep.memory.home.name].store.getFreeCapacity(RESOURCE_ENERGY)>0&&creep.store.getUsedCapacity(RESOURCE_ENERGY)>0)
        {
            creep.transfer(Game.spawns[creep.memory.home.name],RESOURCE_ENERGY);
        }
        if (creep.ticksToLive>=1400) creep.memory.renewN=false;
         console.log(creep,'renewing at',creep.pos,'livetime now',creep.ticksToLive);
    }
};

module.exports = CNC;