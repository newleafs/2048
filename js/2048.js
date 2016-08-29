var block = [],
	width = $("#li0").width();
	height = $("#li0").height();
var axis = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];
function init(){
	var block1 = new Block();
	var block2 = new Block();
	if (block1.x == block2.x && block1.y == block2.y) {
		block2 = new Block();
	}
	block.push(block1);
	block.push(block2);

}
function changLeftModel(){
	//右移
	var len = block.length;
	for (var i = 0;i<len;i++) {
		axis[block[i].row][block[i].col] = 0;
		//合并
		// lcombine(axis,i,block[i].row);
		Left(axis,i,block[i].row);
	}
	//随机产生数字
	randomNum();
}
// function lcombine(a,i,row){   
//     for(var j=0;j<2;j++){
//         if (block[row][j] == block[row][j+1]){
//           block[i][j] *=2;
//           [i][j+1] = 0;
//           left(a,i);
//           break;
//         }
//     }
// }
function Left(t,i,row){
    var j;
    for (j=3;j>3;j--){
        if (t[row][j] == 0 && t[row][j-1] != 0){
            temp = t[i][j];
            t[row][j] = t[row][j+1];
            t[row][j-1] = temp;
            block[i].addStyle(block[i].y,j*(width+5)); 
			t[row][j] = 1;
           // left(t,i,row);  
        }
    }
            
}
function changRightModel(){
	//右移
	var len = block.length;
	for (var i = 0;i<len;i++) {
		axis[block[i].row][block[i].col] = 0;
		Right(axis,i,block[i].row);
	}
	//随机产生数字
	randomNum();
}
function randomNum(){
	var blocks = new Block();
	block.push(blocks);
}
function Right(t,i,row){
    var j;
    for (j=0;j<3;j++){
        if (t[row][j] == 0 && t[row][j+1] != 0){
            temp = t[i][j];
            t[row][j] = t[row][j+1];
            t[row][j+1] = temp;
            block[i].addStyle(block[i].y,j*(width+5)); 
			t[row][j] = 1;
           // left(t,i,row);  
        }
    }
            
}
function changUpModel(){
	//上移
	for (var i=0,lens=block.length;i<lens;i++) {
		axis[block[i].row][block[i].col] = 0;
		Up(axis,i,block[i].col);
	}
}
function Up(t,i,col){
    var j;
    for (j=3;j>0;j--){
        if (t[j][col] == 0 && t[j-1][col] != 0){
            temp = t[i][j];
            t[j][col] = t[j-1][col];
            t[j-1][col] = temp;
            block[i].addStyle(j*(height+5),block[i].x); 
			t[j][col] = 1;
           // left(t,i,row);  
        }
    }
            
}
function changDownModel(){
	//下移
	for (var i=0,lens=block.length;i<lens;i++) {
		axis[block[i].row][block[i].col] = 0;
		Down(axis,i,block[i].col);
	}
}
function Down(t,i,col){
	for (j=0;j<3;j++){
		
        if (t[j][col] == 0 && t[j+1][col] != 0){
            temp = t[i][j];
            t[j][col] = t[j+1][col];
            t[j+1][col] = temp;
            block[i].addStyle(j*(height+5),block[i].x); 
			t[j][col] = 1;
           // left(t,i,row);  
        }
    }
}
$(function(){
	init();
    // keycode 37 = Left
	// keycode 38 = Up
	// keycode 39 = Right
	// keycode 40 = Down
	$(document).keydown(function(event){
		switch (event.keyCode){
			case 37:
				changLeftModel();
				break;
			case 38:
				changUpModel();
				break;
			case 39:
				changRightModel();
				break;
			case 40:
				changDownModel();
				break;
			default:
				break;
		}
	});
});