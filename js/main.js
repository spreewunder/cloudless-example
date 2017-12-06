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