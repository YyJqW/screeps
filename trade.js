var trade=
{
    run:function(creep,tradegoods)
    {
        if (tradegoods!=-10)
        {
            if (creep.store.getFreeCapacity()>0)
            {
                var warehouse = Game.rooms[creep.memory.home.room.name].find(FIND_MY_STRUCTURES,{
                    filter:(stru)=>
                        stru.structureType==STRUCTURE_STORAGE ||
                        stru.structureType==STRUCTURE_TERMINAL||
                        stru.structureType==STRUCTURE_FACTORY&&
                        stru.store.getUsedCapacity(tradegoods)>0
                    
                });
                creep.memory.goods=tradegoods;
                if (creep.withdraw(warehouse[0],creep.memory.goods)==ERR_NOT_IN_RANGE)
                {
                creep.moveTo(warehouse[0],{reusePath: 3});
                }
            }
            
            else if (creep.transfer(Game.rooms[creep.memory.home.room.name].terminal,creep.memory.goods)==ERR_NOT_IN_RANGE)
                creep.moveTo(Game.rooms[creep.memory.home.room.name].terminal,{reusePath: 3});
            else if(creep.transfer(Game.rooms[creep.memory.home.room.name].terminal,creep.memory.goods)==OK)
            creep.memory.func = false;
        }
    }
}

module.exports = trade;