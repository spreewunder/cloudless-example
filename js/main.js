'use strict';

import { Group } from './cloudless.js';

const group = new Group({
    "name": "livecoding",
    "identifier": "com.spreewunder.cloudless",
    "signaling": {
        "servers": [{
            "urls": "stun:stun.l.google.com:19302"
        }],

        "policies": {
            "spreewunder.com": {
                "type": "centralized",
                "settings": {
                    "address": "cloudless.spreewunder.com",
                    "port": 3003,
                    "secure": true
                }
            }
        }
    }
});

(async() => {
    await group.join();
    
    /**
     * Section 1:
     * Create a text field whose value will be shared with other user immediately.
     */
    // Get reference to the text field
    const textField = document.querySelector('#cloudless-rtsync');
    
    // Register the text field for real time sync
    group.shareHtmlElement(textField);
})();
