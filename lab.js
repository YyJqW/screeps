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
        if (lab[1].store.getUsedCapacity(reactant1)<num)
        {
            creep[0].memory.done = false;
            creep[0].memory.lab = true;
            if (creep[0].store.getFreeCapacity()>0)
            {
                if (creep[0].withdraw(container1[0],reactant1)==ERR_NOT_IN_RANGE)
                creep[0].moveTo(container1[0]);
            }
            else
            {
                if (creep[0].transfer(lab[1],reactant1)==ERR_NOT_IN_RANGE)
                creep[0].moveTo(lab[1]);
                else if (creep[0].transfer(lab[1],reactant1)==OK)
                {
                creep[0].memory.done = true;
                creep[0].memory.lab = false;
                }
            }
        }
        else if (lab[2].store.getUsedCapacity(reactant2)<num)
        {
            creep[0].memory.done = false;
            creep[0].memory.lab = true;
            if (creep[0].store.getFreeCapacity()>0)
            {
                if (creep[0].withdraw(container2[0],reactant2)==ERR_NOT_IN_RANGE)
                creep[0].moveTo(container2[0]);
            }
            else
            {
                if (creep[0].transfer(lab[2],reactant2)==ERR_NOT_IN_RANGE)
                creep[0].moveTo(lab[2]);
                else if (creep[0].transfer(lab[2],reactant2)==OK)
                {
                creep[0].memory.done = true;
                creep[0].memory.lab = false;
                }
            }
        }
        if (lab[1].store.getUsedCapacity(reactant1)>0&&lab[2].store.getUsedCapacity(reactant2)>0)
        lab[0].runReaction(lab[1],lab[2]);
        if (lab[0].store.getUsedCapacity()>=num)
        return true;
    }
}

module.exports = lab;