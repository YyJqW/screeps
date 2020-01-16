var lab=
{
    run:function(num,reactant1,reactant2,spawn)
    {
        var creep = spawn.room.find(FIND_MY_CREEPS,{
            filter:(cre)=> cre.memory.role == 'transport_i'
        });
        container1 = spawn.room.find(FIND_STRUCTURES,{
            filter:(struc)=> (struc.structureType == STRUCTURE_STORAGE||
            struc.structureType == STRUCTURE_TERMINAL) &&
            struc.store.getUsedCapacity(reactant1)>0
        });
        container2 = spawn.room.find(FIND_STRUCTURES,{
            filter:(struc)=> (struc.structureType == STRUCTURE_STORAGE||
            struc.structureType == STRUCTURE_TERMINAL) &&
            struc.store.getUsedCapacity(reactant2)>0
        });
        var lab = spawn.room.find(FIND_STRUCTURES,{
            filter: { structureType: STRUCTURE_LAB }
        });
        if (creep.memory.done)
        {
            creep.memory.done = false;
        if (lab[1].store.getUsedCapacity(reactant1)<num)
        {
            if (creep.store.getFreeCapacity()>0)
            {
                creep.memory.lab = true;
                if (creep.withdrwa(container1,reactant1)==ERR_NOT_IN_RANGE)
                creep.moveTo(container1);
            }
            else
            {
                if (creep.transfer(lab[1],reactant1)==ERR_NOT_IN_RANGE)
                creep.moveTo(lab[1]);
                else if (creep.transfer(lab[1],reactant1)==OK)
                {
                creep.memory.done = true;
                creep.memory.lab = false;
                }
            }
        }
        else if (lab[2].store.getUsedCapacity(reactant2)<num)
        {
            if (creep.store.getFreeCapacity()>0)
            {
                creep.memory.lab = true;
                if (creep.withdrwa(container2,reactant2)==ERR_NOT_IN_RANGE)
                creep.moveTo(container2);
            }
            else
            {
                if (creep.transfer(lab[2],reactant2)==ERR_NOT_IN_RANGE)
                creep.moveTo(lab[2]);
                else if (creep.transfer(lab[2],reactant2)==OK)
                {
                creep.memory.done = true;
                creep.memory.lab = false;
                }
            }
        }
    }
        if (lab[1].store.getUsedCapacity(reactant1)>0&&lab[2].store.getUsedCapacity(reactant2)>0)
        lab[0].runReaction(lab[1],lab[2]);
    }
}

module.exports = lab;