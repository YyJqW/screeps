var CS = require('container sort');
var roleTransport ={
    run :function(creep,s_c){
        var check=0;
        var busy = false;
        var tower = new Array();
        tower = Game.rooms[creep.memory.home.room.name].find(FIND_MY_STRUCTURES,{
            filter: { structureType: STRUCTURE_TOWER }
        });
        tower.sort((a,b)=>a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
        var m_c=new Array()
        CS.run('miner_unlinked',m_c);
        var dropped_source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport');
        if(creep.store.getUsedCapacity() == 0)//收集
        {
            if (m_c[0]!=null)
            {
            check=0;
            creep.memory.goods = RESOURCE_ENERGY;
            for (var name in m_c)
            {
                for (var name_ in transporter)
                {
                if (creep != transporter[name_])
                {
                if (transporter[name_].memory.target == m_c[name].id&&check<m_c.length-1) {check++; busy=true;break}
                else busy=false;
                }
                }
                if (!busy) break
            }
            creep.memory.target = m_c[check].id;
            if (dropped_source!=null&&dropped_source.amount>=500&&creep.pickup(dropped_source)==ERR_NOT_IN_RANGE){
                creep.memory.goods=dropped_source.resourceType;
            creep.moveTo(dropped_source, {visualizePathStyle: {stroke: '#FFD700'}});
            }
           else if (creep.withdraw(m_c[check],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
            creep.moveTo(m_c[check]),{ visualizePathStyle: { stroke: '#FFD700'}};
        }
    }
}
        else if (creep.memory.done&&tower[0]!=undefined&&creep.memory.goods==RESOURCE_ENERGY&&tower[0].store.getUsedCapacity()<300)
        {
            creep.memory.goal = tower[0];
            creep.memory.done = false;
        }
        else if (creep.room.storage!=undefined&&creep.memory.done)
        {
            if (creep.room.storage.store.getFreeCapacity()>0)
            creep.memory.goal=creep.room.storage;
            creep.memory.done = false;
        }
        else if (creep.memory.done)
        {
            s_c.sort((a,b)=>a.store.getUsedCapacity(creep.memory.goods)-b.store.getUsedCapacity(creep.memory.goods));
                if(s_c[0].store.getFreeCapacity(creep.memory.goods)>0) //运输到仓库
            {
               creep.memory.goal = s_c[0];
               creep.memory.done = false;
            }
        }
        if (creep.memory.goal==-10)
        {
        creep.memory.goal = Game.getObjectById(creep.memory.goal.id);
        if (creep.memory.goal!=null&&creep.memory.goal.store.getFreeCapacity()==0)
        creep.memory.done = true;
        }
        if (!creep.memory.done&&creep.memory.goal!=undefined&&creep.memory.goal!=-10)
    {
        if (creep.transfer(Game.getObjectById(creep.memory.goal.id),creep.memory.goods)==ERR_NOT_IN_RANGE)
        creep.moveTo(Game.getObjectById(creep.memory.goal.id));
        else if (creep.transfer(Game.getObjectById(creep.memory.goal.id),creep.memory.goods)==OK)
        creep.memory.done = true;
    }
    }
};
module.exports = roleTransport;