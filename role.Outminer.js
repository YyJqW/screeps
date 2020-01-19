var energylist = ['5bbcae3a9099fc012e6389a5','5bbcae2b9099fc012e638815','5bbcae2b9099fc012e638813']
var roleOHar = {
    run: function (creep) {
        var constructionSite_ = creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES,3);
        var closestenergy = creep.pos.findInRange(FIND_SOURCES,1,
        {
            filter:(ener)=>ener.id!='5bbcae3a9099fc012e6389a2'
            &&ener.id!='5bbcae2b9099fc012e638818'
        });
        var road = creep.pos.findInRange(FIND_STRUCTURES,1,{
            filter:(roa)=>roa.structureType == STRUCTURE_ROAD
        });
        road.sort((a,b)=>a.hits-b.hits);
        var droppedenergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES,1);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'O_Har');
        var container = creep.pos.findInRange(FIND_STRUCTURES,2,{
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
                for (var i = 0; i < energylist.length;i++) {
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
            creep.moveTo(creep.memory.target,{ visualizePathStyle: { stroke: '#FFFFFF'},reusePath: 10});
        }
        else if (constructionSite_[0]!=undefined)
        {
            creep.build(constructionSite_[0]);
        }
        else if (container[0]!=undefined)
        {
            container.sort((a,b)=>a.hits-b.hits);
            if (container[0].hits<container[0].hitsMax)
            creep.repair(container[0]);
            else
            {
            container.sort((a,b)=>a.store.getUsedCapacity(RESOURCE_ENERGY)-b.store.getUsedCapacity(RESOURCE_ENERGY));
            if(creep.transfer(container[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            creep.moveTo(container[0],{ visualizePathStyle: { stroke: '#FFFFFF'},reusePath: 10});
            }
        }
        if (road[0]!=undefined&&road[0].hits<road[0].hitsMax)
        {
            creep.repair(road[0]);
        }
    }
};
module.exports = roleOHar;