/* [alias : jerrygoyal] */

"use strict";
var jgPopupIns;
var jgPopupClass = function () {
    var self = this;
    var ta_content_id = "ta_content_id";
    var ta_contentRef = $("#ta_content_id");
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

    // insert tab on tab key press
    var insertTab = function (e) {
        var start = ta_contentRef.get(0).selectionStart;
        var end = ta_contentRef.get(0).selectionEnd;
        var notes = ta_contentRef.val().substring(0, start) + "\t" + ta_contentRef.val().substring(end);
        ta_contentRef.val(notes);
        setCursor(end + 1);
    }
    var keydownHandler = function (e) {

        //support for tab key
        var keyCode = e.which;
        if (keyCode == 9) {
            insertTab(e);
        }

        saveContent();
    }

    var setContent = function () {
        var notes = "";
        chrome.storage.local.get(["jgNotes"], function (obj) {
            notes = $.trim(obj["jgNotes"]);

            if (!notes) {
                // notes not found in local storage.. check in sync storage i.e..user logged in to different machine
                chrome.storage.sync.get(["jgNotes"], function (obj) {
                    notes = $.trim(obj["jgNotes"]);
                });
            }

            notes = notes ? notes + '\n' : '';
            ta_contentRef.val(notes);
            // save content in sync storage in case of quota exceeded last time.
            saveContent();
            setCursor();
        });
    }



    // save  notes in local as well as sync storage
    var saveContent = function () {
        var notes = ta_contentRef.val();
        chrome.storage.local.set({
            'jgNotes': notes
        });

        chrome.storage.sync.set({
            'jgNotes': notes
        }, function callback(result) {
            if (chrome.runtime.lastError) {
                console.log('max write operations/minute quota exceeded!');
            }

        });
    }
};

(function () {
    jgPopupIns = jgPopupIns || new jgPopupClass();
    jgPopupIns.init();
})();

/* I welcome new opportunities at: 1gouravgg@gmail.com */
