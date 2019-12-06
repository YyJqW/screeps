var energylist = ['']
var energy_num = 1;
var roleOHar = {
    run: function (creep) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'O_Har');
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES,{
            filter:(contain)=> contain.structureType == STRUCTURE_CONTAINER
        });
        var energy = new Array();
        for (var name in energylist)
        {
            energy[name]=Game.getObjectById(energylist[name])
        }
        var target;
                for (var i = 0; i < energy_num;i++) {
            busy = false;
            for (var name in harvesters) {
                if (harvesters[name].memory.target==energy[i]&&harvesters[name]!=creep){
                    busy = true;
                    break;
                }
            }
            if (!busy) 
            {
                target = i;
                break;
            }
        }
        creep.memory.target = energy[target];
        if (creep.store.getFreeCapacity()>0)
        {
            if (creep.harvest(creep.memory.target)==ERR_NOT_IN_RANGE)
            creep.moveTo(creep.memory.target);
        }
        else
        {
            if (container.hits<200000)
            creep.repair(container);
            else
            creep.transfer(container);
        }
    }
};
module.exports = roleOHar;