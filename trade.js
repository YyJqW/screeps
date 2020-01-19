var trade=
{
    run:function(creep,tradegoods)
    {
        if (tradegoods!=-10)
        {
            if (creep.store.getFreeCapacity()>0)
            {
                if (creep.withdraw(Game.rooms[creep.memory.home.room.name].storage,creep.memory.goods)==ERR_NOT_IN_RANGE)
                {
                creep.moveTo(Game.rooms[creep.memory.home.room.name].storage,{reusePath: 5});
                creep.memory.goods=tradegoods;
                }
            }
            
            else if (creep.transfer(Game.rooms[creep.memory.home.room.name].terminal,creep.memory.goods)==ERR_NOT_IN_RANGE)
                creep.moveTo(Game.rooms[creep.memory.home.room.name].terminal,{reusePath: 5});
        }
    }
}

module.exports = trade;