class channel_t
{
	sfxinfo = new sfxinfo_t();
	origin = null;
	handle = 0;
}

var channels;

var snd_SfxVolume = 15;
var snd_MusicVolume = 15;

var mus_paused;

var numChannels;

function S_Init(sfxVolume, musicVolume)
{
	console.info("S_Init: default sfx volume " + sfxVolume);

	I_SetChannels();

	S_SetSfxVolume(sfxVolume);
	S_SetMusicVolume(musicVolume);

	channels = [];

	mus_paused = false;

	for(let i = 0; i < sfxenum_t.length; i++)
		S_sfx[i].lumpnum = S_sfx[i].usefulness = -1;
}

function S_SetMusicVolume(volume)
{
	if(volume < 0 || volume > 127)
	{
		I_Error("Attempt to set music volume at " + volume);
	}

	I_SetMusicVolume(127);
	I_SetMusicVolume(volume);
	snd_MusicVolume = volume;
}

function S_SetSfxVolume(volume)
{
	if(volume < 0 || volume > 127)
		I_Error("Attempt to set sfx volume at " + volume);
	
	snd_SfxVolume = volume;
}