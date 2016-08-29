function Block(container){
	this.container = container;
	this.divs = new Array(16);
}
Block.prototype = {
	init:function(){
		for (var i = 0,len=this.divs.length;i<len;i++) {
			var div = this.createDiv(0);
			div.setAttribute("index",i);
			this.container.appendChild(div);
			this.divs[i] = div;
		}
		this.randomDiv();
		this.randomDiv();
	},
	createDiv:function(value){
		var div = document.createElement("div");
		this.setvalue(div,value);
		return div;
	},
	setvalue:function(div,value){
		div.className = "newDiv div" + value;
		div.setAttribute('val',value);
		div.innerHTML = value > 0 ? value : '';
	},
	randomDiv:function(){
		var zero = [];
		for (var i = 0,len = this.divs.length;i<len;i++) {
			if (this.divs[i].getAttribute('val') == 0) {
				zero.push(this.divs[i]);
			}
		}
		var rDiv = zero[Math.floor(Math.random()*zero.length)];
		this.setvalue(rDiv,Math.random()< 0.8? 2 : 4);
	},
	move:function(keychar){
		var j;
		switch (keychar){
			case 'W':
	            for(var i = 4, len = this.divs.length; i < len; i++){
	                j = i;
	                while(j >= 4){
	                    this.merge(this.divs[j - 4], this.divs[j]);
	                    j -= 4;
	                }
	            }
            break;
            case 'S':
		        for(var i = 11; i >= 0; i--){
		            j = i;
		            while(j <= 11){
		                this.merge(this.divs[j + 4], this.divs[j]);
		                j += 4;
		            }
		        }
		        break;
			case 'A':
				for (var i = 1,len = this.divs.length;i<len;i++) {
					j = i
					if (j%4 != 0) {
						this.merge(this.divs[j-1],this.divs[j]);
						j-=1;
					}
				};
			break;
			case 'D':
				for (var i = 14;i>=0;i--) {
					j = i
					if (j%4 != 3) {
						this.merge(this.divs[j+1],this.divs[j]);
						j+=1;
					}
				};
			break;
		}
		this.randomDiv();
	},
	merge:function(preDiv,curDiv){
		var preVal = preDiv.getAttribute('val');
		var curVal = curDiv.getAttribute('val');
		if (curVal != 0) {
			if (preVal == 0) {
				this.setvalue(preDiv,curVal);
				this.setvalue(curDiv,0);
			}else if(preVal == curVal){
				this.setvalue(preDiv,curVal*2);
				this.setvalue(curDiv,0);
			}
		}
	},
	clean:function(){
		for (var i = 0,len=this.divs.length;i<len;i++) {
			this.container.removeChild(this.divs[i]);
		}
		this.divs = new Array(16);
	},
	equal: function(tile1, tile2){
        return tile1.getAttribute('val') == tile2.getAttribute('val');
    },
    max: function(){
        for(var i = 0, len = this.divs.length; i < len; i++){
            if(this.divs[i].getAttribute('val') == 2048){
                return true;
            }
        }
    },
    over: function(){
        for(var i = 0, len = this.divs.length; i < len; i++){
            if(this.divs[i].getAttribute('val') == 0){
                return false;
            }
            if(i % 4 != 3){
                if(this.equal(this.divs[i], this.divs[i + 1])){
                    return false;
                }
            }
            if(i < 12){
                if(this.equal(this.divs[i], this.divs[i + 4])){
                    return false;
                }
            }
        }
        return true;
    }


}

window.onload = function(){
	var list = document.getElementById("list");
	
	var game = game || new Block(list);
	game.init();


	window.onkeydown = function(e){
		var keynum,keychar;
		if (window.event) {
			keynum = e.keyCode;
		}else if(e.which){
			keynum = e.which;
		}
		var keychar = String.fromCharCode(keynum);
		if (['W','S','A','D'].indexOf(keychar) > -1) { 
			if (game.over()) {
				game.clean();
				list.className += ' over';
           	 	list.innerHTML = 'game over';
            	return;
			}
			game.move(keychar);
		}
	}
}