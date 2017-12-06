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

    /**
     * Section 2:
     * Create a text field whose value will be stored in the database and on update applied.
     */
    const dbTextField = document.querySelector('#cloudless-dbsync');
    const apply = document.querySelector('#cloudless-dbsync-apply');

    // Store revision of the lastest db entry
    let rev = null;
    
    // Create a changes listener for incoming database changes
    group.database.changes({ live: true, include_docs: true }).on('change', (e) => {
        // Read change, apply value in DOM element
        dbTextField.value = e.doc.value;
        // Store the updated revision
        rev = e.doc._rev;
    });
    
    // Add a click listener to write into the database on "Save"
    apply.onclick = () => {
        group.database.put({
            _id: 'shared_text_value',
            _rev: rev,
            value: dbTextField.value
        })
    };
})();
