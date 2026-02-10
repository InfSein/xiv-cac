# XIV-CAC (FFXIV Craft Action Code)

[![NPM version](https://img.shields.io/npm/v/xiv-cac-utils.svg)](https://www.npmjs.com/package/xiv-cac-utils)

[简体中文](../README.md) | [繁體中文](./README_zh-TW.md) | [English](./README_en.md) | **日本語** | [Deutsch](./README_de.md) | [Français](./README_fr.md) | [한국어](./README_ko.md)

> [!NOTE]
> このドキュメントは AI によって翻訳されており、誤りが含まれている可能性があります。不一致がある場合は、簡体字中国語の原文が優先されます。手動での確認を希望される場合は、PR を作成してこのセクションを削除してください。

FFXIV（ファイナルファンタジーXIV）の製作アクションをシリアル化するためのツールライブラリ、および付属のフロントエンドツールサイトです。

私たちは、異なるツール、プレイヤー、コミュニティ間で製作手順をより簡単に共有できるように、標準的で軽量な文字列エンコードスキームを提供することを目指しています。

## ツールサイト

以下のいずれかのサイトにアクセスしてください：

 - <https://cac.nbb.fan/>
 - <https://infsein.github.io/xiv-cac/>

## プロジェクト構造

このプロジェクトは Monorepo 構造を採用しています：

 - `packages/utils`: コアロジックパッケージ。製作アクションの圧縮再帰、展開デシリアライズ、およびデータ定義を担当します。
 - `packages/website`: React ベースのフロントエンドページ。視覚的な操作インターフェースを提供します。

---

## パッケージ：xiv-cac-utils

`xiv-cac-utils` はこのプロジェクトのコア npm パッケージであり、FFXIV 製作アクションのための効率的なエンコード/デコードロジックを提供します。

> [!CAUTION]\
> このプロジェクトは製作アクションの圧縮と展開のみを担当し、アクション間の連続性や使用可能性については関知しません。\
> 必要に応じて、ビジネスロジック層でこれらを実装してください。

### インストール

```bash
npm install xiv-cac-utils
```

### 主要 API ガイド

開発者はこのパッケージを導入することで、製作マクロと CAC アクションコードの間の変換を実現できます。

#### 1. アクションシーケンスの圧縮 (`compress`)

アクション ID、名前、またはシグネチャのセットを、コンパクトな 1 行の CAC アクションコード文字列に変換します。

```typescript
import { compress } from 'xiv-cac-utils';

// オプション A：ゲーム内のアクション ID による圧縮
const codeFromId = compress({
  type: 'id',
  actions: [260, 4574, 4631]
});
console.log(codeFromId); // 出力例: 1v...

// オプション B：アクション名による圧縮
const codeFromName = compress({
  type: 'name',
  actions: ['グレートストライド', '匠の絶技', 'Trained Perfection'] // 複数の言語に対応。混在も可能
});

// オプション C：各ソフトウェア内部のアクション識別子（シグネチャ）による圧縮
const codeFromSign = compress({
  type: 'signature',
  actions: ['trained_perfection', 'basicTouch', 'carefulSynthesis2']
});

// オプション D：配列を直接入力、自動的な型推論
// タイプを指定する必要はなく、ID、名前、または署名をサポートします
const codeAuto1 = compress([100001, 100002]);
const codeAuto2 = compress(['Reflect', 'Basic Synthesis']);
const codeAuto3 = compress(['waste_not_ii', 'basic_synthesis']);
const codeAutoMixed = compress(['グレートストライド', 'basic_touch']); // 混合使用もサポート
```

#### 2. エンコードされた文字列の展開 (`decompress`)

CAC エンコードを詳細なアクション情報シーケンスに復元します。

```typescript
import { decompress } from 'xiv-cac-utils';

try {
  const actions = decompress('1v...'); // CAC コードを入力
  actions.forEach(action => {
    console.log(action); // { id: 260, name_en: 'Great Strides', name_zh: '阔步', name_jp: '阔步', icon: 1955, wait_time: 2, ... }
  });
} catch (e) {
  console.error('無効なエンコード形式');
}
```

### 型定義

パッケージには完全な TypeScript サポートが含まれています。主な型は以下の通りです：

 - `DecompressedCraftAction`: 展開後のアクションオブジェクト。多言語名、アイコン ID、待ち時間などを含みます。
 - `CraftActionCacId`: 内部的に標準化されたアクションの列挙型。

---

## 開発と貢献

### 動作環境
 - Node.js 20+
 - npm 11+

### アクションデータのメンテナンス
 - [`packages\utils\src\types\craftactions.ts`](../packages/utils/src/types/craftactions.ts)
 - [`packages\utils\src\data\craftactions.ts`](../packages/utils/src/data/craftactions.ts)

## ライセンス

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!TIP]\
> このプロジェクト自体のコードは上記のライセンスに基づいてオープンソース化されています。ただし、引用されている他のコードやリソース（もしあれば）は、それぞれの著作権者が宣言した権利を尊重します。\
> また、プロジェクトを商用利用した結果として SQUARE ENIX や他の営利団体との間で発生する可能性のある紛争について、当プロジェクトは一切関与しません。
