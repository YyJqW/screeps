var facilities=
{
    run:function(creep,tradegoods,factorygoods,goodsnum_t,goodsnum_f)
    {
        var Factory = creep.room.find(FIND_STRUCTURE,{
            filter:(stru)=>{
                stru.stuctureType == STRUCTURE_FACTORY
            }
        });
        if (creep.memory.done&&Game.rooms[creep.memory.home.room.name].storage.store.getUsedCapacity(tradegoods)>0&&Game.rooms[creep.memory.home.room.name].terminal.store.getUsedCapacity(tradegoods)<goodsnum_t||creep.store.getUsedCapacity(tradegoods)>0)
        creep.memory.trade = true;
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY)>0||Game.rooms[creep.memory.home.room.name].terminal.store.getUsedCapacity(tradegoods)>=goodsnum||Game.rooms[creep.memory.home.room.name].terminal.store.getFreeCapacity()==0)
        creep.memory.trade = false;
        if (creep.store.getUsedCapacity(tradegoods)>0)
        creep.memory.trade = true;
        if (creep.memory.done&&Game.rooms[creep.memory.home.room.name].storage.store.getUsedCapacity(factorygoods)>0&&Game.rooms[creep.memory.home.room.name].terminal.store.getUsedCapacity(factorygoods)<goodsnum_f||creep.store.getUsedCapacity(tradegoods)>0)
        creep.memory.factory = true;
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY)>0||Factory.store.getUsedCapacity(factorygoods)>=goodsnum_f||Factory.store.getFreeCapacity()==0)
        creep.memory.factory = false;
        if (creep.store.getUsedCapacity(factorygoods)>0)
        creep.memory.factory = true;
    }
};
module.exports = facilities;