# XIV-CAC (FFXIV Craft Action Code)

[![NPM version](https://img.shields.io/npm/v/xiv-cac-utils.svg)](https://www.npmjs.com/package/xiv-cac-utils)

[简体中文](../README.md) | [繁體中文](./README_zh-TW.md) | [English](./README_en.md) | [日本語](./README_ja.md) | [Deutsch](./README_de.md) | **Français** | [한국어](./README_ko.md)

> [!NOTE]
> Ce document a été traduit par une IA et peut contenir des erreurs. En cas de conflit, la version originale en chinois simplifié prévaut. Si vous souhaitez effectuer une révision humaine, vous êtes invité à soumettre une PR et à supprimer cette section.

Une bibliothèque d'outils pour la sérialisation des actions d'artisanat de FFXIV, accompagnée de son site d'outils frontend.

Nous visons à fournir un schéma d'encodage de chaîne standard et léger, permettant aux différents outils, joueurs et communautés de partager plus facilement des flux de travail de production.

## Site des outils

Veuillez visiter l'un des sites suivants :

 - <https://cac.nbb.fan/>
 - <https://infsein.github.io/xiv-cac/>

## Structure du projet

Ce projet utilise une structure Monorepo :

 - `packages/utils` : Paquet de logique de base, responsable de la compression récursive, de la décompression, de la désérialisation et de la définition des données des actions d'artisanat.
 - `packages/website` : Page frontend basée sur React offrant une interface d'opération visuelle.

---

## Paquet : xiv-cac-utils

`xiv-cac-utils` est le paquet npm central de ce projet, fournissant une logique d'encodage et de décodage efficace pour les actions d'artisanat de FFXIV.

> [!CAUTION]\
> Ce projet est uniquement responsable de la compression et de la décompression des actions d'artisanat ; il ne se préoccupe pas de la continuité ou de l'utilisabilité des actions entre elles.\
> Si nécessaire, vous devriez implémenter ces logiques au niveau métier.

### Installation

```bash
npm install xiv-cac-utils
```

### Guide de l'API principale

Les développeurs peuvent intégrer ce paquet pour convertir des macros d'artisanat en codes d'action CAC.

#### 1. Compresser une séquence d'actions (`compress`)

Convertit un ensemble d'ID d'actions, de noms ou de signatures en une chaîne de code d'action CAC compacte.

```typescript
import { compress } from 'xiv-cac-utils';

// Option A : Compression via les ID d'action en jeu
const codeFromId = compress({
  type: 'id',
  actions: [260, 4574, 4631]
});
console.log(codeFromId); // Sortie type : 1v...

// Option B : Compression via les noms d'action
const codeFromName = compress({
  type: 'name',
  actions: ['Grands progrès', 'Parfection de l\'artisan', 'Trained Perfection'] // Supporte plusieurs langues, même mélangées
});

// Option C : Compression via les identifiants internes (signatures) de divers logiciels
const codeFromSign = compress({
  type: 'signature',
  actions: ['trained_perfection', 'basicTouch', 'carefulSynthesis2']
});

// Option D : Saisie directe du tableau, inférence automatique du type
// Pas besoin de spécifier le type, prend en charge les ID, les noms ou les signatures
const codeAuto1 = compress([100001, 100002]);
const codeAuto2 = compress(['Reflect', 'Basic Synthesis']);
const codeAuto3 = compress(['waste_not_ii', 'basic_synthesis']);
const codeAutoMixed = compress(['Grands progrès', 'basic_touch']); // Même l'utilisation mixte est prise en charge
```

#### 2. Décompresser une chaîne encodée (`decompress`)

Restaure un encodage CAC en une séquence détaillée d'informations sur les actions.

```typescript
import { decompress } from 'xiv-cac-utils';

try {
  const actions = decompress('1v...'); // Passer le code CAC
  actions.forEach(action => {
    console.log(action); // { id: 260, name_en: 'Great Strides', name_zh: '阔步', name_jp: '阔步', icon: 1955, wait_time: 2, ... }
  });
} catch (e) {
  console.error('Format d\'encodage invalide');
}
```

### Définitions de types

Le paquet inclut un support TypeScript complet. Les types principaux sont :

 - `DecompressedCraftAction` : L'objet d'action décompressé, contenant les noms multilingues, l'ID de l'icône, le temps d'attente, etc.
 - `CraftActionCacId` : Énumération d'action standardisée en interne.

---

## Développement & Contribution

### Environnement
 - Node.js 20+
 - npm 11+

### Maintenance des données d'action
 - [`packages\utils\src\types\craftactions.ts`](../packages/utils/src/types/craftactions.ts)
 - [`packages\utils\src\data\craftactions.ts`](../packages/utils/src/data/craftactions.ts)

## Licence

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!TIP]\
> Le code de ce projet lui-même est open-source sous la licence susmentionnée. Cependant, tout autre code et ressource cité (le cas échéant) respecte les droits déclarés par leurs détenteurs de droits d'auteur respectifs.\
> De plus, tout litige pouvant survenir avec SQUARE ENIX et/ou d'autres entités commerciales à la suite de l'utilisation commerciale du projet n'est pas lié à ce projet.
