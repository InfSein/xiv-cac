# XIV-CAC (FFXIV Craft Action Code)

[![NPM version](https://img.shields.io/npm/v/xiv-cac-utils.svg)](https://www.npmjs.com/package/xiv-cac-utils)

[简体中文](../README.md) | [繁體中文](./README_zh-TW.md) | [English](./README_en.md) | [日本語](./README_ja.md) | [Deutsch](./README_de.md) | [Français](./README_fr.md) | **한국어**

> [!NOTE]
> 이 문서는 AI에 의해 번역되었으며 오류가 포함될 수 있습니다. 내용이 충돌할 경우 중국어 간체 원본이 우선합니다. 직접 검토하고 수정하고 싶으시다면 PR을 제출하고 이 단락을 삭제해 주세요.

FFXIV(파이널 판타지 XIV) 제작 기술 직렬화를 위한 도구 라이브러리 및 관련 프런트엔드 도구 사이트입니다.

우리는 서로 다른 도구, 플레이어, 커뮤니티 간에 제작 공정을 더 쉽게 공유할 수 있도록 표준적이고 가벼운 문자열 인코딩 체계를 제공하는 것을 목표로 합니다.

## 도구 사이트

다음 사이트 중 하나를 방문해 주세요:

 - <https://cac.nbb.fan/>
 - <https://infsein.github.io/xiv-cac/>

## 프로젝트 구조

이 프로젝트는 Monorepo 구조를 채택하고 있습니다:

 - `packages/utils`: 핵심 로직 패키지로, 제작 기술의 압축 재귀, 해제 역직렬화 및 데이터 정의를 담당합니다.
 - `packages/website`: React 기반의 프런트엔드 페이지로, 시각적인 조작 인터페이스를 제공합니다.

---

## 패키지: xiv-cac-utils

`xiv-cac-utils`는 이 프로젝트의 핵심 npm 패키지이며, FFXIV 제작 기술을 위한 효율적인 인코딩 및 디코딩 로직을 제공합니다.

> [!CAUTION]\
> 이 프로젝트는 제작 기술의 압축과 해제만 담당하며, 기술 간의 연속성이나 가용성에는 관여하지 않습니다.\
> 필요한 경우 비즈니스 로직 계층에서 이를 구현해야 합니다.

### 설치

```bash
npm install xiv-cac-utils
```

### 핵심 API 가이드

개발자는 이 패키지를 도입하여 제작 매크로와 CAC 공정 코드 간의 변환을 구현할 수 있습니다.

#### 1. 기술 시퀀스 압축 (`compress`)

기술 ID, 이름 또는 시그니처 세트를 콤팩트한 한 줄의 CAC 공정 코드 문자열로 변환합니다.

```typescript
import { compress } from 'xiv-cac-utils';

// 옵션 A: 게임 내 Action ID를 통한 압축
const codeFromId = compress({
  type: 'id',
  actions: [260, 4574, 4631]
});
console.log(codeFromId); // 출력 예시: 1v...

// 옵션 B: 기술 이름을 통한 압축
const codeFromName = compress({
  type: 'name',
  actions: ['큰 걸음', '장인의 절기', 'Trained Perfection'] // 여러 언어 지원, 혼합 사용 가능
});

// 옵션 C: 각 소프트웨어 내부의 기술 식별자(시그니처)를 통한 압축
const codeFromSign = compress({
  type: 'signature',
  actions: ['trained_perfection', 'basicTouch', 'carefulSynthesis2']
});

// 옵션 D: 배열 직접 입력, 자동 유형 추론
// 유형을 지정할 필요가 없으며 ID, 이름 또는 서명을 지원합니다
const codeAuto1 = compress([100001, 100002]);
const codeAuto2 = compress(['Reflect', 'Basic Synthesis']);
const codeAuto3 = compress(['waste_not_ii', 'basic_synthesis']);
const codeAutoMixed = compress(['큰 걸음', 'basic_touch']); // 혼합 사용도 지원됩니다
```

#### 2. 인코딩된 문자열 해제 (`decompress`)

CAC 인코딩을 상세한 기술 정보 시퀀스로 복원합니다.

```typescript
import { decompress } from 'xiv-cac-utils';

try {
  const actions = decompress('1v...'); // CAC 코드를 전달
  actions.forEach(action => {
    console.log(action); // { id: 260, name_en: 'Great Strides', name_zh: '阔步', name_jp: '阔步', icon: 1955, wait_time: 2, ... }
  });
} catch (e) {
  console.error('유효하지 않은 인코딩 형식');
}
```

### 타입 정의

패키지에는 완벽한 TypeScript 지원이 포함되어 있습니다. 주요 타입은 다음과 같습니다:

 - `DecompressedCraftAction`: 해제된 기술 객체로, 다국어 이름, 아이콘 ID, 대기 시간 등을 포함합니다.
 - `CraftActionCacId`: 내부적으로 표준화된 기술 열거형.

---

## 개발 및 기여

### 실행 환경
 - Node.js 20+
 - npm 11+

### 기술 데이터 유지보수
 - [`packages\utils\src\types\craftactions.ts`](../packages/utils/src/types/craftactions.ts)
 - [`packages\utils\src\data\craftactions.ts`](../packages/utils/src/data/craftactions.ts)

## 오픈 소스 라이선스

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!TIP]\
> 이 프로젝트 자체의 코드는 위 라이선스에 따라 오픈 소스로 공개됩니다. 단, 인용된 다른 코드 및 리소스(있는 경우)는 해당 저작권자가 선언한 권리를 존중합니다.\
> 또한, 프로젝트를 상업적으로 이용하여 발생하는 SQUARE ENIX 및/또는 기타 상업 단체와의 모든 분쟁은 이 프로젝트와 관련이 없습니다.
