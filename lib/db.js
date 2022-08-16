var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database(__dirname + '/../databases/alisdb'),
    AlisDb = {};

AlisDb.insertMessage = function(message, callback) {
    var dateVal = new Date();
    cle
    stmt = db.prepare("INSERT INTO messages (id,message,date) VALUES (?,?,?)");
    stmt.run(null, message, dateVal.toLocaleString());
    stmt.finalize();
    callback();
}
AlisDb.getMessages = function(callback) {
    db.all("SELECT * FROM messages", function(err, rows) {
        if (err) throw err;
        var messages = [];
        for (var i in rows) {
            messages.push(rows[i].message);
        }
        callback(messages);
    });
}
AlisDb.getMessagesLimit = function(lastIdMessage, limit, callback) {
    console.log("LAST ID MSG:" + lastIdMessage);
    stmt = db.prepare("SELECT * FROM messages WHERE ID > ? ORDER BY ID LIMIT ?");
    stmt.bind(lastIdMessage, limit);
    stmt.all(function(error, rows) {
        var messages = [];
        if (error) throw err;
        if (rows) messages = rows;
        console.log("Resultado:");
        console.log(messages);
        callback(messages);
    });
    stmt.finalize();
}
AlisDb.getMessageId = function(message, callback) {
    var messageId = null;
    stmt = db.prepare("SELECT * FROM messages WHERE message = ?");
    stmt.bind(message);
    stmt.get(function(error, row) {
        if (error) throw err;
        if (row) messageId = row.id;
        callback(messageId);
    });
    stmt.finalize();
}
AlisDb.getMessage = function(messageId, callback) {
    var message = null;
    stmt = db.prepare("SELECT * FROM messages WHERE id = ?");
    stmt.bind(messageId);
    console.log("db: messageid:" + messageId);
    stmt.get(function(error, row) {
        if (error) throw err;
        if (row) message = row.message;
        console.log("db: message:" + message);
        callback(message);
    });
    stmt.finalize();
}
AlisDb.deleteMessage = function(msgId, callback) {
    console.log("DB: eliminado" + msgId);
    stmt = db.prepare("DELETE FROM messages WHERE ID = ?")
    stmt.run(msgId);
    stmt.finalize();
    callback();
}
AlisDb.getSuggests = function(q, callback) {
    db.all("SELECT word,special FROM Dictionary WHERE word LIKE '" + q + "%' ORDER BY frecuencyNorm DESC LIMIT 5", function(err, rows) {
        if (err) throw err;
        var words = {};
        //var words = [];
        console.log(rows.length);
        console.log(rows);
        console.log(Object.keys(words).length);

        //for(var i in rows) words.push(rows[i].word);
        for (var i = 0; i < rows.length; i++) {
            words[rows[i].word] = rows[i].special;
        }
        callback(words);

        console.log(words);
        /*for (key in words) {

        if(words[key]==1) console.log(key+"Rojo");
        console.log(key+"Negro");}*/

        //console.log(words[key]);} //value
        console.log(Object.keys(words).length);
    });
}
AlisDb.getHistory = function(offset, callback) {
    db.all("SELECT * FROM History ORDER BY date DESC LIMIT 10 OFFSET " + offset, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}
AlisDb.saveInHistory = function(msg, callback) {
    db.serialize(function() {
        stmt = db.prepare("INSERT INTO History (message) VALUES (?)");
        stmt.run(msg);
        stmt.finalize();
    });
    callback();
}
AlisDb.addTelegramContact = function(name, idChat, callback) {
    db.serialize(function() {
        stmt = db.prepare("INSERT INTO TelegramContacts (name,idChat) VALUES (?,?)");
        stmt.run(name, idChat);
        stmt.finalize();
    });
    callback();
}
AlisDb.updateTelegramContact = function(id, name, idChat, callback) {
    db.serialize(function() {
        stmt = db.prepare("UPDATE TelegramContacts SET name = ?, idChat = ? WHERE id = ?");
        stmt.run(name, idChat, id);
        stmt.finalize();
    });
    callback();
}
AlisDb.deleteTelegramContact = function(id, callback) {
    db.serialize(function() {
        stmt = db.prepare("DELETE FROM TelegramContacts WHERE id = ?");
        stmt.run(id);
        stmt.finalize();
    });
    callback();
}
AlisDb.getTelegramContacts = function(callback) {
    db.all("SELECT * FROM TelegramContacts", function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}
// Facebook functions
AlisDb.addFacebookContact = function(name, idChat, callback) {
    db.serialize(function() {
        stmt = db.prepare("INSERT INTO FacebookContacts (name,idChat) VALUES (?,?)");
        stmt.run(name, idChat);
        stmt.finalize();
    });
    callback();
}
AlisDb.updateFacebookContact = function(id, name, idChat, callback) {
    db.serialize(function() {
        stmt = db.prepare("UPDATE FacebookContacts SET name = ?, idChat = ? WHERE id = ?");
        stmt.run(name, idChat, id);
        stmt.finalize();
    });
    callback();
}
AlisDb.deleteFacebookContact = function(id, callback) {
    db.serialize(function() {
        stmt = db.prepare("DELETE FROM FacebookContacts WHERE id = ?");
        stmt.run(id);
        stmt.finalize();
    });
    callback();
}
AlisDb.getFacebookContacts = function(callback) {
    db.all("SELECT * FROM FacebookContacts", function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}

AlisDb.getSettings = function(callback) {
        db.all("SELECT * FROM Settings", function(err, rows) {
            if (err) throw err;
            var sets = {};
            for (var i in rows) sets[rows[i].tag] = rows[i].value;
            callback(sets);
        });
    }
    //AGREGAR nuevo
AlisDb.updateWord = function(word, callback) {
        /*db.serialize(function() {
            stmt = db.prepare("UPDATE Dictionary SET frecuencyNorm = frecuencyNorm +1 WHERE word = ?");
            stmt.run(word);
            stmt.finalize();
        });
        callback();
        */
        db.all("UPDATE Dictionary SET frecuencyNorm = frecuencyNorm +1 WHERE word ="+word, (err,rows)=>{
            if (err) callback(err);
            else callback(rows);
        });
        
    }
    //Buscar palabra
AlisDb.findWord = function(word, callback) {
    db.all("SELECT word FROM Dictionary WHERE word = '" + word + "'", function(err, rows) {
        if (err) throw err;
        var words = "";
        console.log(rows);

        if (rows.length == 1) callback(rows[0].word);
        else callback(rows.length);

    });
}

//Añadir palabra
AlisDb.addNewWord = function(word, f_abs, f_normal, special, callback) {
    db.serialize(function() {
        stmt = db.prepare("INSERT INTO Dictionary (word, frecuencyAbs, frecuencyNorm, special) VALUES (?,?,?,?)");
        stmt.run(word, f_abs, f_normal, special);
        stmt.finalize();
    });
    callback();
}

//FixWord
AlisDb.fixWord = function(word, callback) {
    db.all("SELECT word FROM FixWord WHERE (word1 == '" + word + "') OR (word2 == '" + word + "') OR (word3 == '" + word + "') OR (word4== '" + word + "')", function(err, rows) {
        if (err) throw err;
        var words = "";
        console.log(rows);

        if (rows.length == 1) callback(rows[0].word);
        else callback(rows.length);

    });
}

//AddNEXTWORD
AlisDb.addNextWord = function(word, nextword, frecuency, callback) {
    db.serialize(function() {
        stmt = db.prepare("INSERT INTO nextWord (word, nextpalabra, frecuency) VALUES (?,?,?)");
        stmt.run(word, nextword, frecuency);
        stmt.finalize();
    });
    callback();
}

//incrementar frecuencia de siguiente palabra
AlisDb.updateNextWord = function(word, nextword, callback) {
    db.serialize(function() {
        stmt = db.prepare("UPDATE nextWord SET frecuency = frecuency +1 WHERE word = ? AND nextpalabra = ?");
        stmt.run(word, nextword);
        stmt.finalize();
    });
    callback();
}

//Verificar si existe la palabra y su siguiente
AlisDb.findNextWordExist = function(word, nextword, callback) {
    db.all("SELECT nextpalabra FROM nextWord WHERE word = '" + word + "' AND nextpalabra='" + nextword + "'", function(err, rows) {
        if (err) throw err;
        var words_s = [];
        for (var i in rows) words_s.push(rows[i].nextpalabra);
        if (word != null && nextword != null) {
            if (rows.length == 0) {
                db.serialize(function() {
                    stmt = db.prepare("INSERT INTO nextWord (word, nextpalabra, frecuency) VALUES (?,?,?)");
                    stmt.run(word, nextword, 1);
                    stmt.finalize();
                });
            } else {

                db.serialize(function() {
                    stmt = db.prepare("UPDATE nextWord SET frecuency = frecuency +1 WHERE word = ? AND nextpalabra = ?");
                    stmt.run(word, nextword);
                    stmt.finalize();
                });
            };
        }
    });
}

//Encontrar siguiente palabra
AlisDb.findNextWord = function(word, callback) {
    db.all("SELECT nextpalabra FROM nextWord WHERE word = '" + word + "' ORDER BY frecuency DESC LIMIT 3", function(err, rows) {
        if (err) throw err;
        var words_s = [];

        for (var i in rows) words_s.push(rows[i].nextpalabra);

        if (rows.length == 0) callback(rows.length);
        else callback(words_s);

    });
}



AlisDb.updateSettings = function(settings, callback) {
    db.serialize(function() {
        stmt = db.prepare("UPDATE Settings SET value = ? WHERE tag = ?");
        for (var tag in settings) stmt.run(settings[tag], tag);
        stmt.finalize();
    });
    callback();
}
module.exports = AlisDb;