var link_o = ['5dd0c9af25214e5302d1a290','5dd3e1c8a1ca0b0ae302acaf','5de7b2180a41178afdbcaef0'];
var link_i = ['5dd0e224e74e66dd77a89cf7','5dd3bd5895d1893d2752a6b5','5de7a6fb37a28fed302f1bf6'];
var link_c = ['5de91cc182f954d0da1391d7','5de91f44dd200c3b0801a19a','5df310ac7cdbdbc6ecc07046'];
var LK ={
    run:function()
    {
        var lic = true;
        var li=new Array();
        var lo=new Array();
        var lc=new Array();
        for (var name in link_o)
        {
            lo[name] = Game.getObjectById(link_o[name]);
        }
        for (var name in link_i)
        {
            li[name]=Game.getObjectById(link_i[name]);
        }
        for (var name in link_c)
        {
            lc[name]=Game.getObjectById(link_c[name]);
        }
        for (var name in lo)
        {
        if (li[name].store.getFreeCapacity(RESOURCE_ENERGY)>0)
        {
            lo[name].transferEnergy(li[name],lo[name].store.getUsedCapacity(RESOURCE_ENERGY));
        }
        for (var name in lc)
        {
            if (lic)
            {
            for (var name_ in li)
            {
            if (lc[name].store.getFreeCapacity(RESOURCE_ENERGY)==0&&lc[name].room.name==li[name_].room.name&&li[name_].store.getFreeCapacity(RESOURCE_ENERGY)>0)
            {
                lc[name].transferEnergy(li[name_],lc[name].store.getUsedCapacity(RESOURCE_ENERGY));
                lic = false;
                break;
            }
        }
    }
        else{
            for (var name_ in lo)
            {
            if (lc[name].store.getFreeCapacity(RESOURCE_ENERGY)==0&&lc[name].room.name==lo[name_].room.name&&lo[name_].store.getFreeCapacity(RESOURCE_ENERGY)>0)
            {
                lc[name].transferEnergy(lo[name_],lc[name].store.getUsedCapacity(RESOURCE_ENERGY));
                break;
            }
        }
    }
        }
        }
    }
};
module.exports = LK;