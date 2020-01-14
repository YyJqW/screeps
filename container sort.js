var rOOms = ['E21S38','E22S38','E23S39','E22S36'];
var miner_container = ['5dcbaa0597e15e82348f25ec','5dcbbcd91a565749f3e49629','5dce2e891a41fb6f6e70d823','5de0d75b9276c577635ded73','5e00a8c3fb940e97e46bfd08','5e00d0ebf9d86bd2b651a00f','5e0d9f0446f9f55ce46a437a'];
var miner_container_o = [
'5e1c41b3e697d7cd6e84d219','5e1c705443eed46a66b8adb0','5e1c7710dadcbc8bd96062d0','5e1dbba591e04f4abb4789a4',
'5e1c5c4d9e776e58c4def4ef','5e1c460e1aeb2b9c99814321','5e1c73b026765a75f9204a66','5e1c7a406e043f57ee973c3b'];
var storage_container = ['5dcd01d5fbe41e2919f2de3c','5dd14b4d8b1d9b586a08b4e6','5de2c45198f152653b03e0c9','5e000e2bca55d7509867bac7','5e0f52ba29303d2a68445395'];
var mineral_container = ['5dde4a3d26efdb785b8cef38','5dde676abca74326c19ee604','5df1d6e37cdbdb534abff006','5e1ddf5a2d333a9a7e742658','5e0ef23fd8f1f2c24b5d3aed'];
var miner_container_unlinked = ['5e00a8c3fb940e97e46bfd08'];
var CS=
{
    run :function(KOC,array)
    {
        if (KOC=='miner')
        {
            for (var name in miner_container)
            {
                array[name]=Game.getObjectById(miner_container[name]);
            }
        }
        if (KOC=='miner_unlinked')
        {
            for (var name in miner_container_unlinked)
            {
                array[name]=Game.getObjectById(miner_container_unlinked[name]);
            }
        }
        if (KOC=='miner_o')
        {
            for (var name in miner_container_o)
            {
                if (Game.getObjectById(miner_container_o[name])!=null)
                array[name]=Game.getObjectById(miner_container_o[name]);
            }
        }
        if (KOC=='storage')
        {
            for (var name in storage_container)
            {
                array[name]=Game.getObjectById(storage_container[name]);
            }
        }
        if (KOC=='mineral')
        {
            for (var name in mineral_container)
            {
                array[name]=Game.getObjectById(mineral_container[name]);
            }
        }
        if (KOC=='terminal')
        {
            for (var name in rOOms)
            {
                array[name]=Game.rooms[rOOms[name]].terminal;
            }
        }
    }
};
module.exports = CS;