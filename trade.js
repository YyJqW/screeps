var CS = require('container sort');
var trade=
{
    run:function(creep,tradegoods,goodsnum)
    {
        var s_c=new Array()
        CS.run('storage',s_c);
        if (tradegoods!=-10)
        {
            var warehouse=-10;
            for (var name in s_c)
            {
                if (s_c[name].store.getUsedCapacity(tradegoods)>0)
                warehouse = s_c[name];
            }
            creep.memory.goods=tradegoods;
            if (Game.rooms[creep.memory.home.room.name].terminal.store.getUsedCapacity(tradegoods)<goodsnum)
            {
                if (creep.transfer(Game.rooms[creep.memory.home.room.name].terminal,creep.memory.goods)==ERR_NOT_IN_RANGE)
                creep.moveTo(Game.rooms[creep.memory.home.room.name].terminal);
            }
        }
    }
}

module.exports = trade;