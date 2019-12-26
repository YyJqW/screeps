var CS = require('container sort');
var roleTransport_o ={
    run :function(creep){
                var road = creep.pos.findInRange(FIND_STRUCTURES,2,{
            filter:(road)=>road.structureType == STRUCTURE_ROAD
        });
        road.sort((a,b)=>a.hits-b.hits);
        var check=0;
        var busy = false;
        var m_c=new Array()
        CS.run('miner_o',m_c);
        var s_c=new Array()
        CS.run('storage',s_c);
        var dropped_source = creep.pos.findInRange(FIND_DROPPED_RESOURCES,2);
        s_c.sort((a,b)=>a.store.getUsedCapacity(RESOURCE_ENERGY)-b.store.getUsedCapacity(RESOURCE_ENERGY));
        m_c.sort((a,b)=>b.store.getUsedCapacity(RESOURCE_ENERGY)-a.store.getUsedCapacity(RESOURCE_ENERGY));
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_o');
        creep.memory.goods = RESOURCE_ENERGY;
        console.log(creep,'at',creep.pos);
        if(creep.store.getUsedCapacity() == 0)//收集
        {
            check=0;
            for (var name in m_c)
            {
                if (m_c[name]!=null)
                {
                for (var name_ in transporter)
                {
                if (creep != transporter[name_])
                {
                if (transporter[name_].memory.target == m_c[name].id&&check<m_c.length-1) { busy=true;break;}
                else busy=false;
                }
                }
                if (!busy) {check=name;break;}
                }
            }
            creep.memory.target = m_c[check].id;
            if (dropped_source[0]!=undefined&&dropped_source[0].amount>=1000){
                creep.memory.goods=dropped_source.resourceType;
            if (creep.pickup(dropped_source[0])==ERR_NOT_IN_RANGE)
            creep.moveTo(dropped_source[0], {visualizePathStyle: {stroke: '#FFD700'}});
            }
           else if (creep.withdraw(m_c[check],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
            creep.moveTo(m_c[check],{visualizePathStyle: { stroke: '#0000FF'}});
    }
}
        else if (creep.room.storage!=undefined&&creep.room.storage.store.getFreeCapacity()>0)
        {
            if(creep.memory.done)
            {
            creep.memory.backgoal = creep.room.storage;
            creep.memory.done=false;
            }
            var st = Game.getObjectById(creep.memory.backgoal.id);
            if (creep.room.storage.store.getFreeCapacity(creep.memory.goods)>0&&creep.transfer(st,creep.memory.goods)==ERR_NOT_IN_RANGE)
            creep.moveTo(st,{ visualizePathStyle: { stroke: '#FFD700'}});
            else if (creep.transfer(st,creep.memory.goods)==OK)
            creep.memory.done=true;
        }
        else 
        {
            if (creep.memory.backgoal!=undefined&&Game.getObjectById(creep.memory.backgoal.id).store.getFreeCapacity()==0)
        creep.memory.done = true;
            if (creep.memory.done)
            {
            creep.memory.backgoal = s_c[0];
            creep.memory.done=false;
            }
            var sc = Game.getObjectById(creep.memory.backgoal.id);
                if(creep.transfer(sc,creep.memory.goods)==ERR_NOT_IN_RANGE) //运输到仓库
            {
                creep.moveTo(sc,{ visualizePathStyle: { stroke: '#FFD700'}});
            }//待修改
            else if (creep.transfer(sc,creep.memory.goods)==OK)
            creep.memory.done=true;
        }
        if (road[0]!=undefined&&road[0].hits<road[0].hitsMax)
        {
            creep.repair(road[0]);
        }
    }
};
module.exports = roleTransport_o;