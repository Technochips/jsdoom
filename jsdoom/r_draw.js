var translationtables;

function R_InitTranslationTables()
{
	translationtables = [];
	for(i = 0; i < 256; i++)
	{
		if(i >= 0x70 && i <= 0x7f)
		{
			translationtables[i] = 0x60 + (i&0xf);
			translationtables[i+256] = 0x40 + (i&0xf);
			translationtables[i+512] = 0x20 + (i&0xf);
		}
		else
		{
			translationtables[i] = translationtables[i+256] = translationtables[i+512] = i;
		}
	}
}