var CNC=
{
    run:function(creep)
    {
        if (creep.memory.renewN)
        {
            creep.moveTo(creep.memory.home);
            creep.memory.home.renewCreep(creep);
        }
        if (creep.ticksToLive>=1500||creep.memory.home.store.getUsedCapacity(RESOURCE_ENERGY)==0) creep.memory.renewN=false;
    }
};

module.exports = CNC;