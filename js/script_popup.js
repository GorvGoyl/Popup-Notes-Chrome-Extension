/* [alias : jerrygoyal] */

"use strict";
var ta_content_id = "ta_content_id";
var ta_contentRef = $("#"+ta_content_id+"");

function callEventPageMethod(method, data, callback){
    chrome.runtime.sendMessage({method: method,data:data }, function(response) {
        callback(response)});
}


 function setContent () {
     callEventPageMethod('getContent','', function(notes){
        ta_contentRef.val(notes);
        // save content in sync storage in case of quota exceeded last time.
        saveContent();
        setCursor();
     });
   
}
// save  notes in local as well as sync storage
function saveContent () {
    var notes = ta_contentRef.val();
    callEventPageMethod('saveContent',notes);
}
//set position of cursor
function setCursor(position) {
    if (position) {
        var selectionStart = position;
        var selectionEnd = position;
        var controlName = document.getElementById(ta_content_id);
        controlName.focus();
        controlName.setSelectionRange(selectionStart, selectionEnd);

    } else {
        ta_contentRef.focus();
    }
}

var jgPopupIns;
var jgPopupClass = function () {
    var self = this;
    
    self.init = function () {
        setPosition();
        setContent();
        setEventListeners();
    };

    var setPosition = function () {}

    var setEventListeners = function () {
        ta_contentRef.on('keyup', function (event) {
            keydownHandler(event);
        }); 
        //window.addEventListener('beforeunload', saveContent);
        ta_contentRef.on('input',function(e){
            saveContent();
          });
    }

    

    // insert tab on tab key press
    var insertTab = function (e) {
        var start = ta_contentRef.get(0).selectionStart;
        var end = ta_contentRef.get(0).selectionEnd;
        var notes = ta_contentRef.val().substring(0, start) + "\t" + ta_contentRef.val().substring(end);
        ta_contentRef.val(notes);
        setCursor(end + 1);
        saveContent();
    }
    var keydownHandler = function (e) {
        //support for tab key
        var keyCode = e.which;
        if (keyCode == 9) {
            insertTab(e);
        }
    }

    

    
};

(function () {
    jgPopupIns = jgPopupIns || new jgPopupClass();
    jgPopupIns.init();
})();

/* I welcome new opportunities at: 1gouravgg@gmail.com */
