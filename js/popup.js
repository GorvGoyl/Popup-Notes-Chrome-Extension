// window.onload = function(e){  
  // chrome.windows.getCurrent(function(w)  
  // {
      // var button=document.getElementById("txt");
	  // //button.innerHTML="<button onclick='saveChanges()'>Click me</button>";
	  
// chrome.storage.sync.get("val", function (obj) {
    // button.innerHTML=(obj["val"]);

// });

  // });  
// }

document.addEventListener('DOMContentLoaded', function () {
	
	chrome.windows.getCurrent(function(w) {
		
		textContent=$(".text-content");
		footerTime=$(".time");
		footerStatus=$(".status");

		chrome.storage.sync.get(["notes","lastUpdate"], function (obj) {
			textContent.html((obj["notes"]));
			footerTime.html(obj["lastUpdate"]);
			footerStatus.html("Welcome..").css("color","deeppink");
		});
	});
	
document.addEventListener("keydown",function (e) {
	footerStatus.html("Taking notes..").css("color","red");
});
	
document.addEventListener("keyup", function (e) {
    
    var current     =new Date();
    var lastUpdate  = "Last edited on "+current.getDate()+"-"+current.getMonth()+"-"+current.getFullYear()+" at "+current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
	  
    chrome.storage.sync.set({"notes": textContent.val(),"lastUpdate": lastUpdate}, function() {
		
		footerStatus.html("Saved..").css("color","green");
		footerTime.html(lastUpdate);
		});
	});
});

// function myAlert(){
    // alert('hello world');
// }

// document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('alertButton').addEventListener('click', myAlert);
// });


// document.addEventListener('DOMContentLoaded', function (e)
// {
  
// document.addEventListener("focus", function (e)
// {
  // document.getElementById("txt").style.background="#ECE7AD";
// });
// });

// function saveChanges() {
  // // Get a value saved in a form.
  // var theValue = textarea.value;
  // // Check that there's some code there.
  // if (!theValue) {
    // message('Error: No value specified');
    // return;
  // }
  // // Save it using the Chrome extension storage API.
  // chrome.storage.sync.set({'value': theValue}, function() {
    // // Notify that we saved.
    // message('Settings saved');
  // });
// }