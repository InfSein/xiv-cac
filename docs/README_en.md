# XIV-CAC (FFXIV Craft Action Code)

[![NPM version](https://img.shields.io/npm/v/xiv-cac-utils.svg)](https://www.npmjs.com/package/xiv-cac-utils)

[简体中文](../README.md) | [繁體中文](./README_zh-TW.md) | **English** | [日本語](./README_ja.md) | [Deutsch](./README_de.md) | [Français](./README_fr.md) | [한국어](./README_ko.md)

> [!NOTE]
> This document has been translated by AI and may contain errors. In case of conflict, the original Simplified Chinese version shall prevail. If you are willing to perform a human review, you are welcome to submit a PR and remove this section.

A utility library for FFXIV craft action serialization, along with its supporting frontend tools website.

We aim to provide a standard, lightweight string encoding scheme that makes it easier for different tools, players, and communities to share production workflows.

## Tools Website

Please visit one of the following websites:

 - <https://cac.nbb.fan/>
 - <https://infsein.github.io/xiv-cac/>

## Project Structure

This project uses a Monorepo structure:

 - `packages/utils`: Core logic package, responsible for compression, decompression, deserialization, and data definition of craft actions.
 - `packages/website`: React-based frontend page providing a visual operation interface.

---

## Package: xiv-cac-utils

`xiv-cac-utils` is the core npm package of this project, providing efficient encoding and decoding logic for FFXIV craft actions.

> [!CAUTION]\
> This project is only responsible for compressing and decompressing craft actions; it does not concern itself with the sequence's continuity or usability.\
> If needed, you should implement such logic at the business level.

### Installation

```bash
npm install xiv-cac-utils
```

### Core API Guide

Developers can convert between craft macros and CAC action codes by importing this package.

#### 1. Compress Action Sequence (`compress`)

Converts a set of action IDs, names, or signatures into a compact CAC action code string.

```typescript
import { compress } from 'xiv-cac-utils';

// Option A: Compress via in-game Action IDs
const codeFromId = compress({
  type: 'id',
  actions: [260, 4574, 4631]
});
console.log(codeFromId); // Output: 1v...

// Option B: Compress via Action names
const codeFromName = compress({
  type: 'name',
  actions: ['Great Strides', 'Trained Perfection', '匠の絶技'] // Supports multiple languages, even mixed use
});

// Option C: Compress via internal identifiers used by various software
const codeFromSign = compress({
  type: 'signature',
  actions: ['trained_perfection', 'basicTouch', 'carefulSynthesis2']
});

// Option D: Direct array input with automatic type inference
// No need to specify type; supports IDs, names, or signatures
const codeAuto1 = compress([100001, 100002]);
const codeAuto2 = compress(['Reflect', 'Basic Synthesis']);
const codeAuto3 = compress(['waste_not_ii', 'basic_synthesis']);
const codeAutoMixed = compress(['Great Strides', 'basic_touch']); // Even mixed use is supported
```

#### 2. Decompress Encoded String (`decompress`)

Restores CAC encoding to a detailed sequence of action information.

```typescript
import { decompress } from 'xiv-cac-utils';

try {
  const actions = decompress('1v...'); // Pass the CAC code
  actions.forEach(action => {
    console.log(action); // { id: 260, name_en: 'Great Strides', name_zh: '阔步', name_jp: '阔步', icon: 1955, wait_time: 2, ... }
  });
} catch (e) {
  console.error('Invalid encoding format');
}
```

### Type Definitions

The package includes full TypeScript support. Key types include:

 - `DecompressedCraftAction`: The decompressed action object, containing multi-language names, icon IDs, wait times, etc.
 - `CraftActionCacId`: Standardized internal action enumeration.

---

## Development & Contribution

### Environment
 - Node.js 20+
 - npm 11+

### Maintaining Action Data
 - [`packages\utils\src\types\craftactions.ts`](../packages/utils/src/types/craftactions.ts)
 - [`packages\utils\src\data\craftactions.ts`](../packages/utils/src/data/craftactions.ts)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!TIP]\
> The code of this project itself is open-sourced under the above license. However, any other code and resources referenced (if any) respect the rights declared by their respective copyright holders.\
> Furthermore, any disputes that may arise with SQUARE ENIX and/or other commercial entities as a result of commercial use of the project are unrelated to this project.
