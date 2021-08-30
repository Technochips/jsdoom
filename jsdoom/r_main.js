const LIGHTLEVELS = 16
const LIGHTSEGSHIFT = 4
const MAXLIGHTSCALE = 48
const LIGHTSCALESHIFT = 12
const MAXLIGHTZ = 128
const LIGHTZSHIFT = 20
const NUMCOLORMAPS = 32

var framecount;
var zlight = [];

function R_InitPointToAngle()
{
	// This is inaccurate
	//for(let i = 0; i <= SLOPERANGE; i++)
	//{
	//	let f = Math.fround(Math.fround(Math.atan(Math.fround(i/SLOPERANGE)))/(3.141592657*2)); // i hate precision!
	//	tantoangle[i] = (0xffffffff*f)|0;
	//}
}
function R_InitTables()
{
	// This won't be accurate
}

const DISTMAP = 2

function R_InitLightTables()
{
	for(let i = 0; i < LIGHTLEVELS; i++)
	{
		let startmap = ((LIGHTLEVELS-1-i)*2)*((NUMCOLORMAPS/LIGHTLEVELS)|0)
		zlight[i] = [];
		for(let j = 0; j < MAXLIGHTZ; j++)
		{
			let scale = FixedDiv((((SCREENWIDTH/2)|0)*FRACUNIT), (j+1)<<LIGHTZSHIFT);
			scale >>= LIGHTSCALESHIFT;
			let level = startmap - ((scale/DISTMAP)|0);

			if(level < 0)
				level = 0;
			else if(level >= NUMCOLORMAPS)
				level = NUMCOLORMAPS - 1;
			
			zlight[i][j] = level
		}
	}
}

var setsizeneeded;
var setblocks;
var setdetail;

function R_SetViewSize(blocks, detail)
{
	setsizeneeded = true;
	setblocks = blocks;
	setdetail = detail;
}

function R_Init()
{
	R_InitData();
	console.log("R_InitData");
	R_InitPointToAngle();
	console.log("R_InitPointToAngle");
	R_InitTables();
	console.log("R_InitTables");

	R_SetViewSize(screenblocks, detailLevel);
	R_InitPlanes();
	console.log("R_InitPlanes");
	R_InitLightTables();
	console.log("R_InitLightTables");
	R_InitSkyMap();
	console.log("R_InitSkyMap");
	R_InitTranslationTables();
	console.log("R_InitTranslationTables");

	framecount = 0;
}