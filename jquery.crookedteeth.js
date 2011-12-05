(function( $ ){

  $.fn.crookedTeeth = function(options) {

  	// modes: when border and padding found border is the distortion amount
  	//        when padding only found, padding is the distortion amount
  	//        when padding and amount parameter found, amount is the distortion amount
  	//
  	// when no border:
  	// if background-image then we clip that otherwise use background color
  
	var settings = $.extend( {
	      'xwobble' : true,
	      'ywobble'	: true,
	      'xsymmetry': false,
	      'ysymmetry': false,
	    }, options)
    
    return this.each(function() { 

      var $this = $(this)
      var has_border=true
      var bgc = $this.css("background-color")
      var bdc = $this.css("borderLeftColor")
      
      var vry = {
      	l: parseInt($this.css("borderLeftWidth"),10) || 0,
      	t: parseInt($this.css("borderTopWidth"),10) || 0,
      	r: parseInt($this.css("borderRightWidth"),10) || 0,
      	b: parseInt($this.css("borderBottomWidth"),10) || 0
      }
      has_border=( (vry.l|vry.t|vry.r|vry.b) > 0)
      
      var pad = {
      	l: parseInt($this.css("padding-left"),10) || 0,
      	t: parseInt($this.css("padding-top"),10) || 0,
      	r: parseInt($this.css("padding-right"),10) || 0,
      	b: parseInt($this.css("padding-bottom"),10) || 0
      }
      
      if(!has_border) {
      
      	if(typeof settings.amount == 'undefined') {
      		vry=pad
      	} else {
	      	if(typeof settings.amount == 'number') {
	      		vry.l=vry.t=vry.r=vry.b=settings.amount
	      	} else if(typeof settings.amount == 'string') {
	      	
	      		var wobs = settings.amount.split(" ")
	      		switch(wobs.length) {
	      		
	      			case 1:
	      				vry.l=vry.t=vry.r=vry.b=parseInt(wobs[0],10)
	      				break
	      			case 2:
	      				vry.t=vry.b=parseInt(wobs[0],10)
	      				vry.l=vry.r=parseInt(wobs[1],10)
	      				break
	      			case 3:
	      				vry.t=parseInt(wobs[0],10)
	      				vry.l=vry.r=parseInt(wobs[1],10)
	      				vry.b=parseInt(wobs[2],10)
	      				break
	      			case 4:
	      				vry.t=parseInt(wobs[0],10)
	      				vry.r=parseInt(wobs[1],10)
	      				vry.b=parseInt(wobs[2],10)
	      				vry.l=parseInt(wobs[3],10)
	      				break
	      		}
      		}
      		if(vry.l>pad.l) vry.l=pad.l
      		if(vry.r>pad.r) vry.r=pad.r
      		if(vry.t>pad.t) vry.t=pad.t
      		if(vry.b>pad.b) vry.b=pad.b
      	}
      }
      
      var fwidth  = $this.outerWidth()
      var fheight = $this.outerHeight()
      
      // define our 4 points
      var tl = {x:vry.l-rndInt(vry.l),y:vry.t-rndInt(vry.t)}
      var tr = {x:fwidth-vry.r+rndInt(vry.r),y:vry.t-rndInt(vry.t)}
      var bl = {x:vry.l-rndInt(vry.l),y:fheight-vry.b+rndInt(vry.b)}
      var br = {x:fwidth-vry.r+rndInt(vry.r),y:fheight-vry.b+rndInt(vry.b)}
      
      if(settings.xsymmetry) {
      	tr.x = fwidth-tl.x
      	br.x = fwidth-bl.x
      }
      
      if(settings.ysymmetry) {
      	bl.y = fheight-tl.y
      	br.y = fheight-tr.y
      }
      
      if(!settings.xwobble)
      {
      	tl.x=bl.x=0
      	tr.x=br.x=fwidth
      }
      
      if(!settings.ywobble)
      {
      	tl.y=tr.y=0
      	bl.y=br.y=fheight
      }
      
      if(settings.connect && settings.connect=='vertical') {
      	if($this.data("tl")) tl = $this.data("tl")
      	if($this.data("tr")) tr = $this.data("tr")
      	
      	if($this.next().size()>0) {
      		 $this.next().data({"tl":{x:bl.x,y:0},"tr":{x:br.x,y:0}})
      		 bl.y=br.y=fheight
      	}
      }
      
      if(settings.connect && settings.connect=='horizontal') {
      	if($this.data("tl")) tl = $this.data("tl")
      	if($this.data("bl")) bl = $this.data("bl")
      	
      	if($this.next().size()>0) {
      		 $this.next().data({"tl":{x:0,y:tr.y},"bl":{x:0,y:br.y}})
      		 tr.x=br.x=fwidth
      	}
      }
     
     
     try {
     
     var cvs = $("<canvas width='"+(fwidth)+"' height='"+(fheight)+"'></canvas>")
     var ctx = cvs.get(0).getContext('2d')
     
     var bgi = $this.css("background-image")
     if(bgi=='none') {
     
	     ctx.fillStyle = has_border ? bdc : bgc
	     ctx.beginPath()
	     ctx.moveTo(tl.x,tl.y)
	     ctx.lineTo(tr.x,tr.y)
	     ctx.lineTo(br.x,br.y)
	     ctx.lineTo(bl.x,bl.y)
	     ctx.closePath()
	     ctx.fill()
	     
	     //draw bg if different from border
	     if(has_border && bgc!=bdc)
	     {
	     	ctx.fillStyle=bgc
	     	ctx.beginPath()
	     	ctx.rect(vry.l,vry.t,fwidth-vry.l-vry.r,fheight-vry.t-vry.b)
	     	ctx.closePath()
	     	ctx.fill()
	     }
	     
	     var bi = cvs.get(0).toDataURL("image/png")
	     if(has_border)
	     {
	     	$this.css("border-width",0)
	     	$this.css("padding",(pad.t+vry.t)+"px "+(pad.r+vry.r)+"px "+(pad.b+vry.b)+"px "+(pad.l+vry.l)+"px ")
	     }
	     $this.css({"background-color":"transparent","background-image":"url('"+bi+"')"})
     } else {
     	var img = new Image()
     	img.onload = function() {
     	
     		ctx.fillStyle = ctx.createPattern(this, $this.css("background-repeat")) 
     	
     		ctx.beginPath()
			ctx.moveTo(tl.x,tl.y)
			ctx.lineTo(tr.x,tr.y)
			ctx.lineTo(br.x,br.y)
			ctx.lineTo(bl.x,bl.y)
     		ctx.closePath()
     		ctx.fill()
     		try {
     			var bi = cvs.get(0).toDataURL("image/png")
     			$this.css({"background-color":"transparent","background-image":"url('"+bi+"')"})
     		} catch(err) {}
     	
     	}
     	img.src=bgi.substring(4,bgi.length - 1)   
     }
     
     } catch (err) {
     
     	if(document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) {
	     	var bgi = $this.css("background-image")
	     	if(bgi=='none') {
	     		
	     		var bg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='"+fwidth+"' height='"+fheight+"'>"
	     		    bg+= "<polygon points='"+tl.x+","+tl.y+","+tr.x+","+tr.y+","+br.x+","+br.y+","+bl.x+","+bl.y+"' style='fill:"+bgc+";stroke-width:0'/>"
	     		    bg+= "</svg>"
	
				if(has_border)
				{
					$this.css("border-width",0)
					$this.css("padding",(pad.t+vry.t)+"px "+(pad.r+vry.r)+"px "+(pad.b+vry.b)+"px "+(pad.l+vry.l)+"px ")
				}
				$this.css({"background-color":"transparent","background-image":"url(\""+bg+"\")"})  	
	     		
	     	} else {

	     	    var img = new Image()
	     	    img.onload = function() {
	     	    	var tw = this.width
	     	    	var th = this.height
		     		var pattern = "<pattern id='bgtext' patternUnits='userSpaceOnUse' width='"+tw+"' height='"+th+"'><image xlink:href='"+bgi.substring(4,bgi.length - 1)+"' width='"+tw+"' height='"+th+"' /></pattern>"
		     		var bg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='"+fwidth+"' height='"+fheight+"'>"
		     			bg += pattern
		     			bg+= "<polygon points='"+tl.x+","+tl.y+","+tr.x+","+tr.y+","+br.x+","+br.y+","+bl.x+","+bl.y+"' style='fill:url(#bgtext);stroke-width:0'/>"
		     			bg+= "</svg>"
		     			
					if(has_border)
					{
						$this.css("border-width",0)
						$this.css("padding",(pad.t+vry.t)+"px "+(pad.r+vry.r)+"px "+(pad.b+vry.b)+"px "+(pad.l+vry.l)+"px ")
					}
					$this.css({"background-color":"transparent","background-image":"url(\""+bg+"\")"})  
				}
				img.src=bgi.substring(4,bgi.length - 1)  
	     	}
	     }
     }

     function rndInt(max) {
     	return Math.round(Math.random()*max)
     }

    })

  }
})( jQuery )