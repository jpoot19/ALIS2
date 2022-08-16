var redirectTimer;
var lmsg = 5;
$(document).load(function(){
	listMessages = ['HOLA 1','HOLA 2','HOLA 3','HOLA 4','HOLA 5'];
});

function openAudioConfigModal(modal){
	redirectTimer =  setTimeout(function(){
		localStorage.setItem("audio",true);
		window.location.href = "/dictado";
	},6000);
}
function closeAudioConfigModal(modal){
	clearTimeout(redirectTimer);
}
function disableAudio(btn){
	localStorage.setItem("audio",false);
	window.location.href = "/dictado";
}
function openNecesidadesMenu(){
		localStorage.setItem("audio",true);
		window.location.href = "/necesidades";
}
function openFlappy(){	
	window.location.href = "/flappy";
}
function openAdivina(){	
	window.location.href = "/adivina";
}
function openMessageSavedMenu(){
	console.log(listMessages);
	window.location.href = "/messages?"+jQuery.param({lmsg:lmsg});	
}

function openVideos(){
		//localStorage.setItem("audio",true);
		window.location.href = "/localvideos";
}