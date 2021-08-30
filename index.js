function buttonplay()
{
	let iwad = document.getElementById("iwad-file");
	if(iwad.files.length == 0) return;
	activategame("iwad=" + URL.createObjectURL(iwad.files[0]));
}

function activategame(args)
{
	document.getElementById("playarea").innerHTML = '<iframe id="jsdoom" width="320" height="200" src="jsdoom/jsdoom.html?' + args + '"></iframe>';
}