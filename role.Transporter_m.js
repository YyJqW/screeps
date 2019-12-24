var CS = require('container sort');
var roleTransport_m ={
    run :function(creep){
        var check=0;
        var busy = false;
        var s_c=new Array()
        CS.run('storage',s_c);
        var mine_c=new Array();
        CS.run('mineral',mine_c);
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport');
        mine_c.sort((a,b) => b.store.getUsedCapacity() - a.store.getUsedCapacity());
        if(creep.store.getUsedCapacity() == 0)//收集
        {
            if (mine_c[0].store.getUsedCapacity()>600)
            {
                check=0;
                for (var name in mine_c)
            {
                for (var name_ in transporter)
                {
                if (creep != transporter[name_])
                {
                if (transporter[name_].memory.target == mine_c[name].id&&check<mine_c.length-1) {check++; busy=true;break}
                else busy=false;
                }
                }
                if (!busy) break
            }
            creep.memory.target = mine_c[check].id;
            creep.memory.goods = mine_c[check].pos.findClosestByRange(FIND_MINERALS).mineralType;
            if (creep.withdraw(mine_c[check],creep.memory.goods)==ERR_NOT_IN_RANGE){
                creep.moveTo(mine_c[check]),{ visualizePathStyle: { stroke: '#FFD700'}};
            }
        }
}
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