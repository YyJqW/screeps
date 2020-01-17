var rOom = ['E22S39','E21S37'];
var CS = require('container sort');
var roleClaim =
{
    run: function(creep)
    {
     var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');   
        for (var name in claimer)
        {
            if (creep!=claimer[name]&&creep.memory.number==claimer[name].memory.number)
            {
                for (var name_ in claimer)
                {
                    claimer[name_].memory.number = name_;
                }
                break;
            }
        }
            if(Game.rooms[rOom[creep.memory.number]]!=undefined&&creep.reserveController(Game.rooms[rOom[creep.memory.number]].controller)==ERR_NOT_IN_RANGE)
            {
           creep.moveTo(Game.rooms[rOom[creep.memory.number]].controller, {visualizePathStyle: {stroke: '#F0F8FF'},reusePath: 5});
            }
    }
    };
module.exports = roleClaim;