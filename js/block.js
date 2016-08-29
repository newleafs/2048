Block.prototype={
	createDiv: function(){
		var div = document.createElement("div");
		return div;
	},
	addStyle:function(top,left){
		this.div.innerHTML = 2;
		this.div.style.top = top+'px';
		this.div.style.left = left+'px';
		this.div.style.background = this.color;
		this.div.className = "newDiv";
		$(".container").append(this.div);
	},
	getLisAxis: function(){
		var col = Math.floor(Math.random()*4);
		var row = Math.floor(Math.random()*4);
		if (axis[row][col] == 0) {
			this.x = col*(width+5);
			this.y = row*(height+5);
			this.col = col;
			this.row = row;
			axis[row][col] = 1;
		}else{
			row = Math.floor(Math.random()*4);
			col = Math.floor(Math.random()*4);
			this.x = col*(width+5);
			this.y = row*(height+5);
			this.col = col;
			this.row = row;
		}
		this.div = this.createDiv();
		this.addStyle(this.y,this.x);
	}
}
function Block(){
	this.x;
	this.y;
	this.col;
	this.row;
	this.div;
	this.color = "rgba(255, 0, 0, 0.79)";
	this.getLisAxis();
}