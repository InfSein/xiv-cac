# XIV-CAC (FFXIV Craft Action Code)

[![NPM version](https://img.shields.io/npm/v/xiv-cac-utils.svg)](https://www.npmjs.com/package/xiv-cac-utils)

[简体中文](../README.md) | [繁體中文](./README_zh-TW.md) | [English](./README_en.md) | [日本語](./README_ja.md) | **Deutsch** | [Français](./README_fr.md) | [한국어](./README_ko.md)

> [!NOTE]
> Dieses Dokument wurde von einer KI übersetzt und kann Fehler enthalten. Im Falle von Konflikten ist die ursprüngliche vereinfachte chinesische Version maßgebend. Wenn Sie eine manuelle Überprüfung durchführen möchten, können Sie gerne einen PR einreichen und diesen Abschnitt entfernen.

Eine Hilfsbibliothek zur Serialisierung von FFXIV-Handwerkskommandos sowie die zugehörige Frontend-Tool-Website.

Unser Ziel ist es, ein standardisiertes, leichtgewichtiges Zeichenkodierungsschema bereitzustellen, das es verschiedenen Tools, Spielern und Communities ermöglicht, Arbeitsabläufe in der Produktion einfacher auszutauschen.

## Tool-Website

Bitte besuchen Sie eine der folgenden Websites:

 - <https://cac.nbb.fan/>
 - <https://infsein.github.io/xiv-cac/>

## Projektstruktur

Dieses Projekt verwendet eine Monorepo-Struktur:

 - `packages/utils`: Kernpaket mit der Logik für Kompression, Dekompression, Deserialisierung und Datendefinition der Handwerkskommandos.
 - `packages/website`: React-basierte Frontend-Seite mit einer visuellen Bedienoberfläche.

---

## NPM-Paket: xiv-cac-utils

`xiv-cac-utils` ist das Herzstück dieses Projekts und bietet effiziente Kodierungs- und Dekodierungslogik für FFXIV-Handwerkskommandos.

> [!CAUTION]\
> Dieses Projekt ist nur für das Komprimieren und Dekomprimieren von Handwerkskommandos verantwortlich; es berücksichtigt nicht die Kontinuität oder Verwendbarkeit der Kommandos untereinander.\
> Falls erforderlich, sollten Sie diese Logik auf der Geschäftsebene implementieren.

### Installation

```bash
npm install xiv-cac-utils
```

### API-Leitfaden

Entwickler können dieses Paket einbinden, um zwischen Handwerks-Makros und CAC-Aktionscodes zu konvertieren.

#### 1. Aktionssequenz komprimieren (`compress`)

Konvertiert eine Gruppe von Aktions-IDs, Namen oder Signaturen in eine kompakte CAC-Aktionscode-Zeichenfolge.

```typescript
import { compress } from 'xiv-cac-utils';

// Option A: Komprimierung über Action-IDs aus dem Spiel
const codeFromId = compress({
  type: 'id',
  actions: [260, 4574, 4631]
});
console.log(codeFromId); // Ausgabe etwa: 1v...

// Option B: Komprimierung über Aktionsnamen
const codeFromName = compress({
  type: 'name',
  actions: ['Große Schritte', 'Meisterhaftes Fertigstellen', 'Trained Perfection'] // Unterstützt mehrere Sprachen, auch gemischt
});

// Option C: Komprimierung über interne Bezeichner verschiedener Software (Signaturen)
const codeFromSign = compress({
  type: 'signature',
  actions: ['trained_perfection', 'basicTouch', 'carefulSynthesis2']
});

// Option D: Array direkt eingeben, automatische Typ-Inferenz
// Keine Angabe des Typs erforderlich. Unterstützt IDs, Namen oder Signaturen
const codeAuto1 = compress([100001, 100002]);
const codeAuto2 = compress(['Reflect', 'Basic Synthesis']);
const codeAuto3 = compress(['waste_not_ii', 'basic_synthesis']);
const codeAutoMixed = compress(['Große Schritte', 'basic_touch']); // Sogar gemischte Nutzung wird unterstützt
```

#### 2. Kodierte Zeichenfolge dekomprimieren (`decompress`)

Stellt CAC-Kodierungen in eine detaillierte Sequenz von Aktionsinformationen wieder her.

```typescript
import { decompress } from 'xiv-cac-utils';

try {
  const actions = decompress('1v...'); // CAC-Code übergeben
  actions.forEach(action => {
    console.log(action); // { id: 260, name_en: 'Great Strides', name_zh: '阔步', name_jp: '阔步', icon: 1955, wait_time: 2, ... }
  });
} catch (e) {
  console.error('Ungültiges Kodierungsformat');
}
```

### Typdefinitionen

Das Paket enthält vollständige TypeScript-Unterstützung. Wichtige Typen sind:

 - `DecompressedCraftAction`: Das dekomprimierte Aktionsobjekt mit mehrsprachigen Namen, Symbol-IDs, Wartezeiten usw.
 - `CraftActionCacId`: Standardisierte interne Aktionsaufzählung.

---

## Entwicklung & Beteiligung

### Voraussetzungen
 - Node.js 20+
 - npm 11+

### Wartung der Aktionsdaten
 - [`packages\utils\src\types\craftactions.ts`](../packages/utils/src/types/craftactions.ts)
 - [`packages\utils\src\data\craftactions.ts`](../packages/utils/src/data/craftactions.ts)

## Lizenz

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!TIP]\
> Der Code dieses Projekts selbst ist unter der oben genannten Lizenz quelloffen. Alle anderen zitierten Codes und Ressourcen (falls vorhanden) respektieren jedoch die von ihren jeweiligen Urheberrechtsinhabern erklärten Rechte.\
> Darüber hinaus stehen sämtliche Streitigkeiten, die durch die kommerzielle Nutzung des Projekts mit SQUARE ENIX und/oder anderen kommerziellen Einheiten entstehen könnten, in keiner Verbindung zu diesem Projekt.
