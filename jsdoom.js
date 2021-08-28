const urlParams = new URLSearchParams(window.location.search);

const decoder = new TextDecoder("utf-8")

function CheckEndianness()
{
	let array8 = new Uint8Array([0x00, 0x01]);
	let array16 = new Uint16Array(array8.buffer);
	switch(array16[0])
	{
		case 0x0001:
			return "big";
		case 0x0100:
			return "little";
	}
}

const endianness = CheckEndianness();

function CorrectUint16Endianness(value, endian)
{
	if(endian == endianness) return value;

	if(value > 0xFFFF || value < 0x0000) throw new Error("Value out of bound");

	return ((value & 0xFF) << 8)
			| ((value >> 8) & 0xFF);
}

function CorrectUint32Endianness(value, endian)
{
	if(endian == endianness) return value;

	if(value > 0xFFFFFFFF || value < 0x00000000) throw new Error("Value out of bound");

	return ((value & 0x00FF) << 24)
			| ((value & 0xFF00) << 8)
			| ((value >> 8) & 0xFF00)
			| ((value >> 24) & 0x00FF);
}

function CorrectInt16Endianness(value, endian)
{
	if(endian == endianness) return value;
	if(value > 32767 || value < -32768) throw new Error("Value out of bound");

	var r = value;
	if(r < 0) r += 65536

	var r = CorrectUint16Endianness(value, endian);

	if(r > 32767) r -= 65536;

	return r;
}

function CorrectInt32Endianness(value, endian)
{
	if(endian == endianness) return value;
	if(value > 2147483647 || value < -2147483648) throw new Error("Value out of bound");

	var r = value;
	if(r < 0) r += 4294967296

	var r = CorrectUint32Endianness(value, endian);

	if(r > 2147483647) r -= 4294967296;

	return r;
}

D_DoomMain();