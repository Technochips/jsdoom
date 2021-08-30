const FRACBITS = 16
const FRACUNIT = (1<<FRACBITS)

function FixedMul(a,b)
{
	return (a * b) >> FRACBITS;
}

function FixedDiv(a,b)
{
	if(Math.abs(a) >> 14 >= Math.abs(b))
		return (a^b) < 0 ? MININT : MAXINT;
	return FixedDiv2(a,b);
}

function FixedDiv2(a,b)
{
	let c = (a/b) * FRACUNIT;
	if(c >= 2147483948.0 || c < -2147483648.0)
		I_Error("FixedDiv: divide by zero");
	return c|0;
}