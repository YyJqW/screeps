var FLAG = [Game.flags.Watch1,Game.flags.Watch2,Game.flags.Watch3];
var roleWatch=
{
    run:function()
    {
        var watchers = _.filter(Game.creeps, (creep) => creep.memory.role == 'watch');
        for (var name in watchers)
        {
        watchers[name].moveTo(FLAG[name],{reusePath: 5});
        }
    }
}

module.exports = roleWatch;