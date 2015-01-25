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
}