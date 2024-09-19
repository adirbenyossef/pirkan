"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const method_generator_1 = __importDefault(require("./method-generator"));
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("MethodGenerator", () => {
    (0, globals_1.describe)("Single Key Method Generation", () => {
        (0, globals_1.it)("should generate a findById method that works correctly", () => {
            // Setup
            const items = [
                { id: 1, name: "Joe", age: 10 },
                { id: 2, name: "Jane", age: 12 },
            ];
            const methodGen = new method_generator_1.default("id");
            // Create a mock instance to test the generated methods
            const instance = { items };
            methodGen.generateMethods(instance);
            // Test the generated method
            (0, globals_1.expect)(instance.findById(1)).toEqual({ id: 1, name: "Joe", age: 10 });
            (0, globals_1.expect)(instance.findById(2)).toEqual({ id: 2, name: "Jane", age: 12 });
            (0, globals_1.expect)(instance.findById(3)).toBeUndefined();
        });
    });
    (0, globals_1.describe)("Dual Key Method Generation", () => {
        (0, globals_1.it)("should generate a findByIdAndName method that works correctly", () => {
            // Setup
            const items = [
                { id: 1, name: "Joe", age: 10 },
                { id: 2, name: "Jane", age: 12 },
                { id: 1, name: "John", age: 15 }, // Duplicate id with different name
            ];
            const methodGen = new method_generator_1.default("id", ["id", "name"]);
            // Create a mock instance to test the generated methods
            const instance = { items };
            methodGen.generateMethods(instance);
            // Test the generated method
            (0, globals_1.expect)(instance.findByIdAndName(1, "Joe")).toEqual({ id: 1, name: "Joe", age: 10 });
            (0, globals_1.expect)(instance.findByIdAndName(1, "John")).toEqual({ id: 1, name: "John", age: 15 });
            (0, globals_1.expect)(instance.findByIdAndName(2, "Jane")).toEqual({ id: 2, name: "Jane", age: 12 });
            (0, globals_1.expect)(instance.findByIdAndName(1, "Nonexistent")).toBeUndefined();
            (0, globals_1.expect)(instance.findByIdAndName(3, "AnyName")).toBeUndefined();
        });
    });
});
