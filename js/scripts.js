

//Document Setup/Prep
var languages = ["Afrikaans", "Albanian", "Arabic", "Azerbaijani", "Basque", "Belarusian", "Bengali", "Bulgarian", "Catalan", "ChineseSimplified", "ChineseTraditional", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto", "Estonian", "Filipino", "Finnish", "French", "Galician", "Georgian", "German", "Greek", "Gujarati", "HaitianCreole", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Irish", "Italian", "Japanese", "Kannada", "Korean", "Latin", "Latvian", "Lithuanian", "Macedonian", "Malay", "Maltese", "Norwegian", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh", "Yiddish" ];
var languageToTranslateMap = { Afrikaans:'af', Albanian:'sq', Arabic:'ar', Azerbaijani:'az', Basque:'eu', Belarusian:'be', Bengali:'bn', Bulgarian:'bg', Catalan:'ca', ChineseSimplified:'zh-CN', ChineseTraditional:'zh-TW', Croatian:'hr', Czech:'cs', Danish:'da', Dutch:'nl', English:'en', Esperanto:'eo', Estonian:'et', Filipino:'tl', Finnish:'fi', French:'fr', Galician:'gl', Georgian:'ka', German:'de', Greek:'el', Gujarati:'gu', HaitianCreole:'ht', Hebrew:'iw', Hindi:'hi', Hungarian:'hu', Icelandic:'is', Indonesian:'id', Irish:'ga', Italian:'it', Japanese:'ja', Kannada:'kn', Korean:'ko', Latin:'la', Latvian:'lv', Lithuanian:'lt', Macedonian:'mk', Malay:'ms', Maltese:'mt', Norwegian:'no', Persian:'fa', Polish:'pl', Portuguese:'pt', Romanian:'ro', Russian:'ru', Serbian:'sr', Slovak:'sk', Slovenian:'sl', Spanish:'es', Swahili:'sw', Swedish:'sv', Tamil:'ta', Telugu:'te', Thai:'th', Turkish:'tr', Ukrainian:'uk', Urdu:'ur', Vietnamese:'vi', Welsh:'cy', Yiddish:'yi' };

function addLanguagesToSelector() {
	var select1 = document.getElementById("person1language"); 
	var select2 = document.getElementById("person2language"); 

	for(var i = 0; i < languages.length; i++) {
		var lang = languages[i];
		var optionElement = document.createElement("option");
		optionElement.textContent = lang;
		optionElement.value = languageToTranslateMap[lang];

		var optionElement2 = document.createElement("option");
		optionElement2.textContent = lang;
		optionElement2.value = languageToTranslateMap[lang];
		select1.appendChild(optionElement);
		select2.appendChild(optionElement2);
	}
}

$(document).ready(function(){
	//Send text when enter is pressed
	$("#message-text").keyup(function(event){
    	if(event.keyCode == 13){
        	$("#send-button").click();
    	}
	});

	addLanguagesToSelector();
});

//END Document Setup/Prep

//ACTION
function messageSendPressed() {
	if (isLanguageSelected()) {
		if (!isMessageBlank()) {
			checkInputLanguage();
			/*addMessageToList();
			finishSendingMessage();*/	
		}
	}
}

//Translation Service

var translate_api_key = "AIzaSyAIM9ITnDye2arpTOupYnP-zRqZoZjkV2A";
var translate_base_url = "https://www.googleapis.com/language/translate/v2";

function translateAndUpdateUI(is_left_user, translate_origin, translate_destination) {
	var message_text_area = document.getElementById("message-text");
	var original_message = message_text_area.value;

	$.get(translate_base_url, {
		key:translate_api_key,
		source:translate_origin,
		target:translate_destination,
		q:original_message 
	},
	function(response) {
		var translated_text = response.data.translations[0].translatedText;
		addMessageToList(is_left_user, translated_text);

	}, "json") .fail(function(fail_object, text_status, error_thrown) {
		console.log(fail_object + " - " + text_status + " - " + error_thrown);
		alert( "Sorry, we were unable to translate the message. Error: " + error_thrown );
	});
}

function checkInputLanguage() {
	var message_text_area = document.getElementById("message-text");
	var message = message_text_area.value;

	$.get(translate_base_url + "/detect", {
		key:translate_api_key,
		q:message
	},
	function(response) {
		var language_object = response.data.detections[0][0];
		var lang = language_object.language;

		var select1lang = document.getElementById("person1language").value; 
		var select2lang = document.getElementById("person2language").value; 

		if (lang == select1lang) {
		//person on left - translate from lang 1 to lang 2
		translateAndUpdateUI(true, select1lang, select2lang);
		}
		else if (lang == select2lang) {
		//person on right - translate from lang 2 to lang
		translateAndUpdateUI(false, select2lang, select1lang);
		}
		else {
			alert("Sorry, we couldn't match the text to either of the selected languages \n\nUser 1 Language - " + select1lang + "\nUser 2 Language - " + select2lang + "\nDetected Language - " + lang);
			return;
		}
	} ,"json") .fail(function(fail_object, text_status, error_thrown) {
		console.log(fail_object + " - " + text_status + " - " + error_thrown);
		alert( "Sorry, we were unable to translate the message. Error: " + error_thrown );
	});
}

//UI Updates
function addMessageToList(is_left_user, translated_message) {
	var message_text_area = document.getElementById("message-text");
	var original_message = message_text_area.value;

	var ul = document.getElementById("messsages-list");
	var li = document.createElement("li");

	var user_node_span = document.createElement("span");
	user_node_span.setAttribute("class", "name-text");

	var translated_node = document.createElement("span");
	translated_node.setAttribute("class", "translate-text");
	translated_node.appendChild(document.createTextNode(" [ " + translated_message + " ] "));

	//To see if it is person 1 or 2 sending the message - temporary
	if (is_left_user) {
		li.setAttribute("class", "message col-xs-10 left-chat");
		user_node_span.appendChild(document.createTextNode("User 1 - "));
	}
	else {
		li.setAttribute("class", "message col-xs-10 col-xs-offset-2 right-chat");
		user_node_span.appendChild(document.createTextNode("User 2 - "));
	}
	
	li.appendChild(user_node_span);
	li.appendChild(document.createTextNode(original_message));
	li.appendChild(translated_node);

	ul.appendChild(li);

	finishSendingMessage();
}

function finishSendingMessage() {
	//reset the text area
	var message_text_area = document.getElementById("message-text");
	message_text_area.value = "";

	//scroll the scroll bar
	$("#chat-frame").animate({
		scrollTop:$("#chat-frame")[0].scrollHeight
	}, 500);
}

//Verification
function isLanguageSelected() {
	var isInvalidSelect = false;
	var select1 = document.getElementById("person1language"); 
	var select2 = document.getElementById("person2language"); 

	var select1error = document.getElementById("person1selecterror"); 
	var select2error = document.getElementById("person2selecterror"); 

	if (select1.value == "error") {
		isInvalidSelect = true;
		select1error.setAttribute("class", "form-group has-error");
	}
	else {
		select1error.setAttribute("class", "form-group");
	}

	if (select2.value == "error") {
		isInvalidSelect = true;
		select2error.setAttribute("class", "form-group has-error");
	}
	else {
		select2error.setAttribute("class", "form-group");
	}

	if (isInvalidSelect) {
		window.alert("Please select a language!");
		return false;
	}

	return true;
}

function isMessageBlank() {
	var message_text_area = document.getElementById("message-text");
	
	var message = message_text_area.value;
	if (message_text_area.value == "") {
		return true;
	}

	return false;
}








