var CS = require('container sort');
var trade=
{
    run:function(creep,tradegoods)
    {
        var s_c=new Array()
        CS.run('storage',s_c);
        if (tradegoods!=-10)
        {
            var warehouse=-10;
            for (var name in s_c)
            {
                if (s_c[name].store.getUsedCapacity(tradegoods)>0)
                {
                    warehouse = s_c[name];
                    break;
                }
            }
            creep.memory.goods=tradegoods;
            if (creep.store.getFreeCapacity()>0)
            {
                if (creep.withdraw(Game.rooms[creep.memory.home.room.name].storage,creep.memory.goods)==ERR_NOT_IN_RANGE)
                creep.moveTo(Game.rooms[creep.memory.home.room.name].storage,{reusePath: 5});
            }
            
            else if (creep.transfer(Game.rooms[creep.memory.home.room.name].terminal,creep.memory.goods)==ERR_NOT_IN_RANGE)
                creep.moveTo(Game.rooms[creep.memory.home.room.name].terminal,{reusePath: 5});
        }
    }
}

module.exports = trade;