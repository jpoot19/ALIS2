var alisDb = require("../lib/db");
var bot = require('telegram-bot-bootstrap');
var botALIS = new bot('695342236:AAFVRBREF9dfLnUSLT4jjdaqd4FC47VHMOM');

exports.index = function(req, res) {
    alisDb.getSettings(function(settings) {
        console.log(settings);
        res.render('dictado/index', { dictationTimer: settings.dictationTimer });
    });
};

exports.getsuggests = function(req, res) {
    alisDb.getSuggests(req.query.q, function(words) {
        res.json(words);
    });
};

exports.updateWordDB = function(req, res) {
    alisDb.updateWord(req.query.word, function(word) {
        res.json(word);
    });
};

exports.findWordDB = function(req, res) {
    alisDb.findWord(req.query.word, function(word) {
        res.json(word);
    });
};



//añadir siguiente palabra
exports.addNextWordDB = function(req, res) {
    var word = req.query.word;
    var nextword = req.query.nextword;
    var frecuency = 1;
    alisDb.addNextWord(word, nextword, frecuency, function() {
        res.json({ success: true });
    });
};

//encontrar siguiente palabra
exports.findNextWordDB = function(req, res) {
    alisDb.findNextWord(req.query.word, function(word) {
        res.json(word);
    });
};


//findNextWordExist
exports.findNextWordExistDB = function(req, res) {

    var word = req.query.word;
    var nextword = req.query.nextword;

    alisDb.findNextWordExist(word, nextword, function() {
        res.json({ success: true });
    });
};

//incrementar frecuencia de siguiente palabra
exports.updateNextWordDB = function(req, res) {
    var word = req.query.word;
    var nextword = req.query.nextword;

    alisDb.updateNextWord(word, nextword, function() {
        res.json({ success: true });
    });
};

exports.addWord = function(req, res) {
    var word = req.query.word;
    var f_abs = 1;
    var f_norm = 1;
    var special = 1;
    alisDb.addNewWord(word, f_abs, f_norm, special, function() {
        res.json({ success: true });
    });
};

exports.fixWordDB = function(req, res) {
    alisDb.fixWord(req.query.word, function(word) {
        res.json(word);
    });
};

exports.sendMessageToContact = function(req, res) {
    var idChat = req.query.idChat;
    var msg = req.query.msgToSend;
    botALIS.sendMessage({ chat_id: idChat, text: msg }).then(function(r) {
        r = JSON.parse(r);
        //if(err) res.json({success:false});
        //console.log("RESPUESTA:"+r.ok);
        if (r.ok)
            res.json({ success: true });
        else
            res.json({ success: false });
    });
};

exports.sendMessageToContactFacebook = function(req, res) {
    var idChat = req.query.idChat;
    var msg = req.query.msgToSend;
    enviar_texto(idChat,msg);
    // Construcicon del cuerpo del mensaje
    
};

// Funcion donde el chat respondera usando SendAPI
function enviar_texto(senderID, response){
    // Construcicon del cuerpo del mensaje
    let request_body = {
        "recipient": {
          "id": senderID
        },
        "message": response
    }
    
    // Enviar el requisito HTTP a la plataforma de messenger
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
          console.log('Mensaje enviado!')
        } else {
          console.error("No se puedo enviar el mensaje:" + err);
        }
    }); 
}

exports.saveMessage = function(req, res) {
    alisDb.getMessageId(req.query.message, function(messageId) {
        console.log("REGRESO: " + messageId);
        if (!messageId) {
            alisDb.insertMessage(req.query.message, function(err, messages) {
                if (err) throw err;
                return [1, "mensaje guardado"];
            });
        } else
            return [0, "Ya existe mesaje"];
    });
};

exports.test = function(req, res) {
    botALIS.getUpdates().then(function(r) {
        console.log(r);
        res.json('ya');
    });
};