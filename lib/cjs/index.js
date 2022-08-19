"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventDispatch = exports.useEventListen = void 0;
var useEventListen_1 = require("./useEventListen");
Object.defineProperty(exports, "useEventListen", { enumerable: true, get: function () { return __importDefault(useEventListen_1).default; } });
var useEventDispatch_1 = require("./useEventDispatch");
Object.defineProperty(exports, "useEventDispatch", { enumerable: true, get: function () { return __importDefault(useEventDispatch_1).default; } });
