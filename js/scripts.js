function addMessageToList() {
	var ul = document.getElementById("messsages-list");
	var li = document.createElement("li");

	var message_text_area = document.getElementById("message-text");
	
	var message = message_text_area.value;
	message_text_area.value = "";

	
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

//Recieve enter key presses when in message text
$(document).ready(function(){
	$("#message-text").keyup(function(event){
    	if(event.keyCode == 13){
        	$("#send-button").click();
    	}
	});
});
