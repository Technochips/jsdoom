var alphSwitchList =
[
	new switchlist_t("SW1BRCOM", "SW2BRCOM", 1),
	new switchlist_t("SW1BRN1", "SW2BRN1", 1),
	new switchlist_t("SW1BRN2", "SW2BRN2", 1),
	new switchlist_t("SW1BRNGN", "SW2BRNGN", 1),
	new switchlist_t("SW1BROWN", "SW2BROWN", 1),
	new switchlist_t("SW1COMM", "SW2COMM", 1),
	new switchlist_t("SW1COMP", "SW2COMP", 1),
	new switchlist_t("SW1DIRT", "SW2DIRT", 1),
	new switchlist_t("SW1EXIT", "SW2EXIT", 1),
	new switchlist_t("SW1GRAY", "SW2GRAY", 1),
	new switchlist_t("SW1GRAY1", "SW2GRAY1", 1),
	new switchlist_t("SW1METAL", "SW2METAL", 1),
	new switchlist_t("SW1PIPE", "SW2PIPE", 1),
	new switchlist_t("SW1SLAD", "SW2SLAD", 1),
	new switchlist_t("SW1STARG", "SW2STARG", 1),
	new switchlist_t("SW1STON1", "SW2STON1", 1),
	new switchlist_t("SW1STON2", "SW2STON2", 1),
	new switchlist_t("SW1STONE", "SW2STONE", 1),
	new switchlist_t("SW1STRTN", "SW2STRTN", 1),
	
	// Doom registered episodes 2&3 switches
	new switchlist_t("SW1BLUE", "SW2BLUE", 2),
	new switchlist_t("SW1CMT", 	"SW2CMT", 2),
	new switchlist_t("SW1GARG", "SW2GARG", 2),
	new switchlist_t("SW1GSTON", "SW2GSTON", 2),
	new switchlist_t("SW1HOT", 	"SW2HOT", 2),
	new switchlist_t("SW1LION", "SW2LION", 2),
	new switchlist_t("SW1SATYR", "SW2SATYR", 2),
	new switchlist_t("SW1SKIN", "SW2SKIN", 2),
	new switchlist_t("SW1VINE", "SW2VINE", 2),
	new switchlist_t("SW1WOOD", "SW2WOOD", 2),
	
	// Doom II switches
	new switchlist_t("SW1PANEL", "SW2PANEL", 3),
	new switchlist_t("SW1ROCK", "SW2ROCK", 3),
	new switchlist_t("SW1MET2", "SW2MET2", 3),
	new switchlist_t("SW1WDMET", "SW2WDMET", 3),
	new switchlist_t("SW1BRIK", "SW2BRIK", 3),
	new switchlist_t("SW1MOD1", "SW2MOD1", 3),
	new switchlist_t("SW1ZIM", 	"SW2ZIM", 3),
	new switchlist_t("SW1STON6", "SW2STON6", 3),
	new switchlist_t("SW1TEK", 	"SW2TEK", 3),
	new switchlist_t("SW1MARB", "SW2MARB", 3),
	new switchlist_t("SW1SKULL", "SW2SKULL", 3),
]

var switchlist;
var numswitches;
var buttonlist;

function P_InitSwitchList()
{
	switchlist = [];
	numswitches = 0;
	
	let episode = 1;
	if(gamemode == "registered")
		episode = 2;
	else if(gamemode == "commercial")
		episode = 3;
	
	let i, index;
	i = index = 0;
	for(; i <= MAXSWITCHES; i++)
	{
		if(!alphSwitchList[i])
		{
			numswitches = index/2;
			break;
		}
		if(alphSwitchList[i].episode <= episode)
		{
			switchlist[index++] = R_TextureNumForName(alphSwitchList[i].name1);
			switchlist[index++] = R_TextureNumForName(alphSwitchList[i].name2);
		}
	}
}