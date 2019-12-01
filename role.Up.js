var CS = require('container sort');
var link_i = ['5dd0e224e74e66dd77a89cf7','5dd3bd5895d1893d2752a6b5'];
var roleUp = {
    run: function(creep) {
        var storage_ = Game.rooms[creep.memory.home.room.name].storage;
        var target_link=-1;
        var s_c = new Array();
        CS.run('storage',s_c);
        var li = new Array();
        var storage_ = Game.rooms[creep.memory.home.room.name].storage;
        for (var name in link_i)
        {
        li[name]=Game.getObjectById(link_i[name]);
        }
        s_c.sort((a,b)=>b.store.getUsedCapacity(RESOURCE_ENERGY)-a.store.getUsedCapacity(RESOURCE_ENERGY));
	    if(creep.store.getUsedCapacity(RESOURCE_ENERGY)>0) {
            if(creep.upgradeController(Game.rooms[creep.memory.home.room.name].controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[creep.memory.home.room.name].controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
                for(var name in li)
                {
                if(li[name].room.name==creep.memory.home.room.name&&li[name].store.getUsedCapacity(RESOURCE_ENERGY)>0){
                    target_link=name;
                      break;
                }
                }
                if (target_link!=-1)
                {
                    if(creep.withdraw(li[target_link],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)   {
                      creep.moveTo(li[target_link], {visualizePathStyle: {stroke: '#ffaa00'}});//采矿
                    }
                }
                else
                {
                    s_c.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY)/b.store.getCapacity(RESOURCE_ENERGY)*100 - a.store.getUsedCapacity(RESOURCE_ENERGY)/a.store.getCapacity(RESOURCE_ENERGY)*100);
            if (storage_!=undefined)
            {
            if (storage_.store.getUsedCapacity(RESOURCE_ENERGY)>0)
            {
                if (creep.withdraw(storage_,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(storage_),{ visualizePathStyle: { stroke: '#FFFF00'}};
                }
            }
        }
            else if (creep.withdraw(s_c[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
            creep.moveTo(s_c[0]),{ visualizePathStyle: { stroke: '#FFFF00'}};
        }
                }
            }
        }
};

module.exports = roleUp;