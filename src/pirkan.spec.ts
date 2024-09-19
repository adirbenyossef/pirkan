import Pirkan from "./pirkan";
import { describe, it, expect, beforeEach } from "@jest/globals";

// Sample data type
interface Person {
  id: number;
  name: string;
  age: number;
}

// Helper class to expose private methods for testing
class TestablePirkan<T> extends Pirkan<T> {
  public exposeFindById(id: number): T | undefined {
    return (this as any).findById(id);
  }

  public exposeFindByIdAndName(id: number, name: string): T | undefined {
    return (this as any).findByIdAndName(id, name);
  }

  public add(item: T): void {
    (this as any).items.push(item);
    this.generateMethods(this); // Regenerate methods after adding
  }
}

describe("Pirkan", () => {
  let pirkanInstance: TestablePirkan<Person>;

  beforeEach(() => {
    // Initialize with sample data
    const items: Person[] = [
      { id: 1, name: "Joe", age: 10 },
      { id: 2, name: "Jane", age: 12 },
    ];

    // Create an instance of TestablePirkan with single key
    pirkanInstance = new TestablePirkan<Person>({
      items,
      withIndexedLookup: { byKeyName: "id" }
    });
  });

  describe("Constructor", () => {
    it("should initialize with provided items and create methods", () => {
      expect(pirkanInstance.getAll).toHaveLength(2);
      expect(typeof pirkanInstance.exposeFindById(1)).toBe("object");
    });
  });

  describe("Method Generation", () => {
    it("should find items by id", () => {
      expect(pirkanInstance.exposeFindById(1)).toEqual({ id: 1, name: "Joe", age: 10 });
      expect(pirkanInstance.exposeFindById(2)).toEqual({ id: 2, name: "Jane", age: 12 });
      expect(pirkanInstance.exposeFindById(3)).toBeUndefined();
    });
  });

  describe("Adding Items", () => {
    it("should add new items and regenerate methods", () => {
      pirkanInstance.add({ id: 3, name: "John", age: 15 });

      expect(pirkanInstance.getAll).toHaveLength(3);
      expect(pirkanInstance.exposeFindById(3)).toEqual({ id: 3, name: "John", age: 15 });
    });
  });

  describe("Dual Key Method Generation", () => {
    beforeEach(() => {
      // Create an instance of TestablePirkan with dual keys
      pirkanInstance = new TestablePirkan<Person>({
        items: [
          { id: 1, name: "Joe", age: 10 },
          { id: 1, name: "John", age: 15 },
          { id: 2, name: "Jane", age: 12 }
        ],
        withIndexedLookup: { byKeyName: "id", byDualKeyName: ["id", "name"] }
      });
    });

    it("should find items by id and name", () => {
      expect(pirkanInstance.exposeFindByIdAndName(1, "Joe")).toEqual({ id: 1, name: "Joe", age: 10 });
      expect(pirkanInstance.exposeFindByIdAndName(1, "John")).toEqual({ id: 1, name: "John", age: 15 });
      expect(pirkanInstance.exposeFindByIdAndName(2, "Jane")).toEqual({ id: 2, name: "Jane", age: 12 });
      expect(pirkanInstance.exposeFindByIdAndName(1, "Nonexistent")).toBeUndefined();
      expect(pirkanInstance.exposeFindByIdAndName(3, "AnyName")).toBeUndefined();
    });
  });

  describe("transformKeys", () => {
    const originalItems = [
        { id: 1, name: 'Joe', age: 20 },
        { id: 2, name: 'Jane', age: 25 },
      ];
    
      const pirkanInstance = new Pirkan({
        items: originalItems,
        withIndexedLookup: {
          byKeyName: 'id',
        }
    });
    
    it('should transform keys using Transform class', () => {
        const keyMapping = { id: 'userId', name: 'userName' };
        const transformedItems = pirkanInstance.transformKeys(keyMapping);
        
        expect(transformedItems).toEqual([
          { userId: 1, userName: 'Joe', age: 20 },
          { userId: 2, userName: 'Jane', age: 25 },
        ]);
      });
    
      it('should handle empty input array in transformKeys', () => {
        const emptyPirkanInstance = new Pirkan({
          items: [],
          withIndexedLookup: {
            byKeyName: 'id',
          },
        });
        const keyMapping = { id: 'userId', name: 'userName' };
        // @ts-expect-error
        const transformedItems = emptyPirkanInstance.transformKeys(keyMapping);
        
        expect(transformedItems).toEqual([]);
      });
    
      it('should keep original keys for unmapped properties', () => {
        const keyMapping = { id: 'userId' };
        const transformedItems = pirkanInstance.transformKeys(keyMapping);
        
        expect(transformedItems).toEqual([
          { userId: 1, name: 'Joe', age: 20 },
          { userId: 2, name: 'Jane', age: 25 },
        ]);
      });
    
      it('should not transform keys that do not exist in the items', () => {
        const keyMapping = { id: 'userId', nonExistentKey: 'newKey' };
        const transformedItems = pirkanInstance.transformKeys(keyMapping);
        
        expect(transformedItems).toEqual([
          { userId: 1, name: 'Joe', age: 20 },
          { userId: 2, name: 'Jane', age: 25 },
        ]);
      });
    });
});
