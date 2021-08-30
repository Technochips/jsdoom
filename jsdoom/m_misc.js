class default_t
{
	name = null;
	location = null;
	defaultvalue = 0;
	scantranslation = 0;
	untranslated = 0;
	constructor(name, location, defaultvalue)
	{
		this.name = name;
		this.location = location;
		this.defaultvalue = defaultvalue;

		this.getLocation = new Function("'use strict';return " + location);
		this.setLocation = new Function("v", "'use strict';" + location + " = v;");
	}
}

var usemouse;
var usejoystick;

var defaults =
[
	new default_t("mouse_sensitivity", "mouseSensitivity", 5),
	new default_t("sfx_volume", "snd_SfxVolume", 8),
	new default_t("music_volume", "snd_MusicVolume", 8),
	new default_t("show_messages", "showMessages", true),

	new default_t("key_right", "key_right", KEY_RIGHTARROW),
	new default_t("key_left", "key_left", KEY_LEFTARROW),
	new default_t("key_up", "key_up", KEY_UPARROW),
	new default_t("key_down", "key_down", KEY_DOWNARROW),
	new default_t("key_strafeleft", "key_strafeleft", ",".charCodeAt(0)),
	new default_t("key_straferight", "key_straferight", ".".charCodeAt(0)),

	new default_t("key_fire", "key_fire", KEY_RCTRL),
	new default_t("key_use", "key_use", " ".charCodeAt(0)),
	new default_t("key_strafe", "key_strafe", KEY_RALT),
	new default_t("key_speed", "key_speed", KEY_RSHIFT),

	new default_t("use_mouse", "usemouse", true),
	new default_t("mouseb_fire", "mousebfire", 0),
	new default_t("mouseb_strafe", "mousebstrafe", 1),
	new default_t("mouseb_forward", "mousebforward", 2),

	new default_t("use_joystick", "usejoystick", false),
	new default_t("joyb_fire", "joybfire", 0),
	new default_t("joyb_strafe", "joybstrafe", 1),
	new default_t("joyb_use", "joybuse", 3),
	new default_t("joyb_speed", "joybspeed", 2),

	new default_t("screenblocks", "screenblocks", 9),
	new default_t("detaillevel", "detailLevel", 0),

	new default_t("snd_channels", "numChannels", 3),



	
	new default_t("chatmacro0", "chat_macros[0]", doom_txt["HUSTR_CHATMACRO0"]),
	new default_t("chatmacro1", "chat_macros[1]", doom_txt["HUSTR_CHATMACRO1"]),
	new default_t("chatmacro2", "chat_macros[2]", doom_txt["HUSTR_CHATMACRO2"]),
	new default_t("chatmacro3", "chat_macros[3]", doom_txt["HUSTR_CHATMACRO3"]),
	new default_t("chatmacro4", "chat_macros[4]", doom_txt["HUSTR_CHATMACRO4"]),
	new default_t("chatmacro5", "chat_macros[5]", doom_txt["HUSTR_CHATMACRO5"]),
	new default_t("chatmacro6", "chat_macros[6]", doom_txt["HUSTR_CHATMACRO6"]),
	new default_t("chatmacro7", "chat_macros[7]", doom_txt["HUSTR_CHATMACRO7"]),
	new default_t("chatmacro8", "chat_macros[8]", doom_txt["HUSTR_CHATMACRO8"]),
	new default_t("chatmacro9", "chat_macros[9]", doom_txt["HUSTR_CHATMACRO9"]),
];

function M_LoadDefaults()
{
	for(let i = 0; i < defaults.length; i++)
	{
		defaults[i].setLocation(defaults[i].defaultvalue);
	}
}