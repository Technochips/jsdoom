function I_Error(error)
{
	alert(error);
	throw new Error(error); // makes sure the javascript stops
}