var miner_container = ['5dcbaa0597e15e82348f25ec','5dcbbcd91a565749f3e49629','5dce2e891a41fb6f6e70d823','5de0d75b9276c577635ded73'];
var miner_container_o = ['5dea6515e52fa56b99d3cae9'];
var storage_container = ['5dcd01d5fbe41e2919f2de3c','5dd14b4d8b1d9b586a08b4e6','5de2c45198f152653b03e0c9'];
var mineral_container = ['5dde4a3d26efdb785b8cef38','5dde676abca74326c19ee604'];
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
        if (KOC=='miner_o')
        {
            for (var name in miner_container_o)
            {
                array[name]=Game.getObjectById(miner_container_o[name]);
                console.log(miner_container_o[name],name,array[name]);
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
    }
};
module.exports = CS;