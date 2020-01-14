var link_o = ['5dd0c9af25214e5302d1a290','5dd3e1c8a1ca0b0ae302acaf','5de7b2180a41178afdbcaef0','5e034387b7711e32d5ece9b7','5e12b0561a0aa84359d22b8a','5e12b0561a0aa84359d22b8a'];
var link_i = ['5dd0e224e74e66dd77a89cf7','5dd3bd5895d1893d2752a6b5','5de7a6fb37a28fed302f1bf6','5e035111864eb461a113e947','5e12aa1769b91b70072ae36a','5e12aa1769b91b70072ae36a'];
var link_c = ['5de91cc182f954d0da1391d7','5de91f44dd200c3b0801a19a',
'5df310ac7cdbdbc6ecc07046',
'5df53a3eb596f1a722c364a1',
'5e08bc62101cfefad1c91872',
'5e1dca2ae9b1858097c75df2'];
var towers = ['5dcb80c9b272c27f9ad4889f','5dce10c0080252ca761c99b2','5dd0be2aa851cf478471b88b',
'5dd3b16bca73bf5d5367786a','5de1042e8ed33a2b7a3a3763','5de7c139ee54d94612510544','5de89bced4468d7c3bdecd2a',
'5dfe41609f4c7d93393cff05','5dfe084edc7f996ea0e365f9','5e034b5fd705e495bf8c8e3b','5e0e1f9f48a65b00882824bd','5e129611ea8896835b84e99e','5e14c2cffb142056bc7c70d4'];
var GSBI=
{
    run :function(lo,li,lc,tower,)
    {
        for (var name in link_o)
            {lo[name]=Game.getObjectById(link_o[name]);}
        for (var name in towers)
            {tower[name]=Game.getObjectById(towers[name]);}
        for (var name in link_i)
            {li[name]=Game.getObjectById(link_i[name]);}
        for (var name in link_c)
            {lc[name]=Game.getObjectById(link_c[name]);}
    }
};
module.exports = GSBI;