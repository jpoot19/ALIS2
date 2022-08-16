var clickTimeout = 100;
var longClickTimeout = 1000;
var keyCode = 65; // tecla A.
var keyCode2 = 83; // tecla s.
var keyState = 0; //1 click, 2 click, 3 long click
var clickTimer;
var clickTime;
var longClickTimer;
var longClickStart = false;
$(document).ready(function(){
	$(document.body).keyup(function(e){
		console.log(e);
		if(e.keyCode==keyCode){
			clearTimeout(longClickTimer);
			longClickStart = false;
			if(keyState==0){
				keyState=1;
				clickTimer = setTimeout(function(){
					signal1();
					keyState=0;
				},clickTimeout);
				clickTime = e.timeStamp;
			}else if(keyState==1){
				clearTimeout(clickTimer);
				keyState = 0;
				signal2();
			}else if(keyState==3){
				keyState = 0;
			}
		}
	});
	
	$(document.body).keydown(function(e){
		if(e.keyCode==keyCode2){
            if (keyState == 0 && !longClickStart || e.keyCode == keyCode2) {
				longClickStart = true;
				longClickTimer = setTimeout(function(){
					longClickStart = false;
					keyState = 3;
					signal3();
				},longClickTimeout);
			}
		}
	});
});