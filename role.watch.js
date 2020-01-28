var FLAG = [Game.flags.Watch1,Game.flags.Watch2];
var roleWatch=
{
    run:function()
    {
        var watchers = _.filter(Game.creeps, (creep) => creep.memory.role == 'watch');
        for (var name in watchers)
        {
        if (watchers[name].pos.x!=FLAG[name].pos.x||watchers[name].pos.y!=FLAG[name].pos.y||watchers[name].room.name!=FLAG[name].room.name)
        watchers[name].moveTo(FLAG[name],{reusePath: 10});
        }
    }
}

module.exports = roleWatch;