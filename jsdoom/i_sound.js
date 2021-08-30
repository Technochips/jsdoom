const SAMPLECOUNT = 512;
const BUFMUL = 4;
const MIXBUFFERSIZE = (SAMPLECOUNT*BUFMUL);

var lengths = [];

var audio_fd;

var mixbuffer = [];

var steptable = [];

var vol_lookup = [];

function getsfx(sfxname, lenarray, leni)
{
	let name = "ds" + sfxname;

	let sfxlump = W_CheckNumForName(name);
	if(sfxlump == -1)
		sfxlump = W_GetNumForName("dspistol");
	
	let size = lumpinfo[sfxlump].size;

	let sfx = W_CacheLumpNum(sfxlump);
	let sfx8 = new Uint8Array(sfx);

	let paddedsize = ((size-8 + (((SAMPLECOUNT-1)) / SAMPLECOUNT)|0)) * SAMPLECOUNT;

	let paddedsfx = new Uint8Array(paddedsize);
	for(let i = 0; i < paddedsize; i++)
	{
		paddedsfx[i] = sfx[i+8];
	}
	return paddedsfx.buffer;
}

function I_SetChannels()
{
	for(let i = -128; i < 128; i++)
		steptable[i+128] = (Math.pow(2, i/64)*65536)|0;
	
	for(let i = 0; i < 128; i++)
		for(let j = 0; j < 256; j++)
			vol_lookup[i*256+j] = ((i*(j-128)*256)/127)|0;
}

function I_SetSfxVolume(volume)
{
	snd_SfxVolume = volume;
}

function I_SetMusicVolume(volume)
{
	snd_MusicVolume = volume;
	// TODO: actually make it change music?
}

function I_InitSound()
{
	if(!(typeof (window.AudioContext || window.webkitAudioContext) === "function"))
		console.error("I_InitSound: Could not open audio context");
	audio_fd = new (window.AudioContext || window.webkitAudioContext)();
	console.info("I_InitSound: configured audio device");

	for(let i = 0; i < sfxenum_t.length; i++)
	{
		if(!S_sfx[i].link)
		{
			S_sfx[i].data = getsfx(S_sfx[i].name, lengths, i);
		}
		else
		{
			S_sfx[i].data = S_sfx[S_sfx[i].link].data;
			lengths[i] = lengths[(S_sfx[i].link)];
		}
	}

	console.info("I_InitSound: pre-cached all sound data");

	for(let i = 0; i < MIXBUFFERSIZE; i++)
		mixbuffer[i] = 0;
	
	console.info("I_InitSound: sound module ready");
}