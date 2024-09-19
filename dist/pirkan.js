"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const method_generator_1 = __importDefault(require("./method-generator/method-generator"));
const transform_1 = __importDefault(require("./transform/transform"));
class Pirkan extends method_generator_1.default {
    items;
    constructor({ items, withIndexedLookup: { byKeyName = 'id', byDualKeyName } }) {
        super(byKeyName, byDualKeyName);
        this.items = items;
        this.generateMethods(this); // Pass the current instance
    }
    get getAll() {
        return this.items;
    }
    transformKeys(keyMap) {
        return transform_1.default.transformKeys(this.items, keyMap);
    }
}
exports.default = Pirkan;
