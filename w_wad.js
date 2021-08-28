var numlumps
var lumpinfo
var allfiles

function ExtractFileBase(filename)
{
	var r = filename.toString().match(/.*\/(.+?)\./)[1].toUpperCase();
	if(r.length > 8)
	{
		I_Error("Filename base of " + filename + " >8 chars");
	}
	return r
}

function W_AddFile(filename, iswad)
{
	var request = new XMLHttpRequest();
	request.open('GET', filename, false);
	request.overrideMimeType('text\/plain; charset=x-user-defined');
	request.send();

	if(request.status != 200)
	{
		console.log(" couldn't open " + filename);
		return;
	}

	console.log(" adding " + filename);

	var currentHandle = allfiles.length;

	var buffer = Uint8Array.from(request.response, c => c.charCodeAt(0)).buffer;
	allfiles.push(buffer);

	if(!iswad)
	{
		var lump = {};

		lump.position = 0;
		lump.handle = currentHandle;
		lump.size = request.response.length;
		lump.content = new Uint8Array(allfiles[currentHandle]);
		lump.name = ExtractFileBase(filename);

		lumpinfo.push(lump);
		numlumps++;

		return;
	}

	let magic = request.response.substring(0, 4);
	if(magic != "IWAD")
	{
		if(magic != "PWAD")
		{
			I_Error("Wad file " + filename + " doesn't have IWAD or PWAD id");
		}
	}
	let header = new Int32Array(buffer, 4, 2);
	
	let hnumlumps = CorrectInt32Endianness(header[0], "little");
	let hinfotableofs = CorrectInt32Endianness(header[1], "little");
	numlumps += hnumlumps
	
	for(let i = 0; i < hnumlumps; i++)
	{
		var lump_p = {};
		lump_p.handle = currentHandle;

		let infotable = new Int32Array(buffer, hinfotableofs, 2);

		lump_p.position = CorrectInt32Endianness(infotable[0], "little");
		lump_p.size = CorrectInt32Endianness(infotable[1], "little");
		lump_p.name = decoder.decode(new Uint8Array(buffer, hinfotableofs + 8, 8)).replace(/\0.*$/g,'');
		lump_p.content = new Uint8Array(buffer, lump_p.position, lump_p.size);

		hinfotableofs += 16;
		lumpinfo.push(lump_p);
	}
}

function W_InitMultipleFiles(filenames, iswadfiles)
{
	numlumps = 0;
	lumpinfo = []
	allfiles = []

	for(let i = 0; i < filenames.length; i++)
	{
		W_AddFile(filenames[i], iswadfiles[i]);
	}

	if(!numlumps)
	{
		I_Error("W_InitFiles: no files found");
	}
}

function W_CheckNumForName(name)
{
	for(let i = numlumps-1; i--; i >= 0)
	{
		if(lumpinfo[i].name == name.toUpperCase()) return i;
	}
	return -1;
}

function W_GetNumForName(name)
{
	let i = W_CheckNumForName(name);

	if(i == -1)
		I_Error("W_GetNumForName: " + name + " not found!");

	return i
}