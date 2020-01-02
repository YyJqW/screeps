var important_target = [];
var myrooms = ['E22S38','E21S38','E23S39','E22S37','E22S36','E22S39','E21S37'];
var fcontainerID = '5dfc508bd705e4988589d3af';
var roleUp = require('role.Up');
var CS = require('container sort');
var roleBuild =
{
    run: function(creep)
    {
        var fcontainer = Game.getObjectById(fcontainerID);
        var storage_ = creep.room.storage;
        var s_c = new Array();
        CS.run('storage',s_c);
        s_c.sort((a,b)=> b.store.getUsedCapacity(RESOURCE_ENERGY)/b.store.getCapacity() - a.store.getUsedCapacity(RESOURCE_ENERGY)/a.store.getCapacity());
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧');
        }
	    if(creep.memory.building) {
            if (important_target.length > 0)
            {
                    for (var name in important_target)
                {
            if(creep.build(Game.getObjectById(important_target[name])) == ERR_INVALID_TARGET)
            continue;
            else 
            {
            if(creep.build(Game.getObjectById(important_target[name])) == ERR_NOT_IN_RANGE)
            creep.moveTo(Game.getObjectById(important_target[name]), {visualizePathStyle: {stroke: '#ffffff'}});
            break;
            }
        }
            }
            else
            {
                var targets = new Array();
            for (var name in myrooms)
            {
                if(Game.rooms[myrooms[name]]!=undefined)
                {
                for (var name_ in Game.rooms[myrooms[name]].find(FIND_MY_CONSTRUCTION_SITES))
                {
            targets.push(Game.rooms[myrooms[name]].find(FIND_MY_CONSTRUCTION_SITES)[name_]);
                }
            }
            }
             if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else roleUp.run(creep);
        }
    }
	    else if(creep.store.getFreeCapacity() > 0){
	        if (storage_!=undefined&&storage_.store.getUsedCapacity(RESOURCE_ENERGY))
	        {
	            if(creep.withdraw(storage_,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)   {
                      creep.moveTo(storage_, {visualizePathStyle: {stroke: '#ffaa00'}});//采矿
                   }
	        }
	        else if (fcontainer!=undefined&&fcontainer.store.getUsedCapacity(RESOURCE_ENERGY)>400)
	        {
	            if(creep.withdraw(fcontainer,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)   {
                      creep.moveTo(fcontainer, {visualizePathStyle: {stroke: '#ffaa00'}});//采矿
                   }
                }

                else if(s_c[0].store.getUsedCapacity(RESOURCE_ENERGY)>0){
                   if(creep.withdraw(s_c[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)   {
                      creep.moveTo(s_c[0], {visualizePathStyle: {stroke: '#ffaa00'}});//采矿
                   }
                }
            }
    }
};

module.exports = roleBuild;