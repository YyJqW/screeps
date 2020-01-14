var CS = require('container sort');
var roleHar = {
    run: function (creep,container) {
        var link = creep.pos.findInRange(FIND_STRUCTURES,1,{
            filter:(struc)=>struc.structureType == STRUCTURE_LINK
        });
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Har');
        var target;
        var check = true;
        var closestcontainer = creep.pos.findClosestByRange(FIND_STRUCTURES,{
            filter:(contain)=> contain.structureType == STRUCTURE_CONTAINER&&
            contain.id != '5e1c41b3e697d7cd6e84d219'&&
            contain.id != '5e1dbba591e04f4abb4789a4'&&
            contain.id != '5e1c7a406e043f57ee973c3b'&&
            contain.id != '5e1c705443eed46a66b8adb0'&&
            contain.id != '5e1c73b026765a75f9204a66'&&
            contain.id != '5e1c460e1aeb2b9c99814321'&&
            contain.id != '5e1c5c4d9e776e58c4def4ef'&&
            contain.id != '5e0da23fd2e4535720b38c7f'&&
            contain.id != '5e0dd2d0864eb4b36c18214d'&&
            contain.id != '5e0ecd6d75a77b686d4e8e68'&&
            contain.id != '5e0ee3791b057b3f56e73b82'&&
            contain.id != '5df1d6e37cdbdb534abff006'&&
            contain.id != '5dde676abca74326c19ee604'&&
            contain.id != '5dde4a3d26efdb785b8cef38'&&
            contain.id != '5e1ddf5a2d333a9a7e742658'&&
            contain.id != '5e0ef23fd8f1f2c24b5d3aed'
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