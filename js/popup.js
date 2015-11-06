//Authors : Nitish Singh and Gourav Goyal

document.addEventListener('DOMContentLoaded', function () {
	//set last position of cursor
	function setCursor(input, selectionStart, selectionEnd) {
		var controlName=document.getElementById(input);
		if (controlName.setSelectionRange) {
			controlName.focus();
			controlName.setSelectionRange(selectionStart, selectionEnd);
		}
	}
	
	//set last dimension
	function setDimension() {
		chrome.storage.local.get(["height","width"], function (obj) {
			$(".text-content").height(obj["height"]);
			$(".text-content").width(obj["width"]);
		});
	}
	
	chrome.windows.getCurrent(function(w) {		
		textContent		=$(".text-content");
		footerTime		=$(".time");
		footerStatus	=$(".status");
		textContent.focus();
		chrome.storage.sync.get(["notes","lastUpdate","cursorPosition"], function (obj) {
			textContent.html((obj["notes"]));
			footerTime.html(obj["lastUpdate"]);
			footerStatus.html("Welcome..").css("color","deeppink");
			setDimension();
			setCursor("text-content",obj["cursorPosition"],obj["cursorPosition"]);
		});
	});
	
	document.addEventListener("keydown",function (e) {
		
		//support for tab key
		var keyCode = e.which;
		if (keyCode == 9) {
			e.preventDefault();
			var start = textContent.get(0).selectionStart;
			var end = textContent.get(0).selectionEnd;
			textContent.val(textContent.val().substring(0, start) + "\t" + textContent.val().substring(end));
			setCursor("text-content", end+1, end+1);
		}
		footerStatus.html("Taking notes..").css("color","red");
	});
	
	document.addEventListener("click",function(e){
		
	});
	
	document.addEventListener("keyup", function (e) {
        var current     = new Date();
		var lastUpdate  = "Edited on "+current.getDate()+"-"+current.getMonth()+"-"+current.getFullYear()+" at "+current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
		cursorPosition 	= $('.text-content').prop("selectionStart");
		chrome.storage.sync.set({"notes": textContent.val(),"lastUpdate": lastUpdate, "cursorPosition":cursorPosition}, function() {
			footerStatus.html("Saved..").css("color","green");
			footerTime.html(lastUpdate);
		});
	});
	
	$(".text-content").blur(function(){
		
		cursorPosition = $('.text-content').prop("selectionStart");
		chrome.storage.local.set({"height": $(".text-content").height(), "width" : $(".text-content").width(),"cursorPosition":cursorPosition }, function() {

      setDimension();
       });
	})
	
	
});