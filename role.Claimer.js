var rOom = ['E22S39'];
var CS = require('container sort');
var roleClaim =
{
    run: function(creep)
    {
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');
for (var name in claimer)
        {
            if(claimer[name].reserveController(Game.rooms[rOom[name]].controller)==ERR_NOT_IN_RANGE)
            claimer[name].moveTo(Game.rooms[rOom[name]].controller);
        }
    }
    };
module.exports = roleClaim;