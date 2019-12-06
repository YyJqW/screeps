var link_o = ['5dd0c9af25214e5302d1a290','5dd3e1c8a1ca0b0ae302acaf','5de7b2180a41178afdbcaef0'];
var link_i = ['5dd0e224e74e66dd77a89cf7','5dd3bd5895d1893d2752a6b5','5de7a6fb37a28fed302f1bf6'];
var LK ={
    run:function()
    {
        var li=new Array();
        var lo=new Array();
        for (var name in link_o)
        {
            lo[name] = Game.getObjectById(link_o[name]);
        }
        for (var name in link_i)
        {
            li[name]=Game.getObjectById(link_i[name]);
        }
        for (var name in lo)
        {
        if (li[name].store.getFreeCapacity(RESOURCE_ENERGY)>0)
        {
            lo[name].transferEnergy(li[name],lo[name].store.getUsedCapacity(RESOURCE_ENERGY));
        }
        }
    }
};
module.exports = LK;