var testarray = ["Men have called me mad; but the question is not yet settled, whether madness is or is not the loftiest intelligence-  whether much that is glorious- whether all that is profound- does not spring from disease of thought- from moods of mind exalted at the expense of the general intellect.",      
"Coincidences, in general, are great stumbling blocks in the way of that class of thinkers who have been educated to know nothing of the theory of probabilities- that theory to which the most glorious objects of human research are indebted for the most glorious of illustration.",
"Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure. It is our       light, not our darkness that most frightens us.' We ask ourselves, Who am I to be brilliant, gorgeous, talented, and fabulous? Actually, who are you not to be? You are a child of God. Your playing small does not serve the world."];


window.onload = function ()
{
    typer(".typer1").setModus(1).setSpeed(500).start();
    typer(".typer2").init(testarray[1]).setModus(2).setCursor(true).start();
    typer(".typer3").init(testarray).setOptions({modus: 3, speed: 40, repeat: true, clearSpeed: 10}).start()
}

var typer = function (targetElm) {
    if (typeof (targetElm) === 'object') {
      return new Typer(targetElm);
    } 
    else if (typeof (targetElm) === 'string') {
      var targetElement = document.querySelector(targetElm);

      if (targetElement) {
        return new Typer(targetElement);
      } 
      else {
        throw new Error('There is no element with given selector.');
      }

    } 
    else {
      return new Typer(document.querySelector(".typer"));
    }
};

function Typer(obj){   
    this._options = {
      speed: 80,	    
      clearSpeed: 40,
      modus: 1,
      cursor: true,
      repeat: false
    };

    this._element = obj;

    if(!(this._element.className == "typerArea")){
        var text;
        var typerArea = document.createElement("span");
        var typerAreas =  this._element.getElementsByClassName("typerArea");        

        for(var i=0;i<typerAreas.length;i++){
            this._element.removeChild(typerAreas[i]);
        }        

        if(this._element.childNodes.length > 0){
          text = this._element.childNodes[0].nodeValue
          this._element.childNodes[0].nodeValue = null;
        }else{
          text = "";
        }       
        
        typerArea.className = "typerArea";        
        this._element.appendChild(typerArea);  
        this._element = typerArea;
        this.init(text);    
    }else{
      if(this._element.childNodes.length == 0){
        this.init("");    
      }else{    
         this.init(this._element.childNodes[0].nodeValue);    
      }      
    }

  this.clearTextSelect = function(){        
      switch(this._options.modus)
      {
        
        case 1:
              this._characterIndex = 0;  
        break;
        case 2:
            this._characterIndex --;    

            var text = this._element.childNodes[0].nodeValue.substring(0,this._characterIndex);         
            this._element.replaceChild(document.createTextNode(text),this._element.childNodes[0]); 
        break;
        case 3:
            this._characterIndex --;    

            var text = this._element.childNodes[0].nodeValue.substring(0,this._characterIndex);
            var highlightText = this._element.childNodes[0].nodeValue.substring(this._characterIndex);
            var highlight = this._element.querySelector(".highlight");

            if(highlight == null){
                highlight = document.createElement("span");
                highlight.className = "highlight";
                highlight.appendChild(document.createTextNode(highlightText));
                this._element.appendChild(highlight);
            }else{        
                highlightText += highlight.childNodes[0].nodeValue;
                highlight.replaceChild(document.createTextNode(highlightText), highlight.childNodes[0]);
            }

            this._element.replaceChild(document.createTextNode(text),this._element.childNodes[0]); 

           
          break;
      }
    
      
      if(this._characterIndex == 0){
        clearInterval(this.clearTextInterval);
        this._element.innerHTML = "";
        this.interval = setInterval(this.type.bind(this), this._options.speed);
      }

      return this;
  }  


  this.type = function(){    
    if(this._characterIndex < this._length[this._stringIndex]){    
        var text;

        if(this._element.childNodes.length == 0)
        {
           this._element.appendChild(document.createTextNode(""));
        }
        
        text = this._element.childNodes[0].nodeValue;
        

        if(this._characters[this._stringIndex][this._characterIndex] == " ")
        {
            text += this._characters[this._stringIndex][this._characterIndex];
            this._characterIndex ++; 
        }        

        text += this._characters[this._stringIndex][this._characterIndex];
        this._element.childNodes[0].nodeValue = text;

        this._characterIndex ++;             
    }else{          
      clearInterval(this.interval);     
      
      if(this._stringIndex == this._characters.length-1 && this._options.repeat){        
        this._stringIndex = 0;
        this.clearText(); 
      }
      else if(this._stringIndex < this._characters.length-1){           
        this._stringIndex ++;
        this.clearText();               
      }else{
        if(this._options.cursor){
          this._element.style.borderRight = "none";
         }         
      }

    }

    return this;
  }
}

typer.fn = Typer.prototype = {
  init: function(value){        
  	this._characters = new Array();	
  	this._length = new Array();
  	this._characterIndex = new Array();
  		
  	this._stringIndex = 0;
  	this._characterIndex = 0 ;
  		
  	if(typeof (value) === 'string'){		
  		this._characters[0] = value.split('');		
  		this._length[0] = value.length;		
  	}else if(value instanceof Array){
  		for(var i=0;i<value.length;i++){
  			this._characters[i] = value[i].split('');		
  			this._length[i] = value[i].length;			
  		}		
  	}else{
  		throw new Error("No string nor array");
  	}
    
    return this;
  },
  setSpeed: function(value){
    this._options.speed = value;
    return this;
  },
  setClear: function(value){
    this._options.clearSpeed = value;
    return this;
  },
  setModus: function(value){
    this._options.modus = value;
    return this;
  },
  setRepeat: function(value){
    this._options.repeat = value;
    return this;
  },
  setCursor: function(value){
		this._options.cursor = value;
		return this;
  },  
  setOptions: function(value) {
      var options = {};
      
      for (var attrname in this._options) { options[attrname] = this._options[attrname]; }
      for (var attrname in value) { options[attrname] = value[attrname]; }
      
      this._options = options;

      return this;
    },
  start: function(){    
    if(this._element.childNodes.length > 0){
      this._element.childNodes[0].nodeValue = "";
    }

    if(this._options.cursor){        
      this._element.style.borderRight = "1px solid black";
    }

    this.interval = setInterval(this.type.bind(this), this._options.speed);
    return this;
  },
  clearText: function(){  
    this.clearTextInterval = setInterval(this.clearTextSelect.bind(this), this._options.clearSpeed);
  }  
}



