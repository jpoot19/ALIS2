var alisDb = require("../lib/db");
var telnetCon = require("../lib/telnet");

exports.index = function(req, res){
	// obtener contactos de telegram
	alisDb.getTelegramContacts(function(contacts){
		alisDb.getFacebookContacts(function(contactsFB){
			alisDb.getSettings(function(settings){
				var sets = {};
				res.render('settings',{contacts:contacts,settings:settings, contactsFB:contactsFB});
			});
		});
	});
};

exports.setSettings = function(req, res){
	var settings = req.query.settings;
	if (typeof telnetCon.socket!= 'undefined') {
		telnetCon.socket.write(settings.dbClickTimer);
	}
	alisDb.updateSettings(settings,function(){
		res.json({success:true});
	});
};

exports.addContact = function(req, res){
	var name = req.query.name;
	var idChat = req.query.idChat;
	alisDb.addTelegramContact(name,idChat,function(){
		res.json({success:true});
	});
};
exports.addFacebookContact = function(req, res){
	var name = req.query.name;
	var idChat = req.query.idChat;
	alisDb.addFacebookContact(name,idChat,function(){
		res.json({success:true});
	});
};

exports.addWord = function(req, res){
 var wordNew = req.query.word;      
 var f_abs = 9999;
 var f_norm = 65545;
 var special = 1;
 alisDb.addNewWord(wordNew, f_abs, f_norm, special,function(){
     res.json({'success':true});
 });
};

exports.updateContact = function(req, res){
	var id = req.query.id;
	var name = req.query.name;
	var idChat = req.query.idChat;
	alisDb.updateTelegramContact(id,name,idChat,function(){
		res.json({success:true});
	});
};

exports.updateFacebookContact = function(req, res){
	var id = req.query.id;
	var name = req.query.name;
	var idChat = req.query.idChat;
	alisDb.updateFacebookContact(id,name,idChat,function(){
		res.json({success:true});
	});
};

exports.deleteContact = function(req, res){
	var id = req.query.id;
	alisDb.deleteTelegramContact(id,function(){
		res.json({success:true});
	});
};
exports.deleteFacebookContact = function(req, res){
	var id = req.query.id;
	alisDb.deleteFacebookContact(id,function(){
		res.json({success:true});
	});
};

exports.getContacts = function(req, res){
	alisDb.getTelegramContacts(function(contacts){
		res.json(contacts);
	});
};

exports.getFacebookContacts = function(req, res){
	alisDb.getFacebookContacts(function(contacts){
		res.json(contacts);
	});
};