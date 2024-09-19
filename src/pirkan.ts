import MethodGenerator from "./method-generator/method-generator";
import Transform from "./transform/transform";

type PirkanInit<T> = {
  items: T[];
  byKeyName: keyof T | 'id';
  byDualKeyName?: [keyof T, keyof T];
}

class Pirkan<T> extends MethodGenerator<T> {
  private items: T[];

  constructor({
    items,
    byKeyName = 'id', 
    byDualKeyName 
  }: PirkanInit<T>) {
    super(byKeyName, byDualKeyName);
    this.items = items;
    this.generateMethods(this); // Pass the current instance
  }

  get getAll(): T[] {
    return this.items;
  }

  public transformKeys(keyMap: { [K in keyof T]?: string }): Partial<{ [K in keyof T]: any }>[] {
    return Transform.transformKeys(this.items as object[], keyMap);
  }
}

export default Pirkan;
