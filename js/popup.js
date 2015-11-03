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
	
	chrome.windows.getCurrent(function(w){
		textContent=$(".text-content");
		chrome.storage.sync.get("notes", function (obj) {
			textContent.html((obj["notes"]));
		});
	}); 
  
	document.addEventListener("keyup", function (e){
		chrome.storage.sync.set({"notes": textContent.val()}, function() {
			var Now=new Date();
			$(".status").html(Now);
			// Notify that we saved.
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