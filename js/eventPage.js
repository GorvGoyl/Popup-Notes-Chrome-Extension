/* [alias : jerrygoyal] */

"use strict";
var ta_content_id = "ta_content_id";
chrome.runtime.onMessage.addListener(callback);

var inFocus = true;  // global boolean to keep track of state
chrome.windows.onFocusChanged.addListener(function(window) {
    closeEvent();
    if (window == chrome.windows.WINDOW_ID_NONE) {
        inFocus = false;
    } else {
        inFocus = true;
    }
});
function callback(obj, sender, sendResponse) {
    if (obj) {
        if (obj.method == 'saveContent') {
            saveContent(obj.data)
        } else if (obj.method == 'getContent') {
            getContent(sendResponse);

        }
    }
    return true;
}

function closeEvent(){
    let notes;
    var views = chrome.extension.getViews({
        type: "popup"
    });
    for (var i = 0; i < views.length; i++) {
        notes = views[i].document.getElementById(ta_content_id).value;
    }
    saveContent(notes);
}

function getContent(sendResponse) {
    chrome.storage.local.get(["jgNotes"], function (obj) {
        var notes = $.trim(obj["jgNotes"]);
        notes = notes ? notes + '\n' : '';
        sendResponse(notes);
    });
}

function saveContent(notes) {
    chrome.storage.local.set({
        'jgNotes': notes
    });

    // chrome.storage.sync.set({
    //     'jgNotes': notes
    // }, function callback(result) {
    //     if (chrome.runtime.lastError) {
    //         console.log('max write operations/minute quota exceeded!');
    //     }
    //
    // });
}