var minerals_id = ['5bbcb39340062e4259e944fb','5bbcb5c3d867df5e5420719d','5bbcb5ced867df5e5420720a'];
var roleMine = {
    run : function(creep)
    {
        var busy,goToclosest;
        var closestmineral = creep.pos.findClosestByRange(FIND_MINERALS);
        var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'mine');
        if (closestmineral!=null) goToclosest=true;
        for (var name in miner)
        {
            if (closestmineral==miner[name].memory.target&&miner[name]!=creep) goToclosest = false;
        }
        if (goToclosest)
        {
            creep.memory.target = closestmineral.id;
        }
        else
        {
        for (var i = 0; i <= minerals_id.length-1;i++) {
            busy = false;
            for (var name_creeps in miner) {
                _creeps = miner[name_creeps];
                if (_creeps.memory.target==minerals_id[i]&&creep!=_creeps){
                    busy = true;
                    break;
                }
            }
            if (!busy) 
            {
                creep.memory.target = minerals_id[i];
                break;
            }
        }
    }
        var target = Game.getObjectById(creep.memory.target);
        creep.memory.mineraltype = target.mineralType;
        if (creep.store.getFreeCapacity() > 0)
        {
        if (creep.harvest(target)==ERR_NOT_IN_RANGE)
        {
            creep.moveTo(target,{ visualizePathStyle: { stroke: '#FFFFFF'}});
        }
    }
    else
    {
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES,
            {
                filter:(struc) => struc.structureType == STRUCTURE_CONTAINER
            });
        if(creep.transfer(container,creep.memory.mineraltype)==ERR_NOT_IN_RANGE)
        {
            creep.moveTo(container,{ visualizePathStyle: { stroke: '#FFFFFF'}});
        }
    }
    }
};
module.exports = roleMine;