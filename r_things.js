var negonearray = [];

var sprites;

var sprtemp;
var maxframe;
var spritename;

function R_InstallSpriteLump(lump, frame, rotation, flipped)
{
	if(frame >= 29 || rotation > 8)
		I_Error("R_InstallSpriteLump: Bad frame characters in lump " + lump);
	
	{
		let iframe = frame;
		if(iframe > 2147483647) iframe -= 4294967296;
		if(iframe > maxframe)
			maxframe = frame;
	}

	if(rotation == 0)
	{
		if(sprtemp[frame].rotate == false)
			I_Error("R_InitSprites: Sprite " + spritename + " frame " + String.fromCharCode(frame + 65) + " has multip rot=0 lump");
		if(sprtemp[frame].rotate == true)
			I_Error("R_InitSprites: Sprite " + spritename + " frame " + String.fromCharCode(frame + 65) + " has rotations and a rot=0 lump");
		
		sprtemp[frame].rotate = false;
		for(let r = 0; r < 8; r++)
		{
			sprtemp[frame].lump[r] = lump - firstspritelump;
			sprtemp[frame].flip[r] = flipped ? 1 : 0;
		}
		return;
	}

	if(sprtemp[frame].rotate == false)
		I_Error("R_InitSprites: Sprite " + spritename + " frame " + String.fromCharCode(frame + 65) + " has rotations and a rot=0 lump");
	
	sprtemp[frame].rotate = true;

	rotation--;
	if(sprtemp[frame].lump[rotation] != -1)
		I_Error("Sprite " + spritename + " : " + String.fromCharCode(frame + 65) + " : " + String.fromCharCode(rotation + 45) + " has two lumps mapped to it");
	
	sprtemp[frame].lump[rotation] = lump - firstspritelump;
	sprtemp[frame].flip[rotation] = flipped ? 1 : 0;
}

function R_InitSpriteDefs(namelist)
{
	let frame;
	let rotation;
	let patched;

	let numsprites = namelist.length;

	if(!numsprites)
		return;
	
	sprites = [];

	let start = firstspritelump-1;
	let end = lastspritelump+1;

	for(let i = 0; i < numsprites; i++)
	{
		spritename = namelist[i];
		sprtemp = [];
		for(let j = 0; j < 29; j++) // literally fills it with -1
		{
			sprtemp[j] = new spriteframe_t();
			sprtemp[j].rotate = -1;
			for(let k = 0; k < 8; k++)
			{
				sprtemp[j].lump[k] = -1;
				sprtemp[j].flip[k] = 0xFF;
			}
		}

		maxframe = -1;

		for(let l = start + 1; l < end; l++)
		{
			if(lumpinfo[l].name.substring(0,4) == spritename)
			{
				frame = lumpinfo[l].name.charCodeAt(4) - 65; // A
				rotation = lumpinfo[l].name.charCodeAt(5) - 48; // 0

				if(modifiedgame)
					patched = W_GetNumForName(lumpinfo[l].name);
				else
					patched = l;
				
				R_InstallSpriteLump(patched, frame, rotation, false);

				if(lumpinfo[l].name.length > 6)
				{
					frame = lumpinfo[l].name.charCodeAt(6) - 65; // A
					rotation = lumpinfo[l].name.charCodeAt(7) - 48; // 0
					R_InstallSpriteLump(l, frame, rotation, true);
				}
			}
		}

		sprites[i] = new spritedef_t();

		if(maxframe == -1)
		{
			sprites[i].numframes = 0;
			continue;
		}

		maxframe++;

		for(frame = 0; frame < maxframe; frame++)
		{
			switch(sprtemp[frame].rotate)
			{
				case -1:
					I_Error("R_InitSprites: No patches found for " + namelist[i] + " frame " + String.fromCharCode(frame + 65));
					break;
				case false:
					break;
				case true:
					for(rotation = 0; rotation < 8; rotation++)
						if(sprtemp[frame].lump[rotation] == -1)
							I_Error("R_InitSprites: Sprite " + namelist[i] + " frame " + String.fromCharCode(frame + 65) + " is missing rotations");
					break;
			}
		}

		sprites[i].numframes = maxframe;
		sprites[i].spriteframes = sprtemp;
	}
}

function R_InitSprites(namelist)
{
	for(let i = 0; i < SCREENWIDTH; i++)
	{
		negonearray[i] = -1;
	}

	R_InitSpriteDefs(namelist);
}