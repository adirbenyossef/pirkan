# Pirkan

**Pirkan** is a TypeScript package designed for creating modular collections of business logic. It provides functionality for transforming data, merging, pivoting, and more, using a flexible indexing system.

## Features

- **Modular Structure**: Create modules for collections with various operations.
- **Dynamic Method Generation**: Automatically generate methods like `findById`, `findByName`, and more based on your data structure.
- **Key Transformation**: Easily transform keys of objects with a specified mapping.

# Installation

To install the package, run:

```bash
npm install pirkan
```
# Usage

Initializing a Pirkan Instance 
the instance have this methods: `getAll`, `findById` and `transform`.
lets dive to each of them:


## getAll
```typescript
import Pirkan from 'pirkan';

interface IOrder { id: number; type: string; }
const orderCollection: IOrder = [{ id: 1, type: 'book', { id: 2, type: 'book' }];

const pirkanOrders = new Pirkan<IOrder>({items: orderCollection});
```

Get all collection items

```typescript
const orders: IOrder[] = pirkanOrders.getAll();
```
orders value when calling getAll:

```bash
 [{ id: 1, type: 'book' }]
```

## findById
findById
```typescript
const orders: IOrder = pirkanOrders.findById(1);
```

orders value when calling findById:

```bash
 [{ id: 1, type: 'book' }]
```
### findBy*
Initializing a Pirkan Instance grouped by any key you like, id is the default

```typescript
import Pirkan from 'pirkan';

interface IOrder { id: number; type: string; }
const orderCollection: IOrder = [{ id: 1, type: 'book' }, { id: 2, type: 'book' },{ id: 2, type: 'bag' }];

const pirkanOrders = new Pirkan<IOrder>({
  items: personCollection,
  byKeyName: 'type',
});
```

findByType
```typescript
const orders: IOrder = pirkanOrders.findByType('book'); //if book is in enum it will ask to use enum here i.e OrderTypes.BOOK
```

orders value when calling findByType:
```bash
 [{ id: 1, type: 'book' }, { id: 2, type: 'book' }]
```

### findBy{key1}And{key2} (for example findByIdAndType)
Initializing a Pirkan Instance with 

```typescript
import Pirkan from 'pirkan';

interface IOrder { id: number; type: string; }
const orderCollection: IOrder = [{ id: 1, type: 'book' }, { id: 2, type: 'book' },{ id: 2, type: 'bag' }];

const pirkanOrders = new Pirkan<IOrder>({
  items: personCollection,
  byDualKeyName: ['id', 'type'],
});
```

findByIdAndType
```typescript
const orders: IOrder = pirkanOrders.findByIdAndType(1, 'book'); //if book is in enum it will ask to use enum here
```

orders value when calling findByType:

```bash
 [{ id: 1, type: 'book' }]
```


## transformKeys
simple transform between existing keys to other keys, use a partial input, so you can provide any key you like, also it will check that your return value will return as expected.
only for shallow layer at the moment
```typescript
interface INewOrderStructure {userId: number, type: string}
const orders: INewOrderStructure = pirkanOrders.transformKeys<INewOrderStructure>({id: 'userId', type: 'orderType'});
```

orders value when calling transformKeys:

```bash
 [{ userId: 1, orderType: 'book' }, { userId: 2, orderType: 'book' }]
```


if someone want to help me with this, please message me here: adirbenyossef@gmail.com
thanks in advance :)

p.s 
pirkan is the hebrew word for module 