"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pirkan_1 = __importDefault(require("./pirkan"));
const globals_1 = require("@jest/globals");
// Helper class to expose private methods for testing
class TestablePirkan extends pirkan_1.default {
    exposeFindById(id) {
        return this.findById(id);
    }
    exposeFindByIdAndName(id, name) {
        return this.findByIdAndName(id, name);
    }
    add(item) {
        this.items.push(item);
        this.generateMethods(this); // Regenerate methods after adding
    }
}
(0, globals_1.describe)("Pirkan", () => {
    let pirkanInstance;
    (0, globals_1.beforeEach)(() => {
        // Initialize with sample data
        const items = [
            { id: 1, name: "Joe", age: 10 },
            { id: 2, name: "Jane", age: 12 },
        ];
        // Create an instance of TestablePirkan with single key
        pirkanInstance = new TestablePirkan({
            items,
            withIndexedLookup: { byKeyName: "id" }
        });
    });
    (0, globals_1.describe)("Constructor", () => {
        (0, globals_1.it)("should initialize with provided items and create methods", () => {
            (0, globals_1.expect)(pirkanInstance.getAll).toHaveLength(2);
            (0, globals_1.expect)(typeof pirkanInstance.exposeFindById(1)).toBe("object");
        });
    });
    (0, globals_1.describe)("Method Generation", () => {
        (0, globals_1.it)("should find items by id", () => {
            (0, globals_1.expect)(pirkanInstance.exposeFindById(1)).toEqual({ id: 1, name: "Joe", age: 10 });
            (0, globals_1.expect)(pirkanInstance.exposeFindById(2)).toEqual({ id: 2, name: "Jane", age: 12 });
            (0, globals_1.expect)(pirkanInstance.exposeFindById(3)).toBeUndefined();
        });
    });
    (0, globals_1.describe)("Adding Items", () => {
        (0, globals_1.it)("should add new items and regenerate methods", () => {
            pirkanInstance.add({ id: 3, name: "John", age: 15 });
            (0, globals_1.expect)(pirkanInstance.getAll).toHaveLength(3);
            (0, globals_1.expect)(pirkanInstance.exposeFindById(3)).toEqual({ id: 3, name: "John", age: 15 });
        });
    });
    (0, globals_1.describe)("Dual Key Method Generation", () => {
        (0, globals_1.beforeEach)(() => {
            // Create an instance of TestablePirkan with dual keys
            pirkanInstance = new TestablePirkan({
                items: [
                    { id: 1, name: "Joe", age: 10 },
                    { id: 1, name: "John", age: 15 },
                    { id: 2, name: "Jane", age: 12 }
                ],
                withIndexedLookup: { byKeyName: "id", byDualKeyName: ["id", "name"] }
            });
        });
        (0, globals_1.it)("should find items by id and name", () => {
            (0, globals_1.expect)(pirkanInstance.exposeFindByIdAndName(1, "Joe")).toEqual({ id: 1, name: "Joe", age: 10 });
            (0, globals_1.expect)(pirkanInstance.exposeFindByIdAndName(1, "John")).toEqual({ id: 1, name: "John", age: 15 });
            (0, globals_1.expect)(pirkanInstance.exposeFindByIdAndName(2, "Jane")).toEqual({ id: 2, name: "Jane", age: 12 });
            (0, globals_1.expect)(pirkanInstance.exposeFindByIdAndName(1, "Nonexistent")).toBeUndefined();
            (0, globals_1.expect)(pirkanInstance.exposeFindByIdAndName(3, "AnyName")).toBeUndefined();
        });
    });
    (0, globals_1.describe)("transformKeys", () => {
        const originalItems = [
            { id: 1, name: 'Joe', age: 20 },
            { id: 2, name: 'Jane', age: 25 },
        ];
        const pirkanInstance = new pirkan_1.default({
            items: originalItems,
            withIndexedLookup: {
                byKeyName: 'id',
            }
        });
        (0, globals_1.it)('should transform keys using Transform class', () => {
            const keyMapping = { id: 'userId', name: 'userName' };
            const transformedItems = pirkanInstance.transformKeys(keyMapping);
            (0, globals_1.expect)(transformedItems).toEqual([
                { userId: 1, userName: 'Joe', age: 20 },
                { userId: 2, userName: 'Jane', age: 25 },
            ]);
        });
        (0, globals_1.it)('should handle empty input array in transformKeys', () => {
            const emptyPirkanInstance = new pirkan_1.default({
                items: [],
                withIndexedLookup: {
                    byKeyName: 'id',
                },
            });
            const keyMapping = { id: 'userId', name: 'userName' };
            // @ts-expect-error
            const transformedItems = emptyPirkanInstance.transformKeys(keyMapping);
            (0, globals_1.expect)(transformedItems).toEqual([]);
        });
        (0, globals_1.it)('should keep original keys for unmapped properties', () => {
            const keyMapping = { id: 'userId' };
            const transformedItems = pirkanInstance.transformKeys(keyMapping);
            (0, globals_1.expect)(transformedItems).toEqual([
                { userId: 1, name: 'Joe', age: 20 },
                { userId: 2, name: 'Jane', age: 25 },
            ]);
        });
        (0, globals_1.it)('should not transform keys that do not exist in the items', () => {
            const keyMapping = { id: 'userId', nonExistentKey: 'newKey' };
            const transformedItems = pirkanInstance.transformKeys(keyMapping);
            (0, globals_1.expect)(transformedItems).toEqual([
                { userId: 1, name: 'Joe', age: 20 },
                { userId: 2, name: 'Jane', age: 25 },
            ]);
        });
    });
});
