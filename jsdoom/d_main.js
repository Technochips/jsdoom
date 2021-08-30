var wadfiles
var iswadfiles

var modifiedgame
var nomonsters
var respawnparm
var fastparm
var devparm

var gamemission
var gamemode

var startskill
var startepisode
var startmap
var autostart

function D_AddFile(url, iswad)
{
	if(wadfiles == undefined) wadfiles = [];
	if(iswadfiles == undefined) iswadfiles = [];

	wadfiles.push(url);
	iswadfiles.push(iswad);
}

function IdentifyVersion()
{
	if(gamemission == undefined)
	{
		let i = lumpinfo.filter(e => (e.name === "MAP01" || e.name === "E1M1"));
		if(i.length > 0)
		{
			switch(i[0].name)
			{
				case("MAP01"):
					gamemission = "doom2";
					break;
				case("E1M1"):
					gamemission = "doom";
					break;
			}
		}
		if(gamemission == undefined)
		{
			I_Error("Unknown or invalid IWAD file.");
		}
	}
	if(gamemission == "doom")
	{
		if(W_CheckNumForName("E4M1") > 0)
		{
			gamemode = "retail";
		}
		else if(W_CheckNumForName("E3M1") > 0)
		{
			gamemode = "registered";
		}
		else
		{
			gamemode = "shareware";
		}
	}
	else
	{
		gamemode = "commercial";
	}
}

function D_DoomMain()
{
	if(!M_CheckParm("iwad"))
	{
		I_Error("No IWAD!");
	}

	D_AddFile(M_GetParm("iwad"), true);

	modifiedgame = false;

	// initialize the really easy parameters

	nomonsters = M_CheckParm('nomonsters');
	respawnparm = M_CheckParm('respawn');
	fastparm = M_CheckParm('fast');
	devparm = M_CheckParm('devparm');

	if(devparm)
	{
		console.log(doom_txt["D_DEVSTR"]);
	}

	if(M_CheckParm('altdeath')) deathmatch = 2;
	else if(M_CheckParm('deathmatch')) deathmatch = 1;
	else deathmatch = 0;

	if(M_CheckParm("turbo"))
	{
		//TODO: do that
	}

	// add each separate files

	if(M_CheckParm("file"))
	{
		modifiedgame = true;
		let files = M_GetParm("file").split("|");
		for(let i = 0; i < files.length; i++)
		{
			D_AddFile(files[i], true);
		}
	}

	// add demo

	if(M_CheckParm("playdemo") || M_CheckParm("timedemo"))
	{
		let demo
		if(M_CheckParm("playdemo"))
			demo = M_GetParm("playdemo");
		else
			demo = M_GetParm("timedemo");

		D_AddFile(demo, false);

		console.log("Playing demo " + demo);
	}

	startskill = "sk_medium";
	startepisode = 1;
	startmap = 1;
	autostart = false;

	if(M_CheckParm("skill"))
	{
		switch(M_GetParm("skill"))
		{
			case 1:
				startskill = "sk_baby";
				break;
			case 2:
				startskill = "sk_easy";
				break;
			case 3:
				startskill = "sk_medium";
				break;
			case 4:
				startskill = "sk_hard";
				break;
			case 5:
				startskill = "sk_nightmare";
				break;
			default:
				startskill = "";
				break;
		}
		autostart = true;
	}

	if(M_CheckParm("episode"))
	{
		startepisode = ParseInt(M_GetParm("episode"));
		startmap = 1;
		autostart = true;
	}
	
	if(M_CheckParm("timer") && deathmatch)
	{
		let time = M_GetParm("timer");
		if(time > 1) console.log("Levels will end after " + time + " minutes.");
		else		 console.log("Levels will end after " + time + " minute.");
	}

	if(M_CheckParm("avg") && deathmatch)
	{
		console.log("Austin Virtual Gaming: Levels will end after 20 minutes");
	}

	if(M_CheckParm("warp"))
	{
		if(gamemode == "commercial")
		{
			startmap = ParseInt(M_GetParm("warp"));
		}
		else
		{
			let i = ParseInt(M_GetParm("Warp")).split(" ");
			startepisode = i[0];
			startmap = i[1];
		}
		autostart = true;
	}

	console.log("V_Init: allocate screens."); // false.  this does not exist

	console.log("M_LoadDefaults: Load system defaults.");
	M_LoadDefaults();

	console.log("Z_Init: Init zone memory allocation daemon. "); // false. this also does not exist, but this must be coded in in order to have the true dos experience
	
	console.log("M_LoadDefaults: Load system defaults.");

	console.log("W_Init: Init WADfiles.")
	W_InitMultipleFiles(wadfiles, iswadfiles);

	IdentifyVersion();

	if(modifiedgame)
	{
		let name = ["e2m1","e2m2","e2m3","e2m4","e2m5","e2m6","e2m7","e2m8","e2m9",
					"e3m1","e3m3","e3m3","e3m4","e3m5","e3m6","e3m7","e3m8","e3m9",
					"dphoof","bfgga0","heada1","cybra1","spida1d1"];
		
		if(gamemode == "shareware")
			I_Error("You cannot -file with the shareware version. Register!");
		
		if(gamemode == "registered")
			for(let i = 0; i < 23; i++)
				if(W_CheckNumForName(name[i] < 0))
					I_Error("This is not the registered version.");
		
		console.log("===========================================================================\n" +
					"ATTENTION:  This version of DOOM has been modified.  If you would like to\n" +
					"get a copy of the original game, call 1-800-IDGAMES or see the readme file.\n" +
					"        You will not receive technical support for modified games.\n" +
					"===========================================================================");
	}

	switch(gamemode)
	{
		case "shareware":
		case "indetermined":
			console.log("===========================================================================\n" +
						"                                Shareware!\n" +
						"===========================================================================\n"
			);
			break;
		case "registered":
		case "retail":
		case "commercial":
			console.log("===========================================================================\n" +
						"                 Commercial product - do not distribute!\n" +
						"         Please report software piracy to the SPA: 1-800-388-PIR8\n" +
						"===========================================================================\n"
			);
			break;

		default:
			// Ouch.
			break;
	}

	console.log("M_Init: Init miscellaneous info.");
	M_Init();

	console.log("R_Init: Init DOOM refresh daemon - ");
	R_Init();

	console.log("P_Init: Init Playloop state.");
	P_Init();

	console.log("I_Init: Setting up machine state.");
	I_Init();

	console.log("S_Init: Setting up sound.");
	S_Init(snd_SfxVolume, snd_MusicVolume);

	console.log("HU_Init: Setting up heads up display.");
	HU_Init();
}