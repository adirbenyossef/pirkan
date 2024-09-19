// transform.ts
export default class Transform<T extends object> {
    public static transformKeys<U extends object>(
      items: U[], 
      keyMap: { [K in keyof U]?: string }
    ): Partial<{ [K in keyof U]: any }>[] {
      return items.map(item => {
        const newItem: Partial<{ [K in keyof U]: any }> = {};
  
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key) && keyMap[key]) {
            newItem[keyMap[key] as keyof U] = item[key];
          } else {
            newItem[key] = item[key]; // Keep original key if not mapped
          }
        }
  
        return newItem;
      });
    }
  }
  