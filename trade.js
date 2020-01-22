var trade=
{
    run:function(creep,tradegoods)
    {
        if (tradegoods!=-10)
        {
            if (creep.store.getFreeCapacity()>0)
            {
                creep.memory.goods=tradegoods;
                if (creep.withdraw(Game.rooms[creep.memory.home.room.name].storage,creep.memory.goods)==ERR_NOT_IN_RANGE)
                {
                creep.moveTo(Game.rooms[creep.memory.home.room.name].storage,{reusePath: 10});
                }
            }
            
            else if (creep.transfer(Game.rooms[creep.memory.home.room.name].terminal,creep.memory.goods)==ERR_NOT_IN_RANGE)
                creep.moveTo(Game.rooms[creep.memory.home.room.name].terminal,{reusePath: 10});
            else if(creep.transfer(Game.rooms[creep.memory.home.room.name].terminal,creep.memory.goods)==OK)
            creep.memory.func = false;
        }
    }
}

module.exports = trade;