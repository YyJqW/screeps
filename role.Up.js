var roleUp = {
    run: function(creep,li,s_c) {
        var storage_ = Game.rooms[creep.memory.home.room.name].storage;
        var target_link=-1;
        var storage_ = Game.rooms[creep.memory.home.room.name].storage;
        s_c.sort((a,b)=>b.store.getUsedCapacity(RESOURCE_ENERGY)-a.store.getUsedCapacity(RESOURCE_ENERGY));
	    if(creep.store.getUsedCapacity(RESOURCE_ENERGY)>0) {
            if(creep.upgradeController(Game.rooms[creep.memory.home.room.name].controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[creep.memory.home.room.name].controller, {visualizePathStyle: {stroke: '#ffffff'},reusePath: 5});
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
                      creep.moveTo(li[target_link], {visualizePathStyle: {stroke: '#ffaa00'},reusePath: 5});//采矿
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
                    creep.moveTo(storage_,{ visualizePathStyle: { stroke: '#FFFF00'},reusePath: 5});
                }
            }
        }
            else if (creep.withdraw(s_c[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
            creep.moveTo(s_c[0],{ visualizePathStyle: { stroke: '#FFFF00'},reusePath: 5});
        }
                }
            }
        }
};

module.exports = roleUp;