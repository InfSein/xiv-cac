# XIV-CAC (FFXIV Craft Action Code)

[![NPM version](https://img.shields.io/npm/v/xiv-cac-utils.svg)](https://www.npmjs.com/package/xiv-cac-utils)

**简体中文** | [繁體中文](./docs/README_zh-TW.md) | [English](./docs/README_en.md) | [日本語](./docs/README_ja.md) | [Deutsch](./docs/README_de.md) | [Français](./docs/README_fr.md) | [한국어](./docs/README_ko.md)

《最终幻想XIV》生产技能序列化的工具库，以及配套的前端工具站。

我们期望提供一套标准的、轻量级的字符串编码方案，从而让不同工具、不同玩家、不同社区之间能够更加简单地传递生产作业流程。

## 工具站

请访问下述网站之一：

 - <https://cac.nbb.fan/>
 - <https://infsein.github.io/xiv-cac/>

## 项目结构

本项目采用 Monorepo 结构：

 - `packages/utils`: 核心逻辑包，负责生产技能的压缩递归、解压反序列化以及数据定义。
 - `packages/website`: 基于 React 的前端展示页面，提供可视化操作界面。

---

## 软件包：xiv-cac-utils

`xiv-cac-utils` 是本项目的核心 npm 包，提供了一套针对 FFXIV 生产技能的高效编解码逻辑。

> [!CAUTION]\
> 本项目只负责压缩和解压生产技能，不关心技能之间的连贯性和可用性。
> <br>如有需要，你应当在业务层面实现这些逻辑。

### 安装

```bash
npm install xiv-cac-utils
```

### 核心 API 调用指南

开发者可以通过引入该包，实现生产宏与 CAC 工序码之间的转换。

#### 1. 压缩技能序列 (`compress`)

将一组技能 ID、名称或签名转换成一行紧凑的 CAC 工序码字符串。

```typescript
import { compress } from 'xiv-cac-utils';

// 方式 A：通过游戏内的 Action ID 压缩
const codeFromId = compress({
  type: 'id',
  actions: [260, 4574, 4631]
});
console.log(codeFromId); // 输出类似: 1v...

// 方式 B：通过技能名称压缩
const codeFromName = compress({
  type: 'name',
  actions: ['阔步', '匠の絶技', 'Trained Perfection'] // 支持多种语言，甚至可以混搭使用
});

// 方式 C：通过各软件内部对生产技能的标识符压缩
const codeFromSign = compress({
  type: 'signature',
  actions: ['trained_perfection', 'basicTouch', 'carefulSynthesis2']
});

// 方式 D：直接传入数组，自动推断类型
// 无需指定类型，支持 ID、名称或签名
const codeAuto1 = compress([100001, 100002]);
const codeAuto2 = compress(['Reflect', 'Basic Synthesis']);
const codeAuto3 = compress(['waste_not_ii', 'basic_synthesis']);
const codeAutoMixed = compress(['阔步', 'basic_touch']); // 支持多种语言，甚至可以混搭使用
```

#### 2. 解压编码字符串 (`decompress`)

将 CAC 编码还原为详细的技能信息序列。

```typescript
import { decompress } from 'xiv-cac-utils';

try {
  const actions = decompress('1v...'); // 传入 CAC 编码
  actions.forEach(action => {
    console.log(action); // { id: 260, name_en: 'Great Strides', name_zh: '阔步', name_jp: '阔步', icon: 1955, wait_time: 2, ... }
  });
} catch (e) {
  console.error('无效的编码格式');
}
```

### 类型定义

包内置了完善的 TypeScript 支持，主要类型包括：

 - `DecompressedCraftAction`: 解压后的技能对象，包含多语言名称、图标 ID、等待时间等。
 - `CraftActionCacId`: 内部标准化的技能枚举。

---

## 开发与贡献

### 运行环境
 - Node.js 20+
 - npm 11+

### 维护技能数据
 - [`packages\utils\src\types\craftactions.ts`](./packages/utils/src/types/craftactions.ts)
 - [`packages\utils\src\data\craftactions.ts`](./packages/utils/src/data/craftactions.ts)

## 开源协议

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!TIP]\
> 此项目本身的代码基于上述协议开源，但是所引用的其他代码及资源(如果有)尊重其版权所有者声明的权利。
> <br>除此以外，将项目商用而造致的与 SQUARE ENIX 和/或其他商业集体之间可能产生的任何纠纷均与本项目无关。
