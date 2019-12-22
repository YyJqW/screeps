var CS = require('container sort');
var roleTransport_o ={
    run :function(creep){
                var road = creep.pos.findInRange(FIND_STRUCTURES,1,{
            filter:(road)=>road.structureType == STRUCTURE_ROAD
        });
        var check=0;
        var busy = false;
        var tower = new Array();
        tower = creep.room.find(FIND_MY_STRUCTURES,{
            filter: { structureType: STRUCTURE_TOWER }
        });
        tower.sort((a,b)=>a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
        var m_c=new Array()
        CS.run('miner_o',m_c);
        var s_c=new Array()
        CS.run('storage',s_c);
        var dropped_source = creep.pos.findInRange(FIND_DROPPED_RESOURCES,2);
        s_c.sort((a,b)=>a.store.getUsedCapacity(RESOURCE_ENERGY)-b.store.getUsedCapacity(RESOURCE_ENERGY));
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport_o');
        console.log(creep,'at',creep.pos);
        if(creep.store.getUsedCapacity() == 0)//收集
        {
            check=0;
            creep.memory.goods = RESOURCE_ENERGY;
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
        else if (tower[0]!=undefined&&creep.memory.goods==RESOURCE_ENERGY&&tower[0].room.name==creep.room.name&&tower[0].store.getFreeCapacity(RESOURCE_ENERGY)>=500)
        {
            if (creep.transfer(tower[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            creep.moveTo(tower[0],{ visualizePathStyle: { stroke: '#FFD700'}});
        }
        else if (creep.room.storage!=undefined)
        {
            if (creep.room.storage.store.getFreeCapacity(creep.memory.goods)>0&&creep.transfer(creep.room.storage,creep.memory.goods)==ERR_NOT_IN_RANGE)
            creep.moveTo(creep.room.storage,{ visualizePathStyle: { stroke: '#FFD700'}});
        }
        else 
        {
            for (var name in s_c)
            {
                if(s_c[name].store.getFreeCapacity(creep.memory.goods)>0&&creep.transfer(s_c[name],creep.memory.goods)==ERR_NOT_IN_RANGE) //运输到仓库
            {
                creep.moveTo(s_c[name],{ visualizePathStyle: { stroke: '#FFD700'}});
                break;
            }//待修改
            }
        }
        if (road[0]!=undefined&&road[0].hits<road[0].hitsMax)
        {
            creep.repair(road[0]);
        }
    }
};
module.exports = roleTransport_o;