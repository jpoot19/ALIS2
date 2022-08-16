var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var vowels = ['e', 'a', 'o', 'i', 'u'];
var consonants = ['l', 's', 'r', 'n', 'm', 'p', 'c', 't', 'b', 'g', 'd', 'f', 'v', 'h',
    'j', 'k', 'ñ', 'y', 'q', 'w', 'z', 'x'
];
var optionKeys = [];
var msg = [''];
var keyboardMenuModal;
var keyboardTimer;
var keyboardTimerAux;
var boxMsg;
var keySelected = 0;
var keyboard;
var keyboardKeys;
var onKeyboard;
var suggestsModal;
var confirmSuggestModal;
var pointer;
$(document).ready(function() {
    suggestsModal = $("#suggestsModal");
    boxMsg = $("#boxMsg");
    keyboardMenuModal = $("#keyboardMenuModal");
    keyboard = $("#keyboard");
    confirmSuggestModal = $("#confirmSuggest");
    keyboardKeys = $("#keyboard button[data-key]");
    //getEnableKeys('');
    $("#saveMessage").removeClass('disabled').show();
    pointer = $("#pointer");
    togglePointer();
    $("#monitorModal .text-center button").removeClass('disabled').show();
    $("#ytOption").append('<button onclick="searchOnYoutube()" type="button" class="btn btn-default menuOption" data-audio="buscar-youtube"><img src="/images/youtube.png" ><span>Buscar Videos</span></button>');
});
var auxSignal1 = signal1;
signal1 = function() {
    if (onKeyboard) {
        // console.log((new Date()).getTime() - keyboardTimerAux.getTime());
        if ((new Date()).getTime() - keyboardTimerAux.getTime() < clickTimeout) { //retardo del clicker
            setKeyOption(keySelected - 1 < 0 ? keyboardKeys.length - 1 : keySelected - 1);
        }
        pushKey();
        sugerencias_rapidas(msg[msg.length - 1]);
    } else if (getCurrentModal() == null) {
        startKeyboard();
    } else {
        auxSignal1();
    }
}
var auxSignal2 = signal2;
signal2 = function() {
    if (onKeyboard) {
        stopDictation();
        sayCurrentMsg(function() {
            keyboardMenuModal.modal('show');
        });
    } else if (getCurrentModal() == null) {
        stopDictation();
        sayCurrentMsg(function() {
            keyboardMenuModal.modal('show');
        });
    } else {
        auxSignal2();
    }
}
var auxSignal3 = signal3;
signal3 = function() {
    if (onKeyboard) deleteLetter();
    else auxSignal3();
}

function sayCurrentMsg(callback) {
    callback = callback || function() {};
    playTextToSpeech("Haz escrito, " + currentMsg, callback);
}

function deleteLetter() {
    stopDictation();
    if (msg.length > 0) {
        if (msg[msg.length - 1] == "") {
            msg.pop();
            if (msg.length > 0) msg[msg.length - 1] = msg[msg.length - 1].slice(0, -1);
        } else {
            msg[msg.length - 1] = msg[msg.length - 1].slice(0, -1);
        }
        setMsg();
        playTextToSpeech("letra-eliminada", function() {
            sayCurrentMsg();
        });
    }
}

function stopDictation() {
    clearTimeout(keyboardTimer);
    onKeyboard = false;
}

function setKeyOption(index) {
    clearTimeout(keyboardTimer);
    toggleKey(keyboardKeys, false);
    // keyboardKeys.removeClass('optionSelected');
    toggleKey(keyboardKeys.eq(index), true);
    // keyboardKeys.eq(index).addClass('optionSelected');
    keySelected = index;
    //console.log("data-audio:"+keyboardKeys.eq(keySelected).attr("data-key"));
    playTextToSpeech(keyboardKeys.eq(keySelected).attr("data-key"));
    keyboardTimer = setTimeout(nextKey, dictationTimer);
}

function pushKey() {
    stopDictation();
    var key = keyboardKeys.eq(keySelected);
    if (msg.length > 0)
        msg[msg.length - 1] += key.data('key');
    else
        msg[0] = key.data('key');

    console.log(msg[msg.length - 1]);
    //AQUIVA
    //$.get('/dictado/fixWordDB?word='+msg[msg.length-1].toString());
    $.get('/dictado/fixWordDB?word=' + msg[msg.length - 1].toString(), function(datas) {
        console.log(datas.length);
        console.log(datas);
        var df = datas;

        if (datas) {
            msg[msg.length - 1] = df;
            setMsg();
        } else setMsg();
    }, 'json');
    //getEnableKeys(key.data('key'));	
    // activa o desactiva boton terminar palabra
    $("#finishWord").removeClass('disabled');
    var getSuggestsCallback = function(words) {
        var suggests = words;
        if (Object.keys(suggests).length > 0) {
            // activa o desactiva boton sugerencias
            $("#showSuggests").removeClass('disabled');
            setSuggests(suggests);
            $("#showSuggests").data('audio', 'sugerencias');
            $("#showSuggests").attr("data-target", "#suggestsModal");
        } else {
            $("#showSuggests").data('audio', 'no hay sugerencias');
            $("#showSuggests").attr("data-target", "#");
            //$("#showSuggests").data('toggle','#');

            //$("#showSuggests").addClass('disabled');
        }
    };
    playSugerencias(msg[msg.length - 1], getSuggestsCallback);
    startKeyboard();
}

function startKeyboard() {
    clearTimeout(keyboardTimer);
    onKeyboard = true;
    toggleKey(keyboardKeys, false);
    // keyboardKeys.eq(keySelected).removeClass('optionSelected');
    keySelected = 0;
    optionKeys = "e";
    //console.log("--->"+optionKeys);
    //getEnableKeys('');
    if (optionKeys.indexOf('e') > -1) {
        toggleKey(keyboardKeys.eq(keySelected), true);
        // keyboardKeys.eq(keySelected).addClass('optionSelected');
        keyboardTimerAux = new Date();
        playTextToSpeech('A');
        keyboardTimer = setTimeout(nextKey, dictationTimer + 500);
    } else nextKey();

}

function jumpKeyOption(keys) {
    clearTimeout(keyboardTimer);
    // keyboardKeys.eq(keySelected).removeClass('optionSelected');
    keySelected = (keySelected + keys) % keyboardKeys.length;
    // keyboardKeys.eq(keySelected).addClass('optionSelected');
    playTextToSpeech(keyboardKeys[keySelected].data('key'));
    keyboardTimer = setTimeout(nextKey, dictationTimer);
}

function nextKey() {
    keyboardTimerAux = new Date();
    keySelected = (keySelected + 1) % keyboardKeys.length;
    if (keyboardKeys.eq(keySelected).hasClass('keyOption')) {
        playTextToSpeech(keyboardKeys.eq(keySelected).data('key'));
        toggleKey(keyboardKeys, false);
        // keyboardKeys.removeClass('optionSelected');	
        toggleKey(keyboardKeys.eq(keySelected), true);
        // keyboardKeys.eq(keySelected).addClass('optionSelected');
        keyboardTimer = setTimeout(nextKey, dictationTimer);
    } else nextKey();
}

function toggleKey(keyObj, enable) {
    keyObj.css({ background: enable ? "#2780e3" : '' });
}

function printEnableKeys() {
    clearTimeout(keyboardTimer);
    keyboardKeys.removeClass('keyOption');
    keyboardKeys.addClass('disableKey');

    //console.log("--:"+msg[msg.length-1]);
    //getEnableKeys('l');

    for (var i = 0; i < keyboardKeys.length; i++) {
        for (var j = 0; j < optionKeys.length; j++) {
            if (keyboardKeys.eq(i).data('key') == optionKeys[j])
                keyboardKeys.eq(i).addClass('keyOption');
        }
    }

}

function getEnableKeys(lastChar) {
    switch (lastChar) {
        case 'l':
            optionKeys = vowels.concat(['r', 's', 't', 'l']).concat(numbers); //Ready
            break;
        case 's':
            optionKeys = vowels.concat(['t', 'p']).concat(numbers); //Ready
            break;
        case 'r':
            optionKeys = vowels.concat(['t', 'y', 'r', 's', 'p', 'q', 'm', 'n', 'j', 'l', 'f', 'g', 'b', 'c']).concat(numbers); //Ready
            break;
        case 'g':
            optionKeys = vowels.concat(['l', 'r']).concat(numbers); //Ready
            break;
        case 'c':
            optionKeys = vowels.concat(['y', 't', 'r', 'l', 'h']).concat(numbers); //Ready
            break;
        case 'd':
            optionKeys = vowels.concat(['r', 'y', 'v']).concat(numbers); //Ready
            break;
        case 'b':
            optionKeys = vowels.concat(['l', 'r', 'v', 'y']).concat(numbers); //Ready
            break;
        case 'p':
            optionKeys = vowels.concat(['l', 'r', 't']).concat(numbers); //Ready
            break;
        case 'm':
            optionKeys = vowels.concat(['b', 'p']).concat(numbers); //Ready
            break;
        case 'n':
            optionKeys = vowels.concat(['z', 'v', 's', 't', 'r', 'm', 'g', 'd']).concat(numbers); //Ready
            break;
        case 'f':
            optionKeys = vowels.concat(['r', 'l']).concat(numbers); //Ready
            break
        case 't':
            optionKeys = vowels.concat(['r', 'l']).concat(numbers); //Ready
            break;
        case 'h':
            optionKeys = vowels.concat(numbers); //Ready
            break;
        case 'j':
            optionKeys = vowels.concat(numbers); //Ready
            break;
        case 'ñ':
            optionKeys = vowels.concat(numbers); //Ready
            break;
        case 'z':
            optionKeys = vowels.concat(numbers); //Ready
            break;
        case 'v':
            optionKeys = vowels.concat(numbers); //Ready
            break;
        case 'y':
            optionKeys = vowels.concat(numbers); //Ready
            break;
        case 'k':
            optionKeys = vowels.concat(numbers); //Ready 
            break;
        case 'q':
            optionKeys = vowels.concat(numbers); //Ready
            break;
        case 'w':
            optionKeys = vowels.concat(numbers); //Ready 
            break;
        case 'x':
            optionKeys = vowels.concat(['x']).concat(numbers); //Ready 
            break;
        default:
            optionKeys = vowels.concat(consonants).concat(numbers); //U,O,I,E,A
            break;
    }
    printEnableKeys();
}

function setMsg() {
    //getEnableKeys(msg[msg.length-1]);
    boxMsg.html(msg.join('&nbsp;'));
    currentMsg = msg.join(' ');
}

function waitFunc() {
    if (!GlobalFlag) {
        console.log('--->');
    }
}

function setSuggestsNext(suggests) {
    var htmlButtons = '';
    for (var i in suggests) {
        if (i < 5) htmlButtons += "<button type='button' data-audio='" + suggests[i] + "' onclick='selectSuggest(this)' class='menuOption btn btn-default btn-xs' data-word='" + suggests[i] + "'>" + suggests[i] + "</button>";
    }
    suggestsModal.find('.modal-body').html(htmlButtons);
}


function setSuggests(suggests) {
    var htmlButtons = '';
    console.log(suggests);

    /*for (key in suggests) {
	if(suggests[key]==1) console.log(key+"Rojo");

	else console.log(key+"Negro");}
*/


    for (var key in suggests) {
        var prue = key;
        //console.log(typeof key);
        console.log("console");
        console.log(key);
        if (Object.keys(suggests).length <= 5)
            htmlButtons += "<button type='button' data-audio='" + key + "' onclick='selectSuggest(this)' class='menuOption btn btn-default btn-xs' data-word='" + key + "'>" + key + "</button>";
    }
    suggestsModal.find('.modal-body').html(htmlButtons);
    console.log("HEY PERROSCKY");
}

function newMessage() {
    msg = [''];
    setMsg();
    closeAllModals();
}

function continueMessage() {
    closeAllModals();
}

function finishWord() {
    //updatePalabra();
    findPalabra();
    //getNextWord();	
    msg.push('');
    setMsg();
    console.log(msg);
    console.log(msg[msg.length - 2]);
    console.log(msg[msg.length - 3]);

    $.get("/dictado/findNextWordExistDB", { word: msg[msg.length - 3], nextword: msg[msg.length - 2] });

    //getEnableKeys('');
    // closeCurrentModal(startKeyboard);
    //getEnableKeys('');
    sugerencias_rapidas_siguiente_palabra(msg[msg.length - 2]);
    var findNextWordCallback = function(words_s) {
        var suggests = words_s;
        console.log(suggests);
        setSuggestsNext(suggests);
    };
    playSugerenciasNext(msg[msg.length - 2], findNextWordCallback);
    //var testNext = ['a','b','c'];
    //setSuggestsNext(testNext);
    closeCurrentModal();
}

function finishMessage() {
    currentMsg = msg.join(' ');
    //getEnableKeys('');
    closeCurrentModal(function() {
        $("#outputMenuModal").modal('show');
    });
}

function deleteWord() {
    if (msg[msg.length - 1] == '') msg.pop();
    msg[msg.length - 1] = '';
    //getEnableKeys('');
    setMsg();
    //getEnableKeys('');
    // closeCurrentModal();
}

function selectSuggest(btn) {
    var word = $(btn).data('word');
    confirmSuggestModal.find("h2").text('"' + word + '"');
    confirmSuggestModal.find('.menuOption').data('word', word);
    confirmSuggestModal.modal('show');
    playTextToSpeech("Confirmar sugerencia, " + word);
}

function confirmSuggest(btn) {
    console.log("Sugerencias prueba ==============");
    msg[msg.length - 1] = $(btn).data('word');
    console.log(msg.toString());
    //updatePalabra();
    findPalabra();
    msg.push('');
    setMsg();
    //PruebaNextWord
    //$("#showSuggests").addClass('disabled');
    toggleKey($("#showSuggests"), false);
    //PruebaNextWord 
    //$("#finishWord").addClass('disabled');
    toggleKey($("#showSuggests,#finishWord"), false);
    //getEnableKeys('');
    $.get("/dictado/findNextWordExistDB", { word: msg[msg.length - 3], nextword: msg[msg.length - 2] });

    sugerencias_rapidas_siguiente_palabra(msg[msg.length - 2]);

    var findNextWordCallback = function(words_s) {
        var suggests = words_s;
        console.log(suggests);
        setSuggestsNext(suggests);
    };
    playSugerenciasNext(msg[msg.length - 2], findNextWordCallback);


    closeAllModals();
}

function updatePalabra() {
    console.log(msg[msg.length - 1]);
    $.get('/dictado/updateWordDB?word=' + msg[msg.length - 1].toString());
    console.log("updatePalabra");
    console.log(msg[msg.length - 1]);
    //console.log(findPalabra());

}


function findPalabra() {
    var menssaje = "";
    menssaje = msg[msg.length - 1].toString();

    $.get('/dictado/findWordDB?word=' + msg[msg.length - 1].toString(), function(datas) {
        console.log(datas.length);
        console.log(datas);

        if (datas) $.get('/dictado/updateWordDB?word=' + datas);
        else $.get('/dictado/addWord?word=' + menssaje);
    }, 'json');
}


function saveMessage() {
    try {
        $.get('/dictado/saveMessage?message=' + currentMsg.toUpperCase());
        showSavedMsg('Mensaje guardado', ' ', 'msgSendModalSuccess');
    } catch (ex) {
        showSavedMsg('Mensaje no guardado', 'no', 'msgSendModalWarnning');
        setTimeout(playTextToSpeech("Inténtelo otra vez"), 2000);
    }
}

function showSavedMsg(tittle, strban, classname) {
    $('#savedMessageModal').addClass(classname);
    $("#tittleModalMG").text(tittle);
    $("#msgTextMG").text(currentMsg.toUpperCase());
    playTextToSpeech("Mensaje " + currentMsg.toUpperCase() + " " + strban + " guardado");
    $('#savedMessageModal').modal("show").delay(4000).hide("slow", function() {
        closeCurrentModal();
    });

}

function togglePointer() { pointer.fadeIn(500).delay(250).fadeOut(500, togglePointer); }

$(document).on('change', '#pointer', function() {
    console.log($('#boxMsg').text());
    sugerencias_rapidas(msg[msg.length - 1]);
});