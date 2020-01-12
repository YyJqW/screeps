var LK ={
    run:function(lo,li,lc)
    {
        for (var name in lo)
        {
        if (li[name].store.getFreeCapacity(RESOURCE_ENERGY)>0)
        {
            lo[name].transferEnergy(li[name],lo[name].store.getUsedCapacity(RESOURCE_ENERGY));
        }
    }
        for (var name in lc)
        {
            for (var name_ in li)
            {
            if (lc[name].store.getFreeCapacity(RESOURCE_ENERGY)==0&&lc[name].room.name==li[name_].room.name&&li[name_].store.getFreeCapacity(RESOURCE_ENERGY)>0)
            {
                if(lc[name].transferEnergy(li[name_],lc[name].store.getUsedCapacity(RESOURCE_ENERGY))==ERR_INVALID_ARGS){
                lc[name].transferEnergy(li[name_],li[name].store.getFreeCapacity(RESOURCE_ENERGY));
                lic = false;
                break;}
            }
        }
            for (var name_ in lo)
            {
            if (lc[name].store.getFreeCapacity(RESOURCE_ENERGY)==0&&lc[name].room.name==lo[name_].room.name&&lo[name_].store.getFreeCapacity(RESOURCE_ENERGY)>0)
            {
                if(lc[name].transferEnergy(lo[name_],lc[name].store.getUsedCapacity(RESOURCE_ENERGY))==ERR_INVALID_ARGS)
               { 
                   lc[name].transferEnergy(lo[name_],lo[name].store.getFreeCapacity(RESOURCE_ENERGY));
                break;
                   
               }
            }
        }
        }
    }
};
module.exports = LK;