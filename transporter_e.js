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
            creep.memory.done = false;
            if (dropped_source!=null&&dropped_source.amount>=500&&creep.pickup(dropped_source)==ERR_NOT_IN_RANGE){
                creep.memory.goods=dropped_source.resourceType;
            creep.moveTo(dropped_source, {visualizePathStyle: {stroke: '#FFD700'}});
            }
           else if (creep.withdraw(m_c[check],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
            creep.moveTo(m_c[check]),{ visualizePathStyle: { stroke: '#FFD700'}};
        }
    }
}
        else if (tower[0]!=undefined&&creep.memory.goods==RESOURCE_ENERGY&&tower[0].room.name==creep.room.name)
        {
            if (creep.transfer(tower[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            creep.moveTo(tower[0],{ visualizePathStyle: { stroke: '#FFD700'}});
            else if (creep.transfer(tower[0],RESOURCE_ENERGY)==OK)
            creep.memory.done = true;
        }
        else if (creep.room.storage!=undefined)
        {
            if (creep.room.storage.store.getFreeCapacity()>0&&creep.transfer(creep.room.storage,creep.memory.goods)==ERR_NOT_IN_RANGE)
            creep.moveTo(creep.room.storage);
            else if (creep.transfer(creep.room.storage,creep.memory.goods)==OK)
            creep.memory.done = true;
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
            else if (creep.transfer(s_c[name],creep.memory.goods)==OK)
            {
                creep.memory.done = true;
                break;
            }
            }
        }
    }
};
module.exports = roleTransport;