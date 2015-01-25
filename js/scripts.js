var languages = ["Afrikaans", "Albanian", "Arabic", "Azerbaijani", "Basque", "Belarusian", "Bengali", "Bulgarian", "Catalan", "ChineseSimplified", "ChineseTraditional", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto", "Estonian", "Filipino", "Finnish", "French", "Galician", "Georgian", "German", "Greek", "Gujarati", "HaitianCreole", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Irish", "Italian", "Japanese", "Kannada", "Korean", "Latin", "Latvian", "Lithuanian", "Macedonian", "Malay", "Maltese", "Norwegian", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh", "Yiddish" ];
var languageToTranslateMap = { Afrikaans:'af', Albanian:'sq', Arabic:'ar', Azerbaijani:'az', Basque:'eu', Belarusian:'be', Bengali:'bn', Bulgarian:'bg', Catalan:'ca', ChineseSimplified:'zh-CN', ChineseTraditional:'zh-TW', Croatian:'hr', Czech:'cs', Danish:'da', Dutch:'nl', English:'en', Esperanto:'eo', Estonian:'et', Filipino:'tl', Finnish:'fi', French:'fr', Galician:'gl', Georgian:'ka', German:'de', Greek:'el', Gujarati:'gu', HaitianCreole:'ht', Hebrew:'iw', Hindi:'hi', Hungarian:'hu', Icelandic:'is', Indonesian:'id', Irish:'ga', Italian:'it', Japanese:'ja', Kannada:'kn', Korean:'ko', Latin:'la', Latvian:'lv', Lithuanian:'lt', Macedonian:'mk', Malay:'ms', Maltese:'mt', Norwegian:'no', Persian:'fa', Polish:'pl', Portuguese:'pt', Romanian:'ro', Russian:'ru', Serbian:'sr', Slovak:'sk', Slovenian:'sl', Spanish:'es', Swahili:'sw', Swedish:'sv', Tamil:'ta', Telugu:'te', Thai:'th', Turkish:'tr', Ukrainian:'uk', Urdu:'ur', Vietnamese:'vi', Welsh:'cy', Yiddish:'yi' };

function addMessageToList() {
	var isInvalidSelect = 0;
	var select1 = document.getElementById("person1language"); 
	var select2 = document.getElementById("person2language"); 

	var select1error = document.getElementById("person1selecterror"); 
	var select2error = document.getElementById("person2selecterror"); 

	if (select1.value == "error") {
		isInvalidSelect = 1;
		select1error.setAttribute("class", "form-group has-error");
	}
	else {
		select1error.setAttribute("class", "form-group");
	}

	if (select2.value == "error") {
		isInvalidSelect = 1;
		select2error.setAttribute("class", "form-group has-error");
	}
	else {
		select2error.setAttribute("class", "form-group");
	}

	if (isInvalidSelect == 1) {
		window.alert("Please select a language!");
		return;
	}

	var message_text_area = document.getElementById("message-text");
	
	var message = message_text_area.value;
	if (message_text_area.value == "") {
		return;
	}
	message_text_area.value = "";

	var ul = document.getElementById("messsages-list");
	var li = document.createElement("li");
	
	li.appendChild(document.createTextNode(message));

	//To see if it is person 1 or 2 sending the message - temporary
	if (Math.random() < .5) {
		li.setAttribute("class", "message col-xs-10 left-chat");
	}
	else {
		li.setAttribute("class", "message col-xs-10 col-xs-offset-2 right-chat");
	}
	
	ul.appendChild(li);

	//scroll the scroll bar
	$("#chat-frame").animate({
		scrollTop:$("#chat-frame")[0].scrollHeight
	}, 500);
}

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

