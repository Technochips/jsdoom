var mouseSensitivity = 5;

var showMessages = true;

var detailLevel = 0;
var screenblocks = 0;

var screenSize;

var quickSaveSlot;

var messageToPrint;
var messageString;

var messx;
var messy;
var messageLastMenuActive;

var mesageNeedsInput;

var messageRoutine;

var currentMenu;
var menuactive;
var itemOn;
var whichSkull;
var skullAnimCounter;

class menuitem_t
{
	status;
	name;
	routine;
	alphaKey;
	constructor(status, name, routine, alphaKey)
	{
		this.status = status;
		this.name = name;
		this.routine = routine;
		this.alphaKey = alphaKey;
	}
}

class menu_t
{
	numitems;
	prevMenu;
	menuitems;
	routine;
	x;
	y;
	lastOn;
	constructor(numitems, prevMenu, menuitems, routine, x, y, lastOn)
	{
		this.numitems = numitems;
		this.prevMenu = prevMenu;
		this.menuitems = menuitems;
		this.routine = routine;
		this.x = x;
		this.y = y;
		this.lastOn = lastOn;
	}
}

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
	new menuitem_t(1, "M_NGAME", M_NewGame, "n"),
	new menuitem_t(1, "M_OPTION", M_Options, "o"),
	new menuitem_t(1, "M_LOADG", M_LoadGame, "l"),
	new menuitem_t(1, "M_SAVEG", M_SaveGame, "s"),
	new menuitem_t(1, "M_RDTHIS", M_ReadThis, "r"),
	new menuitem_t(1, "M_QUITG", M_QuitDOOM, "q"),
];

var MainDef = new menu_t
(
	main_e.length,
	null,
	MainMenu,
	M_DrawMainMenu,
	97, 64,
	0
);

const episodes_e =
{
	ep1: 0,
	ep2: 1,
	ep3: 2,
	ep4: 3
};

var EpisodeMenu =
[
	new menuitem_t(1, "M_EPI1", M_Episode, "k"),
	new menuitem_t(1, "M_EPI2", M_Episode, "t"),
	new menuitem_t(1, "M_EPI3", M_Episode, "i"),
	new menuitem_t(1, "M_EPI4", M_Episode, "t"),
];

var EpiDef = new menu_t
(
	episodes_e.length,
	MainDef,
	EpisodeMenu,
	M_DrawEpisode,
	48, 63,
	episodes_e.ep1
);

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
	new menuitem_t(1, "M_JKILL", M_ChooseSkill, "i"),
	new menuitem_t(1, "M_ROUGH", M_ChooseSkill, "h"),
	new menuitem_t(1, "M_HURT", M_ChooseSkill, "h"),
	new menuitem_t(1, "M_ULTRA", M_ChooseSkill, "u"),
	new menuitem_t(1, "M_NMARE", M_ChooseSkill, "n"),
];

var NewDef = new menu_t
(
	newgame_e.length,
	EpiDef,
	NewGameMenu,
	M_DrawNewGame,
	48, 63,
	newgame_e.hurtme
);

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
	new menuitem_t(1, "M_ENDGAM", M_EndGame, "e"),
	new menuitem_t(1, "M_MESSG", M_ChangeMessages, "m"),
	new menuitem_t(1, "M_DETAIL", M_ChangeDetail, "g"),
	new menuitem_t(2, "M_SCRNSZ", M_SizeDisplay, "s"),
	new menuitem_t(-1, "", 0),
	new menuitem_t(2, "M_MSENS", M_ChangeSensitivity, "m"),
	new menuitem_t(-1, "", 0),
	new menuitem_t(1, "M_SVOL", M_Sound, "s"),
];

var OptionsDef = new menu_t
(
	options_e.length,
	MainDef,
	OptionsMenu,
	M_DrawOptions,
	60, 37,
	0
);

const read_e =
{
	rdthsempty1: 0
};

var ReadMenu1 =
[
	new menuitem_t(1, "", M_FinishReadThis, 0),
];

var ReadDef1 = new menu_t
(
	read_e.length,
	MainDef,
	ReadMenu1,
	M_DrawReadThis1,
	280, 185,
	0
);

const read_e2 =
{
	rdthsempty2: 0
};

var ReadMenu2 =
[
	new menuitem_t(1, "", M_FinishReadThis, 0),
];

var ReadDef2 = new menu_t
(
	read_e2.length,
	ReadDef1,
	ReadMenu2,
	M_DrawReadThis2,
	330, 175,
	0
);

const sound_e =
{
	sfx_vol: 0,
	sfx_empty1: 1,
	music_vol: 2,
	sfx_empty2: 3
};

var SoundMenu =
[
	new menuitem_t(2, "M_SFXVOl", M_SfxVol, "s"),
	new menuitem_t(-1, "", 0),
	new menuitem_t(2, "M_MUSVOl", M_MusicVol, "m"),
	new menuitem_t(-1, "", 0),
];

var SoundDef = new menu_t
(
	sound_e.length,
	OptionsDef,
	SoundMenu,
	M_DrawSound,
	80, 64,
	0
);

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
	new menuitem_t(1, "", M_LoadSelect, "1"),
	new menuitem_t(1, "", M_LoadSelect, "2"),
	new menuitem_t(1, "", M_LoadSelect, "3"),
	new menuitem_t(1, "", M_LoadSelect, "4"),
	new menuitem_t(1, "", M_LoadSelect, "5"),
	new menuitem_t(1, "", M_LoadSelect, "6"),
];

var LoadDef = new menu_t
(
	load_e.length,
	MainDef,
	LoadMenu,
	M_DrawLoad,
	80, 54,
	0
);

var SaveMenu =
[
	new menuitem_t(1, "", M_SaveSelect, "1"),
	new menuitem_t(1, "", M_SaveSelect, "3"),
	new menuitem_t(1, "", M_SaveSelect, "4"),
	new menuitem_t(1, "", M_SaveSelect, "5"),
	new menuitem_t(1, "", M_SaveSelect, "2"),
	new menuitem_t(1, "", M_SaveSelect, "6"),
];

var SaveDef = new menu_t
(
	load_e.length,
	MainDef,
	SaveMenu,
	M_DrawSave,
	80, 54,
	0
);

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