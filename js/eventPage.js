/* [alias : jerrygoyal] */

"use strict";
chrome.runtime.onMessage.addListener(callback);
function callback(obj, sender, sendResponse) {
    if(obj){
        if(obj.method=='saveContent'){
        saveContent(obj.data)
        }else if(obj.method=='getContent'){
            let notes = (getContent(sendResponse));
            
        }
    }
    return true;
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