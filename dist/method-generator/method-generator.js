"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MethodGenerator {
    keyName;
    dualKeys;
    index = new Map();
    dualIndex = new Map();
    constructor(byKeyName, dualKeyName) {
        this.keyName = byKeyName;
        this.dualKeys = dualKeyName;
    }
    // Generates methods based on provided keys
    generateMethods(pirkanInstance) {
        if (this.dualKeys) {
            const [key1, key2] = this.dualKeys;
            pirkanInstance[`findBy${this.capitalize(String(key1))}And${this.capitalize(String(key2))}`] = (value1, value2) => this.findByDualKeys(value1, value2);
        }
        else {
            pirkanInstance[`findBy${this.capitalize(String(this.keyName))}`] = (value) => this.findBySingleKey(value);
        }
        // Initialize the index
        this.initializeIndex(pirkanInstance.items);
    }
    initializeIndex(items) {
        if (this.dualKeys) {
            const [key1, key2] = this.dualKeys;
            items.forEach(item => {
                const key1Value = item[key1];
                const key2Value = item[key2];
                if (!this.dualIndex.has(key1Value)) {
                    this.dualIndex.set(key1Value, new Map());
                }
                this.dualIndex.get(key1Value).set(key2Value, item);
            });
        }
        else {
            items.forEach(item => {
                this.index.set(item[this.keyName], item);
            });
        }
    }
    findBySingleKey(value) {
        return this.index.get(value);
    }
    findByDualKeys(value1, value2) {
        const map = this.dualIndex.get(value1);
        return map ? map.get(value2) : undefined;
    }
    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}
exports.default = MethodGenerator;
