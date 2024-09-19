"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// transform.ts
class Transform {
    static transformKeys(items, keyMap) {
        return items.map(item => {
            const newItem = {};
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key) && keyMap[key]) {
                    newItem[keyMap[key]] = item[key];
                }
                else {
                    newItem[key] = item[key]; // Keep original key if not mapped
                }
            }
            return newItem;
        });
    }
}
exports.default = Transform;
