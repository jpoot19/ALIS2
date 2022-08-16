var snd = new Audio("/audios/flappysound.mp3");
var auxSignal1 = signal1;
var auxSignal2 = signal2;
var auxSignal3 = signal3;
/*
var auxSignal1 = signal1;
signal1 = function (){
$( document ).ready( Got_Player_Input("touchstart"));	
		
}
var auxSignal2 = signal2;
signal2 = function (){
$( document ).ready( Got_Player_Input("touchstart") );	
}

var auxSignal3 = signal3;
signal3 = function(){
	window.location.href="/";
}*/
											
$(document).ready(function(){
	signal1 = function (){
	//alert("1");
	 Got_Player_Input("touchstart");	
	snd.play();		
	}
	signal2 = signal1;

	signal3 = function(){
		window.location.href="/";
	}
});