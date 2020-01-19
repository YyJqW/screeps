var factory=
{
    run:function(creep,tradegoods)
    {
        if (tradegoods!=-10)
        {
            var Factory = creep.room.find(FIND_STRUCTURE,{
                filter:(stru)=>{
                    stru.stuctureType == STRUCTURE_FACTORY
                }
            });
            var warehouse = creep.room.find(FIND_STRUCTURE,{
                filter:(stru)=>{
                    stru.stuctureType == STRUCTURE_STORAGE ||
                    stru.stuctureType == STRUCTURE_TERMINAL&&
                    stru.store.getUsedCapacity(tradegoods)>0
                }
            });
            if (creep.store.getFreeCapacity()>0)
            {
                if (creep.withdraw(warehouse[0],creep.memory.goods)==ERR_NOT_IN_RANGE)
                {
                creep.moveTo(warehouse[0],{reusePath: 5});
                creep.memory.goods=tradegoods;
                }
            }
            
            else if (creep.transfer(Factory[0],creep.memory.goods)==ERR_NOT_IN_RANGE)
                creep.moveTo(Factory[0],{reusePath: 5});
        }
    }
}

module.exports = factory;