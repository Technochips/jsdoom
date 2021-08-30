const SAMPLECOUNT = 512;
const BUFMUL = 4;
const MIXBUFFERSIZE = (SAMPLECOUNT*BUFMUL);

var lengths = [];

var audio_fd;

var mixbuffer = [];

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