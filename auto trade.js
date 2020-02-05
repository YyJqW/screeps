var AT=
{
    run:function(spawn,tradegoods_AT,Price)
    {
        var order = Game.market.getAllOrders(o=>o.type==ORDER_BUY&&
            o.resourceType==tradegoods_AT&&
            o.price>=Price&&
            o.amount>0);
        if (order[0]!=undefined)
        {
            var terminal = spawn.room.terminal;
            if (terminal.store.getUsedCapacity(tradegoods_AT)>=order[0].amount&&terminal.cooldown==0)
            {
            Game.market.deal(order[0].id,order[0].amount,spawn.room.name);
            }
        }
    }
};

module.exports = AT;