class MethodGenerator<T> {
  private keyName: keyof T | 'id';
  private dualKeys?: [keyof T, keyof T];
  private index: Map<any, T> = new Map();
  private dualIndex: Map<any, Map<any, T>> = new Map();

  constructor(byKeyName: keyof T | 'id', dualKeyName?: [keyof T, keyof T]) {
    this.keyName = byKeyName;
    this.dualKeys = dualKeyName;
  }

  // Generates methods based on provided keys
  generateMethods(pirkanInstance: any) {
    if (this.dualKeys) {
      const [key1, key2] = this.dualKeys;
      pirkanInstance[`findBy${this.capitalize(String(key1))}And${this.capitalize(String(key2))}`] = (value1: any, value2: any) => 
        this.findByDualKeys(value1, value2);
    } else {
      pirkanInstance[`findBy${this.capitalize(String(this.keyName))}`] = (value: any) => 
        this.findBySingleKey(value);
    }
    // Initialize the index
    this.initializeIndex(pirkanInstance.items);
  }

  private initializeIndex(items: T[]) {
    if (this.dualKeys) {
      const [key1, key2] = this.dualKeys;
      items.forEach(item => {
        const key1Value = item[key1 as keyof T];
        const key2Value = item[key2 as keyof T];
        if (!this.dualIndex.has(key1Value)) {
          this.dualIndex.set(key1Value, new Map());
        }
        this.dualIndex.get(key1Value)!.set(key2Value, item);
      });
    } else {
      items.forEach(item => {
        this.index.set(item[this.keyName as keyof T], item);
      });
    }
  }

  private findBySingleKey(value: any) {
    return this.index.get(value);
  }

  private findByDualKeys(value1: any, value2: any) {
    const map = this.dualIndex.get(value1);
    return map ? map.get(value2) : undefined;
  }

  private capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

export default MethodGenerator;
