var currentMenu;
var menuactive;
var itemOn;
var whichSkull;
var skullAnimCounter;
var screenSize;
var screenblocks;
var messageToPrint;
var messageString;
var messageLastMenuActive;
var quickSaveSlot;

function M_NewGame(choice) {};
function M_Episode(choice) {};
function M_ChooseSkill(choice) {};
function M_LoadGame(choice) {};
function M_SaveGame(choice) {};
function M_Options(choice) {};
function M_EndGame(choice) {};
function M_ReadThis(choice) {};
function M_ReadThis2(choice) {};
function M_QuitDOOM(choice) {};

function M_ChangeMessages(choice) {};
function M_ChangeSensitivity(choice) {};
function M_SfxVol(choice) {};
function M_MusicVol(choice) {};
function M_ChangeDetail(choice) {};
function M_SizeDisplay(choice) {};
function M_StartGame(choice) {};
function M_Sound(choice) {};

function M_FinishReadThis(choice) {};
function M_LoadSelect(choice) {};
function M_SaveSelect(choice) {};
function M_ReadSaveStrings() {};
function M_QuickSave() {};
function M_QuickLoad() {};

function M_DrawMainMenu() {};
function M_DrawReadThis1() {};
function M_DrawReadThis2() {};
function M_DrawNewGame() {};
function M_DrawEpisode() {};
function M_DrawOptions() {};
function M_DrawSound() {};
function M_DrawLoad() {};
function M_DrawSave() {};

const main_e =
{
	newgame: 0,
	options: 1,
	loadgame: 2,
	savegame: 3,
	readthis: 4,
	quitdoom: 5
};

var MainMenu =
[
	[1, "M_NGAME", M_NewGame, "n"],
	[1, "M_OPTION", M_Options, "o"],
	[1, "M_LOADG", M_LoadGame, "l"],
	[1, "M_SAVEG", M_SaveGame, "s"],
	[1, "M_RDTHIS", M_ReadThis, "r"],
	[1, "M_QUITG", M_QuitDOOM, "q"]
];

var MainDef =
{
	numitems: main_e.length,
	prevmenu: null,
	mmenuitems: MainMenu,
	routine: M_DrawMainMenu,
	x:97, y: 64,
	lastOn: 0
};

const episodes_e =
{
	ep1: 0,
	ep2: 1,
	ep3: 2,
	ep4: 3
};

var EpisodeMenu =
[
	[1, "M_EPI1", M_Episode, "k"],
	[1, "M_EPI2", M_Episode, "t"],
	[1, "M_EPI3", M_Episode, "i"],
	[1, "M_EPI4", M_Episode, "t"]
];

var EpiDef =
{
	numitems: episodes_e.length,
	prevMenu: MainDef,
	menuitems: EpisodeMenu,
	routine: M_DrawEpisode,
	x: 48, y: 63,
	lastOn: episodes_e.ep1
};

const newgame_e =
{
	killthings: 0,
	toorough: 1,
	hurtme: 2,
	violence: 3,
	nightmare: 4
};

var NewGameMenu =
[
	[1, "M_JKILL", M_ChooseSkill, "i"],
	[1, "M_ROUGH", M_ChooseSkill, "h"],
	[1, "M_HURT", M_ChooseSkill, "h"],
	[1, "M_ULTRA", M_ChooseSkill, "u"],
	[1, "M_NMARE", M_ChooseSkill, "n"]
];

var NewDef =
{
	numitems: newgame_e.length,
	prevMenu: EpiDef,
	menuitems: NewGameMenu,
	routine: M_DrawNewGame,
	x: 48, y: 63,
	lastOn: newgame_e.hurtme
};

const options_e =
{
	endgame: 0,
	messages: 1,
	detail: 2,
	scrnsize: 3,
	option_empty1: 4,
	mousesens: 5,
	option_empty2: 6,
	soundvol: 7,
	opt_end: 8
};

var OptionsMenu =
[
	[1, "M_ENDGAM", M_EndGame, "e"],
	[1, "M_MESSG", M_ChangeMessages, "m"],
	[1, "M_DETAIL", M_ChangeDetail, "g"],
	[2, "M_SCRNSZ", M_SizeDisplay, "s"],
	[-1, "", 0],
	[2, "M_MSENS", M_ChangeSensitivity, "m"],
	[-1, "", 0],
	[1, "M_SVOL", M_Sound, "s"]
];

var OptionsDef =
{
	numitems: options_e.length,
	prevMenu: MainDef,
	menuitems: OptionsMenu,
	routine: M_DrawOptions,
	x: 60, y: 37,
	lastOn: 0
};

const read_e =
{
	rdthsempty1: 0
};

var ReadMenu1 =
[
	[1, "", M_FinishReadThis, 0]
];

var ReadDef1 =
{
	numitems: read_e.length,
	prevMenu: MainDef,
	menuitems: ReadMenu1,
	routine: M_DrawReadThis1,
	x: 280, y: 185,
	lastOn: 0
};

const read_e2 =
{
	rdthsempty2: 0
};

var ReadMenu2 =
[
	[1, "", M_FinishReadThis, 0]
];

var ReadDef2 =
{
	numitems: read_e2.length,
	prevMenu: ReadDef1,
	menuitems: ReadMenu2,
	routine: M_DrawReadThis2,
	x: 330, y: 175,
	lastOn: 0
};

const sound_e =
{
	sfx_vol: 0,
	sfx_empty1: 1,
	music_vol: 2,
	sfx_empty2: 3
};

var SoundMenu =
[
	[2, "M_SFXVOl", M_SfxVol, "s"],
	[-1, "", 0],
	[2, "M_MUSVOl", M_MusicVol, "m"],
	[-1, "", 0]
];

var SoundDef =
{
	numitems: sound_e.length,
	prevMenu: OptionsDef,
	menuitems: SoundMenu,
	routine: M_DrawSound,
	x: 80, y: 64,
	lastOn: 0
};

const load_e =
{
	load1: 0,
	load2: 1,
	load3: 2,
	load4: 3,
	load5: 4,
	load6: 5
};

var LoadMenu =
[
	[1, "", M_LoadSelect, "1"],
	[1, "", M_LoadSelect, "2"],
	[1, "", M_LoadSelect, "3"],
	[1, "", M_LoadSelect, "4"],
	[1, "", M_LoadSelect, "5"],
	[1, "", M_LoadSelect, "6"]
];

var LoadDef =
{
	numitems: load_e.length,
	prevMenu: MainDef,
	menuitems: LoadMenu,
	routine: M_DrawLoad,
	x: 80, y: 54,
	lastOn: 0
};

var SaveMenu =
[
	[1, "", M_SaveSelect, "1"],
	[1, "", M_SaveSelect, "3"],
	[1, "", M_SaveSelect, "4"],
	[1, "", M_SaveSelect, "5"],
	[1, "", M_SaveSelect, "2"],
	[1, "", M_SaveSelect, "6"]
];

var SaveDef =
{
	numitems: load_e.length,
	prevMenu: MainDef,
	menuitems: SaveMenu,
	routine: M_DrawSave,
	x: 80, y: 54,
	lastOn: 0
};

function M_Init()
{
	currentMenu = MainDef;
	menuactive = 0;
	itemOn = currentMenu.lastOn;
	whichSkull = 0;
	skullAnimCounter = 10;
	//screenSize = screenblocks - 3;
	messageToPrint = 0;
	messageString = null;
	messageLastMenuActive = menuactive;
	quickSaveSlot = -1;

	switch(gamemode)
	{
		case "commercial":
			MainMenu[main_e.readthis] = MainMenu[main_e.quitdoom];
			MainDef.numitems--;
			MainDef.y += 8;
			NewDef.prevMenu = MainDef;
			ReadDef1.routine = M_DrawReadThis1;
			ReadDef1.x = 330;
			ReadDef1.y = 165;
			ReadMenu1[0].routine = M_FinishReadThis;
			break;
		case "shareware":
		case "registered":
			EpiDef.numitems--;
			break;
		case "retail":
		default:
			break;
	}
}