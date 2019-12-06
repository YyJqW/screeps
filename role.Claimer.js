var CS = require('container sort');
var roleClaim =
{
    run: function(creep)
    {
        var m_c = new Array();
        CS.run('miner_o',m_c);
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');
for (var name in claimer)
        {
            if(claimer[name].reserveController(Game.rooms[m_c[name].room.name].controller)==ERR_NOT_IN_RANGE)
            claimer[name].moveTo(Game.rooms[m_c[name].room.name].controller);
        }
    }
    };
module.exports = roleClaim;