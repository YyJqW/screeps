var roleTransport_m ={
    run :function(creep,s_c){
        var mineral=Game.spawns[creep.memory.home.name].room.find(FIND_MINERALS);
        var mine_c=mineral[0].pos.findInRange(FIND_STRUCTURES,3,{
            filter:(contai)=>contai.structureType==STRUCTURE_CONTAINER
        });
        if(creep.store.getUsedCapacity() == 0)//收集
        {
            creep.memory.goods = mineral[0].mineralType;
            if (mine_c[0]!=undefined)
            creep.memory.target=mine_c[0].id;
            if (creep.withdraw(Game.getObjectById(creep.memory.target),creep.memory.goods)==ERR_NOT_IN_RANGE){
                creep.moveTo(Game.getObjectById(creep.memory.target),{ visualizePathStyle: { stroke: '#FFD700'}});
            }
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
    }
};
module.exports = roleTransport_m;