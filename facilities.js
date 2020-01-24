var facilities=
{
    run:function(creep,tradegoods,factorygoods,goodsnum_t,goodsnum_f,production)
    {
        var warehouse = Game.rooms[creep.memory.home.room.name].find(FIND_MY_STRUCTURES,{
            filter:(stru)=>
                (stru.structureType==STRUCTURE_STORAGE ||
                stru.structureType==STRUCTURE_TERMINAL||
                stru.structureType==STRUCTURE_FACTORY)&&
                stru.store.getUsedCapacity(tradegoods)>0
            
        });
        var Factory = Game.rooms[creep.memory.home.room.name].find(FIND_MY_STRUCTURES,{
            filter: { structureType: STRUCTURE_FACTORY }
        });
        if (warehouse[0]!=undefined&&creep.memory.done&&warehouse[0].store.getUsedCapacity(tradegoods)>0&&Game.rooms[creep.memory.home.room.name].terminal.store.getUsedCapacity(tradegoods)<goodsnum_t||creep.store.getUsedCapacity(tradegoods)>0)
        creep.memory.trade = true;
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY)>0||Game.rooms[creep.memory.home.room.name].terminal.store.getUsedCapacity(tradegoods)>=goodsnum_t||Game.rooms[creep.memory.home.room.name].terminal.store.getFreeCapacity()==0)
        creep.memory.trade = false;
        if (creep.store.getUsedCapacity(tradegoods)>0)
        creep.memory.trade = true;
        if (Factory[0]!=undefined)
        {
        if (creep.memory.done&&Game.rooms[creep.memory.home.room.name].storage.store.getUsedCapacity(factorygoods)>0&&Factory[0].store.getUsedCapacity(factorygoods)<goodsnum_f||creep.store.getUsedCapacity(tradegoods)>0)
        creep.memory.factory = true;
        if (Factory[0].store.getUsedCapacity(production)+Factory[0].store.getUsedCapacity(factorygoods)>=goodsnum_f||creep.store.getUsedCapacity(RESOURCE_ENERGY)>0||Factory[0].store.getUsedCapacity(factorygoods)>=goodsnum_f||Factory[0].store.getFreeCapacity()==0)
        creep.memory.factory = false;
        if (creep.store.getUsedCapacity(factorygoods)>0)
        creep.memory.factory = true;
        }
    }
};
module.exports = facilities;