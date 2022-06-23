"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useReceiveEvent = function (event, callback) {
    (0, react_1.useEffect)(function () {
        window.addEventListener(event, callback);
        return function () {
            window.removeEventListener(event, callback);
        };
    });
};
exports.default = useReceiveEvent;
