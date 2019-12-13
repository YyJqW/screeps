var CS = require('container sort');
var container_energy_num = 4;
var roleHar = {
    run: function (creep) {
        var link = creep.pos.findInRange(FIND_STRUCTURES,1,{
            filter:(struc)=>struc.structureType == STRUCTURE_LINK
        });
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Har');
        var container = new Array();
        var target;
        var check = true;
        CS.run('miner',container);
        var closestcontainer = creep.pos.findClosestByRange(FIND_STRUCTURES,{
            filter:(contain)=> contain.structureType == STRUCTURE_CONTAINER&&
            contain.id != '5dea6515e52fa56b99d3cae9'&&
            contain.id != '5df24a34037b1fc5109d2b6a'
        });
        for (var name in harvesters)
        {
        if (closestcontainer==null)
        check =false;
        else if (closestcontainer.pos.x==harvesters[name].pos.x&&closestcontainer.pos.y==harvesters[name].pos.y&&creep!=harvesters[name])
        check =false;
        }
        if (check)
        {
        if (creep.pos.x!=closestcontainer.pos.x||creep.pos.y!=closestcontainer.pos.y)
        creep.moveTo(closestcontainer);
        else {
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            creep.harvest(sources);
        }
        }
        else
        {
                for (var i = 0; i < container_energy_num;i++) {
            busy = false;
            for (var name in harvesters) {
                if (harvesters[name].pos.x == container[i].pos.x&&harvesters[name].pos.y == container[i].pos.y&&harvesters[name]!=creep){
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
        creep.memory.container = container[target];
        if (creep.pos.x != container[target].pos.x||creep.pos.y != container[target].pos.y) {
            creep.moveTo(container[target], {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            }); //前往箱子
        } 
        else if(creep.store.getFreeCapacity()>0)
            {
                if (creep.memory.container.store.getUsedCapacity()>0)
                {
                creep.withdraw(creep.memory.container,RESOURCE_ENERGY);
                }
                else
                {
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            creep.harvest(sources);
                }
        }
        else if (link[0]!=undefined)
        {
            creep.transfer(link[0],RESOURCE_ENERGY);
        }
    }
    }
};
module.exports = roleHar;