const HU_FONTSTART = '!'.charCodeAt(0);
const HU_FONTEND = '_'.charCodeAt(0);

const HU_FONTSIZE = (HU_FONTEND - HU_FONTSTART + 1);

const HU_BROADCAST = 5;

const HU_MSGREFRESH = KEY_ENTER;
const HU_MSGX = 0;
const HU_MSGY = 0;
const HU_MSGWIDTH = 64;
const HU_MSGHEIGHT = 64;

var chat_macros =
[
	doom_txt.HUSTR_CHATMACRO0,
	doom_txt.HUSTR_CHATMACRO1,
	doom_txt.HUSTR_CHATMACRO2,
	doom_txt.HUSTR_CHATMACRO3,
	doom_txt.HUSTR_CHATMACRO4,
	doom_txt.HUSTR_CHATMACRO5,
	doom_txt.HUSTR_CHATMACRO6,
	doom_txt.HUSTR_CHATMACRO7,
	doom_txt.HUSTR_CHATMACRO8,
	doom_txt.HUSTR_CHATMACRO9
];
var player_names =
[
	doom_txt.HUSTR_PLRGREEN,
	doom_txt.HUSTR_PLRINDIGO,
	doom_txt.HUSTR_PLRBROWN,
	doom_txt.HUSTR_PLRRED
];

var hu_font = [];

var shiftxform;
const french_shiftxform =
[
	"\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07", "\x08", "\x09", "\x0a", "\x0b", "\x0c", "\x0d", "\x0e", "\x0f",
	"\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17", "\x18", "\x19", "\x1a", "\x1b", "\x1c", "\x1d", "\x1e", "\x1f",
	' ', '!', '"', '#', '$', '%', '&',
	'"', // shift-'
	'(', ')', '*', '+',
	'?', // shift-,
	'_', // shift--
	'>', // shift-.
	'?', // shift-/
	'0', // shift-0
	'1', // shift-1
	'2', // shift-2
	'3', // shift-3
	'4', // shift-4
	'5', // shift-5
	'6', // shift-6
	'7', // shift-7
	'8', // shift-8
	'9', // shift-9
	'/',
	'.', // shift-;
	'<',
	'+', // shift-=
	'>', '?', '@',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
	'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'[', // shift-[
	'!', // shift-backslash - OH MY GOD DOES WATCOM SUCK
	']', // shift-]
	'"', '_',
	'\'', // shift-`
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
	'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'{', '|', '}', '~', "\x7f"
];

const english_shiftxform =
[
	"\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07", "\x08", "\x09", "\x0a", "\x0b", "\x0c", "\x0d", "\x0e", "\x0f",
	"\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17", "\x18", "\x19", "\x1a", "\x1b", "\x1c", "\x1d", "\x1e", "\x1f",
	' ', '!', '"', '#', '$', '%', '&',
	'"', // shift-'
	'(', ')', '*', '+',
	'<', // shift-,
	'_', // shift--
	'>', // shift-.
	'?', // shift-/
	')', // shift-0
	'!', // shift-1
	'@', // shift-2
	'#', // shift-3
	'$', // shift-4
	'%', // shift-5
	'^', // shift-6
	'&', // shift-7
	'*', // shift-8
	'(', // shift-9
	':',
	':', // shift-;
	'<',
	'+', // shift-=
	'>', '?', '@',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
	'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'[', // shift-[
	'!', // shift-backslash - OH MY GOD DOES WATCOM SUCK
	']', // shift-]
	'"', '_',
	'\'', // shift-`
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
	'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'{', '|', '}', '~', "\x7f"
];

function HU_Init()
{
	if(doom_txt.language == "french")
		shiftxform = french_shiftxform;
	else
		shiftxform = english_shiftxform;

	let j = HU_FONTSTART;
	for(let i = 0; i < HU_FONTSIZE; i++)
	{
		hu_font[i] = W_CacheLumpName("STCFN" + String(j).padStart(3, '0'));
	}
}