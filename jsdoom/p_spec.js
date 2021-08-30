const MAXSWITCHES = 50
const MAXBUTTONS = 16
const BUTTONTIME = 35

class switchlist_t
{
	name1 = null;
	name2 = null;
	episode = 0;
	constructor(name1, name2, episode)
	{
		this.name1 = name1;
		this.name2 = name2;
		this.episode = episode;
	}
}

class anim_t
{
	istexture = false;
	picnum = 0;
	basepic = 0;
	numpics = 0;
	speed = 0;
}

class animdef_t
{
	istexture = false;
	endname = null;
	startname = null;
	speed = 0;
	constructor(istexture, endname, startname, speed)
	{
		this.istexture = istexture;
		this.endname = endname;
		this.startname = startname;
		this.speed = speed;
	}
}

var animdefs =
[
	new animdef_t(false, "NUKAGE3", "NUKAGE1", 8),
    new animdef_t(false, "FWATER4", "FWATER1", 8),
    new animdef_t(false, "SWATER4", "SWATER1", 8),
    new animdef_t(false, "LAVA4", "LAVA1", 8),
    new animdef_t(false, "BLOOD3", "BLOOD1", 8),

    // DOOM II flat animations.
    new animdef_t(false, "RROCK08", "RROCK05", 8),
    new animdef_t(false, "SLIME04", "SLIME01", 8),
    new animdef_t(false, "SLIME08", "SLIME05", 8),
    new animdef_t(false, "SLIME12", "SLIME09", 8),

    new animdef_t(true, "BLODGR4", "BLODGR1", 8),
    new animdef_t(true, "SLADRIP3", "SLADRIP1", 8),

    new animdef_t(true, "BLODRIP4", "BLODRIP1", 8),
    new animdef_t(true, "FIREWALL", "FIREWALA", 8),
    new animdef_t(true, "GSTFONT3", "GSTFONT1", 8),
    new animdef_t(true, "FIRELAVA", "FIRELAV3", 8),
    new animdef_t(true, "FIREMAG3", "FIREMAG1", 8),
    new animdef_t(true, "FIREBLU2", "FIREBLU1", 8),
    new animdef_t(true, "ROCKRED3", "ROCKRED1", 8),

    new animdef_t(true, "BFALL4", "BFALL1", 8),
    new animdef_t(true, "SFALL4", "SFALL1", 8),
    new animdef_t(true, "WFALL4", "WFALL1", 8),
    new animdef_t(true, "DBRAIN4", "DBRAIN1", 8)
];

var anims = [];

function P_InitPicAnims()
{
	for(let i = 0; i < animdefs[i].length; i++)
	{
		let anim = new anim_t();

		if(animdefs[i].istexture)
		{
			if(R_CheckTextureNumForName(animdefs[i].startname) == -1)
				continue;
			
				anim.picnum = R_TextureNumForName(animdefs[i].endname);
				anim.basepic = R_TextureNumForName(animdefs[i].startname);
		}
		else
		{
			if(W_CheckNumForName(animdefs[i].startname) == -1)
				continue;
			
			anim.picnum = R_FlatNumForName(animdefs[i].endname);
			anim.basepic = R_FlatNumForName(animdefs[i].startname);
		}

		anim.istexture = animdefs[i].istexture;
		anim.numpics = anim.picnum - anim.basepic + 1;

		if(anim.numpics < 2)
			I_Error("P_InitPicAnims: bad cycle from " + animdefs[i].startname + " to " + animdefs[i].endname);
		
		anim.speed = animdefs[i].speed;
		
		anims[i] = anim;
	}
}