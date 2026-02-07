# XIV-CAC (FFXIV Craft Action Code)

[![NPM version](https://img.shields.io/npm/v/xiv-cac-utils.svg)](https://www.npmjs.com/package/xiv-cac-utils)

[简体中文](../README.md) | **繁體中文** | [English](./README_en.md) | [日本語](./README_ja.md) | [Deutsch](./README_de.md) | [Français](./README_fr.md) | [한국어](./README_ko.md)

> [!NOTE]
> 這篇文檔是由 AI 翻譯的，可能存在錯誤。如有衝突請以簡體中文原文為準。如果您有意願進行人工審核，歡迎發起 PR 並刪除本段落。

《最終幻想XIV》生產技能序列化的工具庫，以及配套的前端工具站。

我們期望提供一套標準的、輕量級的字符串編碼方案，從而讓不同工具、不同玩家、不同社區之間能夠更加簡單地傳遞生產作業流程。

## 工具站

請訪問下述網站之一：

 - <https://cac.nbb.fan/>
 - <https://infsein.github.io/xiv-cac/>

## 項目結構

本項目採用 Monorepo 結構：

 - `packages/utils`: 核心邏輯包，負責生產技能的壓縮遞歸、解壓反序列化以及數據定義。
 - `packages/website`: 基於 React 的前端展示頁面，提供可視化操作界面。

---

## 軟件包：xiv-cac-utils

`xiv-cac-utils` 是本項目的核心 npm 包，提供了一套針對 FFXIV 生產技能的高效編解碼邏輯。

> [!CAUTION]\
> 本項目只負責壓縮和解壓生產技能，不關心技能之間的連貫性和可用性。\
> 如有需要，你應當在業務層面實現這些邏輯。

### 安裝

```bash
npm install xiv-cac-utils
```

### 核心 API 調用指南

開發者可以通過引入該包，實現生產宏與 CAC 工序碼之間的轉換。

#### 1. 壓縮技能序列 (`compress`)

將一組技能 ID、名稱或簽名轉換成一行緊湊的 CAC 工序碼字符串。

```typescript
import { compress } from 'xiv-cac-utils';

// 方式 A：通過遊戲內的 Action ID 壓縮
const codeFromId = compress({
  type: 'id',
  actions: [260, 4574, 4631]
});
console.log(codeFromId); // 輸出類似: 1v...

// 方式 B：通過技能名稱壓縮
const codeFromName = compress({
  type: 'name',
  actions: ['闊步', '匠の絶技', 'Trained Perfection'] // 支持多種語言，甚至可以混搭使用
});

// 方式 C：通過各軟件內部對生產技能的標識符壓縮
const codeFromSign = compress({
  type: 'signature',
  actions: ['trained_perfection', 'basicTouch', 'carefulSynthesis2']
});

// 方式 D：直接傳入數組，自動推斷類型
// 無需指定類型，支持 ID、名稱或簽名
const codeAuto1 = compress([100001, 100002]);
const codeAuto2 = compress(['Reflect', 'Basic Synthesis']);
const codeAuto3 = compress(['waste_not_ii', 'basic_synthesis']);
const codeAutoMixed = compress(['闊步', 'basic_touch']); // 甚至支持混合使用
```

#### 2. 解壓編碼字符串 (`decompress`)

將 CAC 編碼還原為詳細的技能信息序列。

```typescript
import { decompress } from 'xiv-cac-utils';

try {
  const actions = decompress('1v...'); // 傳入 CAC 編碼
  actions.forEach(action => {
    console.log(action); // { id: 260, name_en: 'Great Strides', name_zh: '阔步', name_jp: '阔步', icon: 1955, wait_time: 2, ... }
  });
} catch (e) {
  console.error('無效的編碼格式');
}
```

### 類型定義

包内置了完善的 TypeScript 支持，主要類型包括：

 - `DecompressedCraftAction`: 解壓後的技能對象，包含多語言名稱、圖標 ID、等待時間等。
 - `CraftActionCacId`: 內部標準化的技能枚舉。

---

## 開發與貢獻

### 運行環境
 - Node.js 20+
 - npm 11+

### 維護技能數據
 - [`packages\utils\src\types\craftactions.ts`](../packages/utils/src/types/craftactions.ts)
 - [`packages\utils\src\data\craftactions.ts`](../packages/utils/src/data/craftactions.ts)

## 開源協議

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!TIP]\
> 此項目本身的代碼基於上述協議開源，但是所引用的其他代碼及資源(如果有)尊重其版權所有者聲明的權利。\
> 除此以外，將項目商用而造致的與 SQUARE ENIX 和/或其他商業集體之間可能產生的任何糾紛均與本項目無關。
