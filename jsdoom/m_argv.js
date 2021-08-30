function M_CheckParm(check)
{
	return urlParams.has(check);
}
function M_GetParm(check)
{
	return urlParams.get(check);
}