"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useSendEvent = function (event) {
    var sendEvent = function (payload) {
        var customEvent = new CustomEvent(event, { detail: payload });
        window.dispatchEvent(customEvent);
    };
    return sendEvent;
};
exports.default = useSendEvent;
