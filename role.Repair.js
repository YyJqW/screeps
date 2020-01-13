var CS = require('container sort');
var roleRepair = {
    run: function (tower,m_c) {
        var check_1 = false;
        for (var name in m_c) {
            if (m_c[name].hits < 200000) {
                tower.repair(m_c[name]);
                break;
            }
            if (Number(name) + 1 == m_c.length) check_1 = true;
        }
        if (check_1) {
            var repair_target = tower.room.find(FIND_STRUCTURES, {
                filter: (_target) => _target.hits < _target.hitsMax
            });
            repair_target.sort((a, b) => a.hits / a.hitsMax * 100 - b.hits / b.hitsMax * 100)
            if (repair_target.length > 0) {
                for (var name in repair_target)
                {
                if (repair_target[name].structureType == STRUCTURE_RAMPART && repair_target[name].hits >= 90000)
                {
                repair_target[name]=undefined;
                }
                else if (repair_target[name].structureType == STRUCTURE_WALL && repair_target[name].hits >= 60000)
                {
                repair_target[name]=undefined;
                }
                }
                repair_target.sort((a, b) => a.hits / a.hitsMax * 100 - b.hits / b.hitsMax * 100)
                tower.repair(repair_target[0]);
                }
            }
        }
};
module.exports = roleRepair;