var auxSignal1 = signal1;
var auxSignal2 = signal2;
var auxSignal3 = signal3;
var random_state = 0;
var ks;
var personas_array = [
//    { 'src': '/images/juego/ANDREA/andre_pirata.jpeg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_avatar.jpeg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_avatar2.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_avatar3.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_caballero.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_corona.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_flores.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_india.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_moto.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_moto2.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/ANDREA/andrea_santa.jpg', 'nombre_peronaje': 'ANDREA' },
    { 'src': '/images/juego/CONEJITO/conejito_avatar.jpg', 'nombre_peronaje': 'CONEJITO' },
    { 'src': '/images/juego/CONEJITO/conejito_bigote.jpg', 'nombre_peronaje': 'CONEJITO' },
    { 'src': '/images/juego/CONEJITO/conejito_caballero.jpg', 'nombre_peronaje': 'CONEJITO' },
    { 'src': '/images/juego/CONEJITO/conejito_cuadro.jpg', 'nombre_peronaje': 'CONEJITO' },
    { 'src': '/images/juego/CONEJITO/conejito_indio.jpg', 'nombre_peronaje': 'CONEJITO' },
    { 'src': '/images/juego/CONEJO/conejo_avatar.jpg', 'nombre_peronaje': 'CONEJO' },
    { 'src': '/images/juego/CONEJO/conejo_avatar2.jpg', 'nombre_peronaje': 'CONEJO' },
    { 'src': '/images/juego/CONEJO/conejo_caballero.jpg', 'nombre_peronaje': 'CONEJO' },
    { 'src': '/images/juego/CONEJO/conejo_caballero2.jpg', 'nombre_peronaje': 'CONEJO' },
    { 'src': '/images/juego/CONEJO/conejo_indio.jpg', 'nombre_peronaje': 'CONEJO' },
    { 'src': '/images/juego/CONEJO/conejo_terminator.jpg', 'nombre_peronaje': 'CONEJO' },
    { 'src': '/images/juego/GLORIA/gloria_corazon.jpg', 'nombre_peronaje': 'GLORIA' },
    { 'src': '/images/juego/GLORIA/gloria_cuadro.jpg', 'nombre_peronaje': 'GLORIA' },
    { 'src': '/images/juego/GLORIA/gloria_cuadros.jpg', 'nombre_peronaje': 'GLORIA' },
	{ 'src': '/images/juego/JOJO/jojo_bigote.jpg', 'nombre_peronaje': 'JOJO' },
	{ 'src': '/images/juego/JOJO/jojo_bigote2.jpg', 'nombre_peronaje': 'JOJO' },
	{ 'src': '/images/juego/JOJO/jojo_indio.jpg', 'nombre_peronaje': 'JOJO' },
	{ 'src': '/images/juego/JUAN/juan_avatar.jpg', 'nombre_peronaje': 'JUAN' },
	{ 'src': '/images/juego/JUAN/juan_avatar2.jpg', 'nombre_peronaje': 'JUAN' },
	{ 'src': '/images/juego/JUAN/juan_bigote.jpg', 'nombre_peronaje': 'JUAN' },
	{ 'src': '/images/juego/JUAN/juan_caballero.jpg', 'nombre_peronaje': 'JUAN' },
	{ 'src': '/images/juego/JUAN/juan_caballero2.jpg', 'nombre_peronaje': 'JUAN' },
    { 'src': '/images/juego/JUAN/juan_terminator.jpg', 'nombre_peronaje': 'JUAN' },
    { 'src': '/images/juego/JUANITO/juanito_avatar.jpg', 'nombre_peronaje': 'JUANITO' },
    { 'src': '/images/juego/JUANITO/juanito_avatar2.jpg', 'nombre_peronaje': 'JUANITO' },
    { 'src': '/images/juego/JUANITO/juanito_bandera.jpg', 'nombre_peronaje': 'JUANITO' },
    { 'src': '/images/juego/JUANITO/juanito_bigote.jpg', 'nombre_peronaje': 'JUANITO' },
    { 'src': '/images/juego/JUANITO/juanito_caballero.jpg', 'nombre_peronaje': 'JUANITO' },
    { 'src': '/images/juego/JUANITO/juanito_darkB.jpeg', 'nombre_peronaje': 'JUANITO' },
    { 'src': '/images/juego/JUANITO/juanito.jpg', 'nombre_peronaje': 'JUANITO' },
    { 'src': '/images/juego/PACO/paco_avatar.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_avatar2.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_avatar3.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_bigote.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_bigote2.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_caballero2.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_flores.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_gorro.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_indio.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_moto.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_nieve.jpeg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_santa.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_terminator.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/PACO/paco_zeus.jpg', 'nombre_peronaje': 'PACO' },
    { 'src': '/images/juego/SANDY/sandy_ardilla.jpg', 'nombre_peronaje': 'SANDY' },
    { 'src': '/images/juego/SANDY/sandy_cuadro.jpg', 'nombre_peronaje': 'SANDY' },
    { 'src': '/images/juego/SANDY/sandy_cuadro2.jpg', 'nombre_peronaje': 'SANDY' },
    { 'src': '/images/juego/SANDY/sandy_cuadro3.jpg', 'nombre_peronaje': 'SANDY' },
        

];
$(document).ready(function() {
    signal1 = function() {
        ks = 1
        if (ks == random_state) {
            playTextToSpeech("Muy bien");
            let newVal = parseInt($("#marcador").text()) + 1;
            if (newVal < 10) $("#marcador").text('0' + newVal);
            else $("#marcador").text(newVal);
            makeEvents();
        } else {
            playTextToSpeech("Intentalo de nuevo");
            let newVal = parseInt($("#marcador").text()) - 1;
            console.log(newVal);
            if (newVal < 10 && newVal > -1) $("#marcador").text('0' + newVal);
        }
    };
    signal2 = function() {
        ks = 2
        if (ks == random_state) {
            playTextToSpeech("Muy bien");
            let newVal = parseInt($("#marcador").text()) + 1;
            if (newVal < 10) $("#marcador").text('0' + newVal);
            else $("#marcador").text(newVal);
            makeEvents();
        } else {
            playTextToSpeech("Intentalo de nuevo");
            let newVal = parseInt($("#marcador").text()) - 1;
            console.log(newVal);
            if (newVal < 10 && newVal > -1) $("#marcador").text('0' + newVal);
        }
    };
    signal3 = function() {
        window.location.href = "/";
    }
    makeEvents();
    setInterval(function() {
        let newVal = parseInt($("#marcador").text()) - 1;
        console.log(newVal);
        if (newVal < 10 && newVal > -1) $("#marcador").text('0' + newVal);
        makeEvents();
    }, 30000);
});

function makeEvents() {
    console.log('makeEvents:SUCCES');
    var random = Math.floor(Math.random() * 2) + 1;
    var oldRandom = parseInt($("#randomClick").val());
    $("#randomClick").val(random);
    if (oldRandom != random) {
        createMensaje(oldRandom);
    }
    if (oldRandom == random) {
        while (oldRandom == random) {
            random = Math.floor(Math.random() * 2) + 1;
            $("#randomClick").val(random);
        }
        createMensaje(oldRandom);
    }
}

function createMensaje(r) {
    let random_img = Math.floor(Math.random() * personas_array.length);
    random_state = r;
    let mensaje = r == 1 ? 'DE UN CLICK ' + 'SI ES ' + personas_array[random_img].nombre_peronaje : 'DE DOS CLICKS ' + 'SI ES ' + personas_array[random_img].nombre_peronaje;
    $("#printInstrictions").html('<h1>' + mensaje + '</h1>');
    playTextToSpeech(mensaje);
    $("#personajes").html('personaje ' + random_img);
    $('#personajes_src').attr('src', personas_array[random_img].src);
}