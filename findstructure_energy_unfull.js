var CS = require('container sort');
var FS_unfull = {
    run: function (creep) {
        var extension = Game.spawns[creep.memory.home.name].room.find(FIND_STRUCTURES, {
            filter: (ex) => {
                return ex.structureType == STRUCTURE_EXTENSION &&
                    ex.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        });
        if (extension.length > 0) {
            return extension[0];
            }
        else
        {
            var targets = Game.spawns[creep.memory.home.name].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN||
                            structure.structureType == STRUCTURE_LAB)||
                            (structure.structureType == STRUCTURE_TERMINAL&&structure.store.getUsedCapacity(RESOURCE_ENERGY)<=200000) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        && structure.structureType != STRUCTURE_STORAGE
                }
            });
            return targets[0];
        }
    }
    };
    module.exports = FS_unfull;