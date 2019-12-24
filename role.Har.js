var CS = require('container sort');
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
            contain.id != '5df24a34037b1fc5109d2b6a'&&
            contain.id != '5dff720848a65b48b22232ed'&&
            contain.id != '5e02345fa988a364c5264adf'&&
            contain.id != '5dfc508bd705e4988589d3af'&&
            contain.id != '5e0231fce62e838c478a1c03'&&
            contain.id != '5e0220beea8896ea197e535c'&&
            contain.id != '5dde676abca74326c19ee604'
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
                creep.memory.container = closestcontainer;
        if (creep.pos.x!=closestcontainer.pos.x||creep.pos.y!=closestcontainer.pos.y)
        creep.moveTo(closestcontainer,{ visualizePathStyle: { stroke: '#FFFFFF'}});
        else {
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            creep.harvest(sources);
        }
        }
        else
        {
                for (var i = 0; i < container.length;i++) {
            busy = false;
            for (var name in harvesters) {
                if (harvesters[name].memory.container!=-10&&harvesters[name].memory.container.id == container[i].id&&harvesters[name]!=creep){
                    busy = true;
                    break;
                }
            }
            if (!busy) 
            {
                target = i;
                creep.memory.container = container[target];
                break;
            }
        }
        }
        var Contain = Game.getObjectById(creep.memory.container.id);
        if (creep.pos.x != Contain.pos.x||creep.pos.y != Contain.pos.y) {
            creep.moveTo(Contain, {
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
};
module.exports = roleHar;