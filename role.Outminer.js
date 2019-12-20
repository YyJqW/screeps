var energylist = ['5bbcae3a9099fc012e6389a5','5bbcae399099fc012e63899f']
var energy_num = 2;
var roleOHar = {
    run: function (creep) {
        var constructionSite = creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES,3);
        var closestenergy = creep.pos.findInRange(FIND_SOURCES,1,
        {
            filter:(ener)=>ener.id!='5bbcae3a9099fc012e6389a2'
        });
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
        if (closestenergy[0]!=undefined)
        {
            creep.memory.target = closestenergy[0];
        }
        else
        {
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
        }
        if (creep.store.getFreeCapacity()>0)
        {
            if (creep.harvest(creep.memory.target)==ERR_NOT_IN_RANGE)
            creep.moveTo(creep.memory.target);
        }
        else if (container!=null)
        {
            if (container.hits<200000)
            creep.repair(container);
            else
            {
            if(creep.transfer(container,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            creep.moveTo(container);
            }
        }
        else if (container==null&&constructionSite[0]==undefined)
        {
            creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER);
        }
        else if (constructionSite[0]!=undefined)
        {
            creep.build(constructionSite[0]);
        }
    }
};
module.exports = roleOHar;