var lab=
{
    run:function(num,reactant1,reactant2,spawn,reaction)
    {
        var creep = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport');
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
        if (creep[0].memory.trans&&lab[1].store.getFreeCapacity(reactant1)>0)
        {
            creep[0].memory.done = false;
            creep[0].memory.lab = true;
            if (creep[0].store.getFreeCapacity()>0)
            {
                if (creep[0].withdraw(container1[0],reactant1)==ERR_NOT_IN_RANGE)
                creep[0].moveTo(container1[0]);
            }
            else if (creep[0].store.getUsedCapacity(reactant2)>0)
            {
                if (creep[0].transfer(container2[0],reactant2)==ERR_NOT_IN_RANGE)
                creep[0].moveTo(container2[0]);
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
            if (lab[1].store.getUsedCapacity(reactant1)>=2990)
            creep[0].memory.trans = false;
        }
        else if (lab[2].store.getFreeCapacity(reactant2)>0)
        {
            creep[0].memory.done = false;
            creep[0].memory.lab = true;
            if (creep[0].store.getFreeCapacity()>0)
            {
                if (creep[0].withdraw(container2[0],reactant2)==ERR_NOT_IN_RANGE)
                creep[0].moveTo(container2[0]);
            }
            else if (creep[0].store.getUsedCapacity(reactant1)>0)
            {
                if (creep[0].transfer(container1[0],reactant1)==ERR_NOT_IN_RANGE)
                creep[0].moveTo(container1[0]);
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
            if (lab[2].store.getUsedCapacity(reactant2)>=2990)
            creep[0].memory.trans = true;
        }
        if (lab[1].store.getUsedCapacity(reactant1)>0&&lab[2].store.getUsedCapacity(reactant2)>0)
        lab[0].runReaction(lab[1],lab[2]);
        if (lab[0].store.getUsedCapacity()>=num||lab[0].store.getFreeCapacity()==0)
        reaction = true;
        if (lab[2].store.getUsedCapacity(reactant2)>=2990&&lab[1].store.getUsedCapacity(reactant1)>=2990||creep[0].store.getUsedCapacity(RESOURCE_ENERGY)>0)
        creep[0].memory.lab = false;
    }
}

module.exports = lab;