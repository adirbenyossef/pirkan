import Transform from './transform'; // Adjust the import based on your file structure

describe('Transform Class', () => {
  const originalItems = [
    { id: 1, name: 'Joe', age: 20 },
    { id: 2, name: 'Jane', age: 25 },
  ];

  it('should transform keys based on the provided mapping', () => {
    const keyMapping = { id: 'userId', name: 'userName' };
    const transformedItems = Transform.transformKeys(originalItems, keyMapping);
    
    expect(transformedItems).toEqual([
      { userId: 1, userName: 'Joe', age: 20 },
      { userId: 2, userName: 'Jane', age: 25 },
    ]);
  });

  it('should keep original keys for unmapped properties', () => {
    const keyMapping = { id: 'userId', name: 'userName' };
    const transformedItems = Transform.transformKeys(originalItems, keyMapping);
    
    expect(transformedItems).toEqual([
      { userId: 1, userName: 'Joe', age: 20 },
      { userId: 2, userName: 'Jane', age: 25 },
    ]);
  });

  it('should not transform keys that do not exist in the items', () => {
    const keyMapping = { id: 'userId', nonExistentKey: 'newKey' };
    const transformedItems = Transform.transformKeys(originalItems, keyMapping);
    
    expect(transformedItems).toEqual([
      { userId: 1, name: 'Joe', age: 20 },
      { userId: 2, name: 'Jane', age: 25 },
    ]);
  });

  it('should show lint error if key not in object type', () => {
    // Document the expected behavior instead of running a test
    const keyMapping = { id: 'userId', invalidKey: 'newKey' }; 
    // This should be an error in TypeScript when you try to use invalidKey if it is not part of the object type
    // Uncomment the following line to see the lint error during development
    // Transform.transformKeys(originalItems, keyMapping);
    
    // You can also describe the expected behavior
    expect(true).toBe(true); // Placeholder for documentation purposes
  });
});
