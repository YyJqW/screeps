var rOOms = ['E21S38','E22S38','E23S39','E22S36'];
var miner_container = ['5dcbaa0597e15e82348f25ec','5dcbbcd91a565749f3e49629','5dce2e891a41fb6f6e70d823','5de0d75b9276c577635ded73','5e00a8c3fb940e97e46bfd08','5e00d0ebf9d86bd2b651a00f'];
var miner_container_o = ['5e0d9f0446f9f55ce46a437a',
'5e0da23fd2e4535720b38c7f',
'5e0da7ccf9d0a64fb8667ab1','5e0da5e479557c41c83d218a','5e0db0b4f9f7f308c08201cb','5e0daee2d2e4539c47b391b8'];
var storage_container = ['5dcd01d5fbe41e2919f2de3c','5dd14b4d8b1d9b586a08b4e6','5de2c45198f152653b03e0c9','5e000e2bca55d7509867bac7'];
var mineral_container = ['5dde4a3d26efdb785b8cef38','5dde676abca74326c19ee604','5df1d6e37cdbdb534abff006'];
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