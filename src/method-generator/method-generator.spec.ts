import MethodGenerator from "./method-generator";
import { describe, it, expect } from "@jest/globals";

// Sample data type
interface Person {
  id: number;
  name: string;
  age: number;
}

describe("MethodGenerator", () => {
  
  describe("Single Key Method Generation", () => {
    it("should generate a findById method that works correctly", () => {
      // Setup
      const items: Person[] = [
        { id: 1, name: "Joe", age: 10 },
        { id: 2, name: "Jane", age: 12 },
      ];
      const methodGen = new MethodGenerator<Person>("id");

      // Create a mock instance to test the generated methods
      const instance: any = { items };
      methodGen.generateMethods(instance);

      // Test the generated method
      expect(instance.findById(1)).toEqual({ id: 1, name: "Joe", age: 10 });
      expect(instance.findById(2)).toEqual({ id: 2, name: "Jane", age: 12 });
      expect(instance.findById(3)).toBeUndefined();
    });
  });

  describe("Dual Key Method Generation", () => {
    it("should generate a findByIdAndName method that works correctly", () => {
      // Setup
      const items: Person[] = [
        { id: 1, name: "Joe", age: 10 },
        { id: 2, name: "Jane", age: 12 },
        { id: 1, name: "John", age: 15 }, // Duplicate id with different name
      ];
      const methodGen = new MethodGenerator<Person>("id", ["id", "name"]);

      // Create a mock instance to test the generated methods
      const instance: any = { items };
      methodGen.generateMethods(instance);

      // Test the generated method
      expect(instance.findByIdAndName(1, "Joe")).toEqual({ id: 1, name: "Joe", age: 10 });
      expect(instance.findByIdAndName(1, "John")).toEqual({ id: 1, name: "John", age: 15 });
      expect(instance.findByIdAndName(2, "Jane")).toEqual({ id: 2, name: "Jane", age: 12 });
      expect(instance.findByIdAndName(1, "Nonexistent")).toBeUndefined();
      expect(instance.findByIdAndName(3, "AnyName")).toBeUndefined();
    });
  });
});
