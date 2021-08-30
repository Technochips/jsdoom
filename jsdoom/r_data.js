class mappatch_t
{
	originx = 0;
	originy = 0;
	patch = 0;
	stepdir = 0;
	colormap = 0;
	constructor(buffer, offset, patchlookup)
	{
		this.originx = GetInt16(buffer, offset, "little");
		this.originy = GetInt16(buffer, offset + 2, "little");
		this.patch = patchlookup[GetInt16(buffer, offset + 4, "little")];
		this.stepdir = GetInt16(buffer, offset + 6, "little");
		this.colormap = GetInt16(buffer, offset + 8, "little");
	}
}

class maptexture_t
{
	name = null;
	masked = 0;
	width = 0;
	height = 0;
	patchcount = 0;
	patches = [];
	constructor(buffer, offset, patchlookup)
	{
		this.name = GetString(buffer, offset, 8);
		this.masked = GetInt32(buffer, offset + 8, "little");
		this.width = GetInt16(buffer, offset + 12, "little");
		this.height = GetInt16(buffer, offset + 14, "little");
		this.patchcount = GetInt16(buffer, offset + 20, "little");
		for(let i = 0; i < this.patchcount; i++)
		{
			this.patches[i] = new mappatch_t(buffer, offset + 22 + (i * 10), patchlookup);
		}
	}
}

var texturecolumnlump;
var texturecolumnofs;
var texturecomposite;
var texturecompositesize;
var texturewidthmask;
var textureheight;
var textures;
var numtextures;
var texturetranslation;

var firstflat;
var lastflat;
var numflats;
var flattranslation;

var firstspritelump;
var lastspritelump;
var numspritelumps;
var spritewidth;
var spriteoffset;
var spritetopoffset;

var colormaps;

function R_DrawColumnInCache(patch, cache, originy, cacheheight)
{

}

function R_GenerateLookup(texnum)
{
	let texture = textures[texnum];

	block = [];

	texturecomposite[texnum] = 0;

	texturecompositesize[texnum] = 0;
	let collump = texturecolumnlump[texnum];
	let colofs = texturecolumnofs[texnum];

	let patchcount = [];

	for(let i = 0; i < texture.patchcount; i++)
	{
		let patch = texture.patches[i];

		let realpatch = W_CacheLumpNum(patch.patch);
		let x1 = patch.originx;
		let x2 = x1 + GetInt16(realpatch, 0, "little");

		let x;
		if(x1 < 0)
			x = 0;
		else
			x = x1;
		
		if(x2 > texture.width)
			x2 = texture.width;
		
		for(; x < x2; x++)
		{
			if(patchcount[x] == undefined) patchcount[x] = 0;
			patchcount[x]++;
			collump[x] = patch.patch;
			colofs[x] = GetUint8(realpatch, 8 + (x-x1))[0] + 3;
		}
	}
	for(let x = 0; x < texture.width; x++)
	{
		if(!patchcount[x])
		{
			console.log("R_GenerateLookup: column without a patch (" + texture.name + ")");
			return;
		}
		if(patchcount[x] > 1)
		{
			collump[x] = -1;
			colofs[x] = texturecompositesize[texnum];
			if(texturecompositesize[texnum] > 0x10000-texture.height)
			{
				I_Error("R_GenerateLookup: texture " + texnum + " is >64k");
			}
			
			texturecompositesize[texnum] += texture.height;
		}
	}
}

function R_InitTextures()
{
	let names = W_CacheLumpName("PNAMES");
	let nummappatches = GetInt32(names, 0, "little");
	let patchlookup = [];

	for(let i = 0; i < nummappatches; i++)
	{
		let name_p = GetUint8Array(names, 4+(i*8), 8);
		patchlookup[i] = W_CheckNumForName(decoder.decode(name_p).replace(/\0.*$/g,''));
	}

	let maptex, maptex1
	let numtextures1

	maptex = maptex1 = W_CacheLumpName("TEXTURE1");
	numtextures = numtextures1 = GetInt32(maptex, 0, "little");
	let maxoff = maptex.byteLength;

	let maptex2, numtextures2, maxoff2

	if(W_CheckNumForName("TEXTURE2") != -1)
	{
		maptex2 = W_CacheLumpName("TEXTURE2");
		numtextures2 = GetInt32(maptex2, 0, "little");
		maxoff2 = maptex2.byteLength;
		numtextures += numtextures2;
	}

	textures = [];
	texturecolumnlump = []
	texturecolumnofs = [];
	texturecomposite = [];
	texturecompositesize = []
	texturewidthmask = []
	textureheight = [];

	let totalwidth = 0;

	let temp1 = W_GetNumForName("S_START");
	let temp2 = W_GetNumForName("S_END") - 1;
	let temp3 = ((temp2-temp1+63)/64)|0 + ((numtextures+63)/64)|0; // |0 to get integer division

	let directory = 0;
	for(let i = 0; i < numtextures; i++, directory++)
	{
		if (!(i&63))
			console.log(".");
		
		if(i == numtextures1)
		{
			maptex = maptex2;
			maxoff = maxoff2;
			directory = 0;
		}
		
		let offset = GetInt32(maptex, 4 + (directory*4), "little");

		if(offset > maxoff)
			I_Error("R_InitTextures: bad texture directory");

		let texture = new maptexture_t(maptex, offset, patchlookup);

		textures[i] = texture;

		texturecolumnlump[i] = [];
		texturecolumnofs[i] = [];

		let j = 1;
		while(j*2 <= texture.width)
			j<<=1;
		
		texturewidthmask[i] = j-1;
		textureheight[i] = texture.height << FRACBITS;

		totalwidth += texture.width;
	}
	
	texturetranslation = []

	for(let i = 0; i < numtextures; i++)
	{
		R_GenerateLookup(i)
		texturetranslation[i] = i;
	}
}

function R_InitFlats()
{
	firstflat = W_GetNumForName("F_START") + 1;
	lastflat = W_GetNumForName("F_END") - 1;
	numflats = lastflat - firstflat + 1;
	flattranslation = [];
	for(let i = 0; i < numflats; i++)
	{
		flattranslation[i] = i;
	}
}

function R_InitSpriteLumps()
{
	firstspritelump = W_GetNumForName("S_START") + 1;
	lastspritelump = W_GetNumForName("S_END") - 1;

	numspritelumps = lastspritelump - firstspritelump + 1;

	spritewidth = []
	spriteoffset = []
	spritetopoffset = []

	for(let i = 0; i < numspritelumps; i++)
	{
		if(!(i&63))
			console.log(".");
		let patch = W_CacheLumpNum(firstspritelump+i);
		spritewidth[1] = GetUint16(patch, 0, "little");
		spriteoffset[1] = GetInt16(patch, 4, "little");
		spritetopoffset[1] = GetInt16(patch, 6, "little");
	}
}

function R_InitColormaps()
{
	let lump = W_GetNumForName("COLORMAP");
	colormaps = lumpinfo[lump].content;
}

function R_InitData()
{
	R_InitTextures();
	console.log("InitTextures");
	R_InitFlats();
	console.log("InitFlats");
	R_InitSpriteLumps();
	console.log("InitSprites");
	R_InitColormaps();
	console.log("InitColormaps");
}

function R_FlatNumForName(name)
{
	let i = W_CheckNumForName(name)
	
	if(i == -1)
	{
		I_Error("R_FlatNumForName: " + name + " not found");
	}

	return i - firstflat;
}

function R_CheckTextureNumForName(name)
{
	if(name[0] == "-")
		return 0;

	for(let i = 0; i < numtextures; i++)
		if(textures[i].name == name)
			return i;

	return -1;
}

function R_TextureNumForName(name)
{
	let i = R_CheckTextureNumForName(name);
	if(i == -1)
	{
		I_Error("R_TextureNumForName: " + name + " not found");
	}
	return i;
}