function Cart()
{
	this.PrecioCorrecto;
	this.PosicionCorrecta;
}

Cart.prototype.Tienda = function()
{
	var res = renderer.m_Camara.IrTienda(renderer.m_Inventario.m_CantItems);
	

	var strspace = "";
	for(var i = 0; i < 20; i++)
		strspace += "\u00A0";

	if(res)
	{
		var d = new Date();
    		tiempoInicial  = d.getTime();
		this.PrecioCorrecto = renderer.m_Inventario.m_CostoTotal;

		for(var i = 0; i < renderer.m_Inventario.getItems().length; i++)
		{
			
			document.getElementById("item" + (i+1)).innerHTML = renderer.m_Inventario.m_Items[i].getTipo() + strspace +"Precio: " + renderer.m_Inventario.m_Items[i].getPrecio();
		}
		document.getElementById("Cart").style.zIndex = 2;
		document.getElementById("total").innerHTML = "&#191;Cu&aacute;nto es el Total?";

		var prec = this.GenerarPrecios();
		this.PosicionCorrecta = prec[1];

		for(var i = 0; i < 4; i++)
		{
			
			document.getElementById("precio" + (i+1)).innerHTML = prec[0][i];
		}
		document.getElementById("menuabout").style.visibility = 'hidden';
		document.getElementById("menumute").style.visibility = 'hidden';
		document.getElementById("menuunmute").style.visibility = 'hidden';
		document.getElementById("controlup").style.visibility = 'hidden';
		document.getElementById("controldown").style.visibility = 'hidden';
		document.getElementById("controlleft").style.visibility = 'hidden';
		document.getElementById("controlright").style.visibility = 'hidden';
		document.getElementById("controltake").style.visibility = 'hidden';
		document.getElementById("store").style.visibility = 'hidden';
		document.getElementById("menuinstrucciones").style.visibility = 'hidden';
		background.Pause();
		math.Pause();
		menu.Play();
	}
}

Cart.prototype.GenerarPrecios = function()
{
	var rand = randi(0, 3);
	console.log(rand);
	var precios = [];
	for(var i = 0; i < 4; i++)
	{
		if(i == rand){
			precios[i] = this.PrecioCorrecto;
			continue;
		}

		do
		precios[i] = randi(0, 50);
		while(precios[i] == this.PrecioCorrecto)
	}

	return [precios, rand];
}

Cart.prototype.CheckPrecios = function(index)
{
	if(index == this.PosicionCorrecta)
	{	
		var d = new Date();
    		tiempoFinal  = d.getTime();
		menu.Pause();
		background.Pause();
		math.Pause();
		final.Play();
		document.getElementById("ganaste2").innerHTML = "Ingres&aacute; tu nombre:";
		document.getElementById("ganaste3").innerHTML = "O us&aacute; facebook";
		document.getElementById("submit").style.visibility = 'visible';		
		document.getElementById("submittxt").style.visibility = 'visible';
		document.getElementById("precio1").style.visibility = 'hidden';
		document.getElementById("precio2").style.visibility = 'hidden';
		document.getElementById("precio3").style.visibility = 'hidden';
		document.getElementById("precio4").style.visibility = 'hidden';
		getNombreyID();
		var DeltaTiempo = (tiempoFinal - tiempoInicial)/1000;
		var puntajefinal = Math.floor((1000/DeltaTiempo)/cantIntentos);
		document.getElementById("ganaste").innerHTML = "&iexcl;Ganaste! Tu puntaje es: " + puntajefinal ;
		document.getElementById("tagScore").value = puntajefinal ;
		document.getElementById("tagAction").value = 1;
	}
	else{
		document.getElementById("precio" + (index+1)).innerHTML = "Incorrecto";
		cantIntentos += 1;
		}

}
