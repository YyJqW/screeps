var FP=
{
    run:function(spawn,production,material)
    {
        var Factory = spawn.room.find(FIND_STRUCTURES,{
            filter:(stru)=>
                stru.stuctureType == STRUCTURE_FACTORY&&
                stru.store.getUsedCapacity(material)>0
            
        });
                    console.log(Factory);
        if (Factory[0]!=undefined)
        Factory[0].produce(production);
    }
}
module.exports = FP;