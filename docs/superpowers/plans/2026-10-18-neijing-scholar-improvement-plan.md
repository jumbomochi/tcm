# The Neijing Scholar: Comprehensive Improvement Plan

> **For agentic workers:** This is a master roadmap spanning several independent subsystems. Do not execute it directly. Before starting a phase, expand that phase into its own task-level plan (superpowers:writing-plans) at `docs/superpowers/plans/<date>-phase-<n>-<name>.md`, then execute it with superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Neijing Scholar from a well-styled theory reference into a complete, impressive picture of Chinese medicine (theory → diagnosis → treatment in every modality → safe self-care), with signature interactive visuals and a production-grade asset pipeline.

**Architecture:** Keep the existing shape: one Next.js App Router page (`src/app/page.tsx`) switching between module components via `?m=` query params, typed bilingual data in `src/data/*.ts`, types in `src/types/tcm.ts`. Add one new data domain (therapeutics), one new module (06 治法), and extend the existing modules. All heavy visuals (3D, audio) load lazily and degrade to the existing 2D views.

**Tech Stack:** Next 16.4.2, React 19.3 (includes `<ViewTransition>`), Tailwind v4, three 0.186 (raw, no R3F), lucide-react. Proposed dev additions: `vitest` (data and logic tests). Offline asset tools (not shipped): an image generator, Blender, MakeHuman, `@gltf-transform/cli`, `sharp`, SVGO.

**Spec:** No separate spec exists. This plan is the spec. Its findings come from two live-site reviews on 2026-10-18 (screenshots in `.gstack/browse-reports/2026-10-18-0919/` and `.gstack/browse-reports/2026-10-18-1817/`) and the codebase as of commit `2bd1be0` plus uncommitted Qi Clock work.

---

## Decisions needed before Phase 2

| # | Decision | Recommendation |
|---|---|---|
| D1 | Who reviews clinical content (needle depths, contraindications, self-care safety)? | A licensed TCM practitioner signs off on every file in `src/data/therapeuticsData.ts` and the self-care track. **No therapeutics content ships unreviewed.** |
| D2 | Image generator | One tool with clear commercial-use terms and a seed/prompt log (e.g. Midjourney, GPT-image, Imagen or Flux). Pick one so the whole site shares a hand. |
| D3 | 3D body source | MakeHuman base mesh (exports are CC0), sculpted and textured in Blender. Fallback: commission an artist. |
| D4 | Keep raw three.js or adopt `@react-three/fiber` | Keep raw three.js (`Meridian3DCanvas.tsx` already works) and remove the unused `@react-three/fiber` and `@react-three/drei` deps. |
| D5 | Which modalities ship first | Acupuncture and tuina first, then moxibustion and cupping, then gua sha, qigong (Baduanjin) and food therapy. |

---

## Global Constraints

- Next.js 16.4.2 differs from older versions: read the relevant guide in `node_modules/next/dist/docs/` before using any Next API (see `AGENTS.md`).
- Every user-facing string is bilingual: `BilingualText { zh, pinyin, en }`, or paired `...En` / `...Zh` fields, following `src/types/tcm.ts`.
- Every WebGL feature has a working 2D fallback. A failed WebGL context must never take down the page (pattern: `onWebGLUnavailable` in `Meridian3DCanvas.tsx`).
- Honour `prefers-reduced-motion: reduce` for every animation: freeze or crossfade, never move.
- Minimum rendered text size 12px. Minimum tap target 40×40px.
- No Chinese text baked into generated images. All text, seals and labels are live HTML/SVG set in real fonts (image models garble CJK glyphs).
- Every asset has a license and a source recorded in `docs/assets/ASSET_MANIFEST.md`.
- Clinical content: every technique and point carries contraindications, and every self-care screen shows the practitioner disclaimer (exact copy in Phase 6).
- Performance budgets:
  - Hero image ≤ 250 KB (AVIF/WebP).
  - 3D body ≤ 3 MB compressed glTF.
  - Each module's JS loads only when that module opens.
  - LCP < 2.5 s on a mid-range phone over 4G.
- No new runtime dependencies without updating this plan.

## Review Focus

1. **No WebGL, or the context is lost mid-session** (old laptops, managed Chromebooks, GPU reset). Expected: the 2D atlas shows, and the exam game and qi flow fall back to 2D or hide with a note. Test owner: Phase 5a (lost-context handler test plus a manual `$B` check, since the headless browser has no WebGL).
2. **A pregnant user opens self-care.** LI4, SP6, BL60, BL67 and GB21 are traditionally contraindicated in pregnancy. Expected: a pregnancy toggle hides them, and every point card states the caution. Test owner: Phase 6 (`filterSelfCarePoints` test).
3. **Qi Clock at the 子时 boundary (23:00–01:00) and across time zones and DST.** Expected: 23:30 and 00:30 both resolve to GB (子时), and the hour comes from the visitor's local clock. Test owner: Phase 0 (`getCurrentQiClock` tests).
4. **Unknown deep links** (`?m=foo`, `?point=XYZ`, `?case=999`). Expected: fall back to the module default and never crash or show a blank page. Test owner: Phase 0 (`parseDeepLink` test).
5. **Single-language mode with long strings.** `en`-only and `zh`-only modes must not truncate selects or overflow cards (the tongue select currently truncates). Expected: wrapping, no ellipsis on meaningful text. Test owner: Phase 1 (visual check at 375px in all three language modes).

---

## Phase overview

| Phase | Name | Depends on | Size |
|---|---|---|---|
| 0 | Foundations: tests, data integrity, Qi Clock landing, deep links | none | S |
| 1 | UI polish backlog | 0 | M |
| 2 | Therapeutics data layer | 0, D1 | M |
| 3 | Integrated treatment plan in the Diagnostics sandbox | 2 | S |
| 4 | Module 06 治法 Therapeutics | 2, 7 (illustrations) | L |
| 5 | Signature visuals (the wow layer) | 0, 7 (3D model) | L |
| 6 | Self-care track | 2, 4 | M |
| 7 | Asset production pipeline (runs in parallel from Phase 1) | D2, D3 | L |
| 8 | QA, performance and launch | all | S |

Phase 7 starts as soon as D2 and D3 are decided. It is mostly non-code work and is the critical path for Phases 4 and 5.

---

## Phase 0: Foundations

**Why:** The repo has no test runner, the in-progress Qi Clock work fails the type check (`page.tsx` passes `qiClock` to `MeridiansModule`, which doesn't accept it), and the Qi Clock data now exists twice (`src/utils/qiClock.ts` `SHICHEN_ORDER` and `QI_CLOCK_HOURS` in `src/data/foundationsData.ts`).

**Files:**
- Create: `vitest.config.ts` (alias `@` → `./src`, environment `node`)
- Create: `src/data/__tests__/integrity.test.ts`
- Create: `src/utils/__tests__/qiClock.test.ts`
- Create: `src/utils/deepLink.ts`, `src/utils/__tests__/deepLink.test.ts`
- Modify: `package.json` (add `"test": "vitest run"` and the `vitest` dev dep; remove `@react-three/fiber` and `@react-three/drei` per D4)
- Modify: `src/utils/qiClock.ts` (derive from `QI_CLOCK_HOURS` instead of duplicating it)
- Modify: `src/components/MeridiansModule.tsx` (accept `qiClock: ShichenInfo`)
- Modify: `src/components/Meridian3DCanvas.tsx` (fix the 3 existing `react-hooks/set-state-in-effect` lint errors)

**Interfaces produced:**
- `getCurrentQiClock(date?: Date): ShichenInfo`. The existing signature, plus an optional date for testability.
- `parseDeepLink(search: URLSearchParams): DeepLink` where `interface DeepLink { tab: ActiveTab; point?: string; meridian?: string; caseId?: string; formula?: string; modality?: ModalityId; technique?: string; exam?: boolean }`. Params: `m`, `point`, `meridian`, `case`, `formula`, `modality`, `technique`, `exam=1`. Any id not found in the data becomes `undefined`, and an unknown `m` becomes `'foundations'`.
- Move the existing `ActiveTab` union and `VALID_TABS` from `page.tsx:30-43` into `src/utils/deepLink.ts` and export them. Values stay `'foundations' | 'meridians' | 'diagnostics' | 'materia-medica' | 'media-vault'`; Phase 4 adds `'therapeutics'`.

**Tasks:**
- [ ] **0.1 Test harness and data integrity.** Tests in `integrity.test.ts`:
  - every `DiagnosticCase.recommendedAcupoints` code exists in `KEY_ACUPOINTS`;
  - every `recommendedFormulaId` exists in `CLASSIC_FORMULAS`;
  - every `FormulaRoleIngredient.herbId` exists in `ESSENTIAL_HERBS`;
  - every `Acupoint.meridianId` exists in `MERIDIAN_CHANNELS`;
  - no `BilingualText` field in any data export is an empty string.
  Run with `npm test`. Expected: all pass, or each failure names a real data bug to fix in the same task.
- [ ] **0.2 Qi Clock.** Make `qiClock.ts` read from `QI_CLOCK_HOURS`. Tests: `getCurrentQiClock(new Date(2026,0,1,23,30)).meridianId === 'GB'`, the same for `00:30`; `03:00` → `'LU'`; `04:59` → `'LU'` with `progress` close to 1; `05:00` → `'LI'`. Wire `qiClock` into `MeridiansModule` so `npx tsc --noEmit` passes. Commit the in-progress Qi Clock work as its own commit first.
- [ ] **0.3 Deep links.** `parseDeepLink` tests: `?m=foo` → `{ tab: 'foundations' }`; `?m=meridians&point=LI4` → point `'LI4'`; `?m=meridians&point=XYZ` → point `undefined`; `?m=materia-medica&formula=<a CLASSIC_FORMULAS id>` → that formula. `page.tsx` reads `point`, `meridian` and `case` on load, so every acupoint, channel and case is shareable.
- [ ] **0.4 Lint clean.** `npx eslint src` shows 0 errors.

---

## Phase 1: UI polish backlog

**Why:** These are the remaining items from both reviews. Each is small, and together they move the site from good to polished.

**Files:** `src/app/globals.css`, `src/app/page.tsx`, `src/components/BilingualUi.tsx`, each module component as noted.

**Tasks** (each is verified by screenshots at 375, 768 and 1440px in light and dark mode, using gstack `/design-review` or `$B responsive`):
- [ ] **1.1 Dark-mode imagery.** Hero scroll images and the Shanshui background get a `.dark` treatment: `filter: brightness(.82) sepia(.15)` on the image, plus a paper-to-ink vignette. Phase 7 replaces this with true dark variants (`*_dark.avif`).
- [ ] **1.2 Typography system.** Remove `--font-mono-code` from all display labels (`LAB 01 · …`, metadata chips) and use small caps in the sans with `letter-spacing: .08em`. Keep mono for codes only (`LI4`, `ST36`). Raise every sub-12px text to 12px minimum. Acceptance: running the `$B js` probe from the 0919 review on each module returns `smallText: 0`.
- [ ] **1.3 Tap targets.** Every button and link reaches at least 40px height on touch (`@media (pointer: coarse)`). Acceptance: the same probe returns `tapSmall: 0` at 375px.
- [ ] **1.4 Mobile header.** Below `sm`, the language, theme and bookmark controls collapse into one menu button, and the header stays one row.
- [ ] **1.5 Module tabs.** Below 1024px, tabs show `number + Chinese` only with a right-edge fade mask (`mask-image`) when scrollable.
- [ ] **1.6 Module transitions.** Wrap the module switch in React `<ViewTransition>` (read `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` first) with a crossfade. The ink-wipe version comes in Phase 5d.
- [ ] **1.7 Diagnostics layout.** Size the tongue figure to fill its column (the panel currently has empty space above it). Selects wrap instead of truncating (Review Focus 5).
- [ ] **1.8 Curriculum quiz.** Answer options A–D become real buttons with hover, focus, correct and incorrect states, and `aria-pressed`.
- [ ] **1.9 Five Elements diagram.** Move the element labels outside the node circles. Make sure the hero caption clears the seal stamp.
- [ ] **1.10 Background seam.** The Shanshui background fades out with a gradient mask instead of a hard edge (seen in modules 03 and 04).

---

## Phase 2: Therapeutics data layer

**Why:** The app covers theory, channels, diagnosis and herbs, but none of the hands-on practice. This phase adds the typed content that Phases 3, 4 and 6 render.

**Files:**
- Modify: `src/types/tcm.ts` (new types below)
- Create: `src/data/therapeuticsData.ts` (`MODALITIES`, `TREATMENT_METHODS`, `TECHNIQUES`)
- Modify: `src/data/meridiansData.ts` (extend each `KEY_ACUPOINTS` entry)
- Modify: `src/data/diagnosticsData.ts` (each case gets a `treatmentPlan`)
- Modify: `src/data/__tests__/integrity.test.ts`

**Interfaces produced** (exact names; later phases depend on them):

```ts
export type ModalityId =
  | 'acupuncture' | 'moxibustion' | 'tuina' | 'cupping'
  | 'guasha' | 'qigong' | 'diet' | 'herbal';

export type TreatmentMethodId = // 八法 (程钟龄《医学心悟》)
  | 'sweating' | 'vomiting' | 'purging' | 'harmonizing'
  | 'warming' | 'clearing' | 'dispersing' | 'tonifying';

export interface Contraindication {
  condition: BilingualText;            // e.g. pregnancy, bleeding disorder, broken skin
  severity: 'absolute' | 'caution';
  pregnancy?: boolean;                 // drives the Phase 6 pregnancy filter
}

export interface TechniqueStep { textEn: string; textZh: string; illustrationId?: string } // illustrationId → ASSET_MANIFEST id

export interface Technique {
  id: string;                          // e.g. 'tuina-rou'
  modality: ModalityId;
  name: BilingualText;                 // 揉法 Róu Fǎ, Kneading
  steps: TechniqueStep[];
  motion?: { svgPathId: string; durationMs: number; repeat: number }; // Phase 4 animation hook
  contraindications: Contraindication[];
  selfCareSafe: boolean;               // Phase 6 only lists true
}

export interface Modality {
  id: ModalityId;
  name: BilingualText;
  heroImageId: string;                 // ASSET_MANIFEST id
  iconId: string;
  historyEn: string; historyZh: string;
  mechanismEn: string; mechanismZh: string;   // the TCM rationale
  bestForMethods: TreatmentMethodId[];
  techniques: string[];                // Technique ids
  contraindications: Contraindication[];
  classicalQuote: ClassicalQuote;
}

export interface TreatmentMethod {
  id: TreatmentMethodId;
  name: BilingualText;                 // 补法 Bǔ Fǎ, Tonifying
  principleEn: string; principleZh: string;
  modalities: ModalityId[];
}

// Extension of Acupoint (existing fields unchanged)
export interface AcupointTechniques {
  needling: { angle: 'perpendicular' | 'oblique' | 'transverse'; depthCun: [number, number]; sensationEn: string; sensationZh: string };
  moxa: { suitable: boolean; methodEn?: string; methodZh?: string };
  acupressure: { selfCareSafe: boolean; pressSeconds: number; howEn: string; howZh: string };
  contraindications: Contraindication[];
}

export interface TreatmentPlanEntry {
  modality: ModalityId;
  acupoints?: string[];                // Acupoint codes
  techniqueIds?: string[];
  formulaId?: string;
  noteEn: string; noteZh: string;
}

export interface TreatmentPlan {
  method: TreatmentMethodId[];         // e.g. ['harmonizing', 'tonifying']
  entries: TreatmentPlanEntry[];
}
// DiagnosticCase gains: treatmentPlan: TreatmentPlan
```

**Content scope** (all reviewed under D1):

| Modality | Techniques for v1 |
|---|---|
| Acupuncture 针刺 | 直刺 / 斜刺 / 平刺 (90° / 45° / 15°); 补法 / 泻法 basics; 得气 |
| Moxibustion 艾灸 | 温和灸, 雀啄灸 (moxa stick); 隔姜灸 (indirect cone); 温针灸 |
| Tuina 推拿 | 推, 拿, 按, 摩, 揉, 滚, 擦, 捏 (8 basic hand techniques) |
| Cupping 拔罐 | 留罐, 闪罐, 走罐 |
| Gua sha 刮痧 | Stroke direction and pressure; back, neck and limb maps |
| Qigong 八段锦 | The 8 movements, 两手托天理三焦 through 背后七颠百病消 |
| Food therapy 食疗 | Food nature and flavour mapped to patterns (reuses the five-flavour model) |
| Herbal 方药 | Links to the existing module 04 data, nothing new |

**Tasks:**
- [ ] **2.1 Types.** Add the types above, then `npx tsc --noEmit`.
- [ ] **2.2 Integrity tests first.** These fail until 2.3–2.5 land:
  - every `Modality.techniques` id exists in `TECHNIQUES`;
  - every `TreatmentPlanEntry.acupoints` code exists;
  - every `formulaId` exists;
  - every `Technique` and every `Modality` has at least one `contraindications` entry;
  - every acupoint has `techniques`;
  - LI4, SP6, BL60, BL67 and GB21 (where present) carry `pregnancy: true`.
- [ ] **2.3 `therapeuticsData.ts`.** All 8 modalities, all 8 treatment methods, and the techniques in the table.
- [ ] **2.4 Acupoint techniques.** Extend every `KEY_ACUPOINTS` entry. The existing `needlingEn` string stays for display until Phase 4 replaces it.
- [ ] **2.5 Case treatment plans.** One per case. Example for `肝郁脾虚` (existing points LR3, ST36, SP6, PC6; formula 逍遥散):
  - method `['harmonizing','tonifying']`;
  - entries for herbal (逍遥散), acupuncture (LR3 泻, ST36 补, SP6 补, PC6), tuina (揉, 推 along the Liver channel), diet (gently warming, sweet foods for the Spleen; avoid cold and raw foods);
  - self-care: acupressure LR3 and PC6, plus Baduanjin movement 3 (调理脾胃须单举).
- [ ] **2.6 Clinical review sign-off** recorded in `docs/content-review/therapeutics-v1.md` (reviewer, date, files, issues fixed).

---

## Phase 3: Integrated treatment plan in the Diagnostics sandbox

**Why:** This is the moment one diagnosis fans out into the whole practice. It's cheap because the data comes from Phase 2.

**Files:**
- Create: `src/components/TreatmentPlanPanel.tsx`
- Modify: `src/components/DiagnosticsModule.tsx` (render the panel below 辨证断案)

**Interfaces:**
- Consumes: `TreatmentPlan`, `MODALITIES`, `KEY_ACUPOINTS`, `CLASSIC_FORMULAS`, `parseDeepLink` link format.
- Produces: `<TreatmentPlanPanel plan={TreatmentPlan} lang={LanguageMode} />`

**Design:** A horizontal 治法 strip names the 八法 method(s). Below it sits one row per modality: icon, modality name, its points or techniques or formula as chips, and a one-line note. Every chip deep-links: an acupoint to `?m=meridians&point=`, a formula to `?m=materia-medica&formula=`, a technique to `?m=therapeutics&technique=`. The panel animates in row by row (staggered, disabled under reduced motion).

**Tasks:**
- [ ] **3.1** Panel renders all entries for each of the 4 cases. Verify with `$B` screenshots of all 4 cases.
- [ ] **3.2** Chips navigate correctly. Verify by clicking LR3 to land on Meridians with LR3 selected; with `?m=meridians&point=LR3` after a refresh, it still lands there.

---

## Phase 4: Module 06 治法 Therapeutics

**Files:**
- Create: `src/components/TherapeuticsModule.tsx` (module shell, modality index, modality detail)
- Create: `src/components/therapeutics/TechniqueAnimator.tsx` (SVG motion-path player)
- Create: `src/components/therapeutics/NeedleCrossSection.tsx`
- Create: `src/components/therapeutics/TreatmentMethodsMap.tsx`
- Modify: `src/app/page.tsx` (tab 06), `src/utils/deepLink.ts` (add `'therapeutics'` to `ActiveTab`), `src/components/CurriculumAndVaultModule.tsx` (chapter 6 and concept-graph nodes)

**Interfaces:**
- `<TechniqueAnimator technique={Technique} lang={LanguageMode} />` plays the SVG hand along `motion.svgPathId` (an `<animateMotion>` or CSS `offset-path` over a body-region SVG from Phase 7). Under reduced motion it shows numbered static frames.
- `<NeedleCrossSection angle={'perpendicular'|'oblique'|'transverse'} depthCun={[number,number]} />` is a layered skin, fat and muscle SVG; the needle advances on a slider, and the 得气 zone glows when reached.

**Page structure:**
1. **Hero:** the Therapeutics scroll illustration (asset `hero-therapeutics`) and an intro on 内治 vs 外治.
2. **八法 map** (`TreatmentMethodsMap`): eight treatment methods in a ring. Selecting one highlights the modalities that serve it, using the same visual grammar as the Five Elements diagram.
3. **Modality index:** 8 cards (illustration, name, one line, "best for" methods).
4. **Modality detail** (`?m=therapeutics&modality=tuina`):
   - history and mechanism (bilingual side by side);
   - a technique list, where each technique opens `TechniqueAnimator`;
   - for acupuncture, `NeedleCrossSection`;
   - for moxibustion, a heat-glow animation over the point;
   - for cupping, a back map with placements;
   - for gua sha, stroke-direction arrows;
   - for qigong, a carousel of the 8 Baduanjin poses;
   - the contraindications block (always visible, red rule);
   - a classical quote.
5. **Links out** to the 3D statue for every point or channel mentioned.

**Tasks:**
- [ ] **4.1** Module shell, tab 06 and deep link `?m=therapeutics`. Verify `parseDeepLink` accepts it (test added).
- [ ] **4.2** 八法 map.
- [ ] **4.3** Modality index and detail for acupuncture and tuina (D5 order).
- [ ] **4.4** `TechniqueAnimator` and `NeedleCrossSection`, with reduced-motion fallbacks.
- [ ] **4.5** Remaining modalities as their Phase 7 assets land.
- [ ] **4.6** Curriculum: add chapter 6 and connect concept-graph nodes theory → pattern → method → modality.

---

## Phase 5: Signature visuals (the wow layer)

Each sub-phase is independent after 5a. Order by impact: 5a → 5b → 5c → 5d → 5e → 5f → 5g → 5h.

### 5a. Bronze statue 2.0
**Files:** `src/components/Meridian3DCanvas.tsx`, `public/models/tongren.glb`, `public/hdri/studio_1k.hdr`, `scripts/assets/export-acupoints.md` (Blender procedure, docs only)
- [ ] Replace the lofted primitive body with the Phase 7 glTF (`GLTFLoader` + `MeshoptDecoder` from `three/examples/jsm`).
- [ ] Bronze material: physically based (PBR) maps baked in Blender (base colour with patina, roughness, metalness, normal) plus image-based lighting from a CC0 Poly Haven HDRI (`RGBELoader` + `PMREMGenerator`).
- [ ] **Persistent scene:** build the scene once per `finish`. Selection changes update materials and visibility only, and the camera no longer resets on every click (the current effect depends on `selectedAcupointCode` and `cameraPreset` and rebuilds everything).
- [ ] **Camera fly-to:** selecting a point tweens camera position and target over 900 ms (ease-in-out; instant under reduced motion).
- [ ] Remap `coords3D` and `points3D` to the new mesh using Blender empties and curves exported as JSON (Phase 7 §3D).
- [ ] Handle `webglcontextlost` by switching to the 2D atlas (Review Focus 1).

### 5b. Living qi flow and the Qi Clock on the body
- [ ] Upgrade the comet beads (already shipped) to a shader pass: each channel tube gets a scrolling emissive band (UV offset in `onBeforeCompile`), so qi flows as light inside the channel.
- [ ] The Qi Clock's current `meridianId` glows on the statue, with flow handing off to `nextMeridianId` as `progress` → 1. A header badge reads "Now: 巳时 Spleen".
- [ ] The 2D atlas gets the same flow with an animated `stroke-dashoffset` on the channel paths.

### 5c. 铜人考穴: the bronze statue exam
- [ ] Exam mode hides labels and asks "Locate 合谷 LI4", rotating through the 10 key points.
- [ ] A click within tolerance (≤ 0.035 world units of `coords3D`) triggers a water-droplet particle burst from the point, a chime from Web Audio (synthesized, no file), and +1 score. A miss shows the wax shell crack (decal) and gives a hint after 2 misses.
- [ ] Score and best streak are kept in `localStorage` (wrapped in try/catch). There's a share link `?m=meridians&exam=1`.
- [ ] Without WebGL, the same exam runs on the 2D atlas.
- [ ] Pure logic in `src/utils/exam.ts`: `isHit(click: [number,number,number], target: [number,number,number], tol?: number): boolean` and `nextQuestion(history: string[]): string`, unit-tested with boundary distances 0.034 (hit) and 0.036 (miss) and no repeats within 5 questions.

### 5d. Ink-wash motion language
- [ ] Module change: an ink wipe using `<ViewTransition>` with a custom `::view-transition-new` mask (ink-blot SVG mask from Phase 7) that expands from the clicked tab.
- [ ] Five Elements: generating arrows draw as brush strokes (`stroke-dashoffset` over brush-textured paths). Selecting an element spreads ink through an SVG `feTurbulence` + `feDisplacementMap` filter on a radial mask.
- [ ] Reduced motion: plain crossfade.

### 5e. Tactile pulse lab
- [ ] A wrist illustration (Phase 7) with three fingertip targets 寸 关 尺. Press and hold to sink: pressure maps to depth 浮 → 中 → 沉 over 1.5 s, and the waveform morphs by depth using the existing `PulseType` fields (`frequencyHz`, `amplitude`, `sharpness`, `dicroticNotch`, `irregularity`).
- [ ] Sound: Web Audio synthesized thump per beat (gain envelope from `amplitude`, low-pass from `sharpness`). Off by default, with a speaker toggle.
- [ ] Haptics: `navigator.vibrate` pattern per beat on supporting phones, feature-detected.
- [ ] Logic in `src/utils/pulseSynth.ts`: `beatTimes(p: PulseType, seconds: number): number[]` tested so 弦/滑 regularity holds, and the `irregularity` > 0 types (结/代 if added) vary intervals by the stated fraction.

### 5f. Living tongue
- [ ] Replace the static tongue with a layered parametric SVG driven by the existing `TongueState` fields:
  - body colour (`bodyColorHex`);
  - edge (`edgeStyle`: scalloped teeth marks via path variant);
  - coat (`coatColorHex`, `coatOpacity`, `coatTexture` pattern fill from Phase 7);
  - cracks overlay.
- [ ] Switching states tweens colours and opacities over 400 ms. In the case sandbox, the tongue and pulse update live as the patient's tongue and pulse selects change.

### 5g. Decoction pot 砂锅
- [ ] In module 04 Lab 02, drag herbs (Phase 7 herb illustrations) into a clay pot. Each drop animates the five-flavour radar towards the combined profile, and the 君臣佐使 rings fill around the pot.
- [ ] A completed classical formula triggers steam (CSS particles) and reveals the formula card.
- [ ] Keyboard alternative: an "Add to pot" button on each herb (accessibility).
- [ ] Logic in `src/utils/decoction.ts`: `combineFlavors(herbs: HerbItem[]): HerbItem['flavorRadar']` (dose-weighted mean) and `matchFormula(herbIds: string[]): string | null`, both unit-tested against 逍遥散.

### 5h. Living concept graph
- [ ] The module 05 graph gets a small force layout (hand-written spring step, no dependency), draggable nodes and hover-highlighted paths. It now includes method and modality nodes from Phase 4.

---

## Phase 6: Self-care track 养生自疗

**Files:**
- Create: `src/components/SelfCareTrack.tsx`, `src/utils/selfCare.ts`, `src/utils/__tests__/selfCare.test.ts`
- Modify: `TherapeuticsModule.tsx` (entry point), `page.tsx` (header Qi Clock badge links here)

**Interfaces:**
- `filterSelfCarePoints(points: Acupoint[], opts: { pregnant: boolean }): Acupoint[]` keeps only `techniques.acupressure.selfCareSafe` and removes any point with a `pregnancy: true` contraindication when `pregnant` is true.
- `suggestForNow(clock: ShichenInfo, points: Acupoint[]): Acupoint[]` returns points on the current or next Qi Clock channel.

**Experience:**
1. A safety gate on first open: the disclaimer, plus "Are you pregnant or might be?" (stored locally, changeable at any time).
2. **Press now:** 3 suggested points for the current 时辰. Each shows the location on the 3D/2D body, a press-and-hold ring timer (`pressSeconds`), and a breathing cue.
3. **Routines:** short sequences (Sleep, Digestion, Neck & shoulders, Stress) built from point and technique ids.
4. **Baduanjin follow-along:** 8 pose illustrations with a step timer.
5. **Food for this season/constitution:** reuses food-therapy data.

**Disclaimer copy** (shown on every self-care screen):
- EN: "For general wellbeing and learning only. Not a diagnosis or treatment. Stop if anything hurts. See a licensed practitioner for any health concern, and before self-care if pregnant, on blood thinners, or managing a medical condition."
- ZH: "仅供养生与学习参考，不构成诊断或治疗。如有不适请立即停止。有任何健康问题，或孕期、服用抗凝药物、患有慢性病者，请先咨询执业中医师。"

**Tasks:**
- [ ] **6.1** `selfCare.ts` tests:
  - with `pregnant: true`, the result contains none of LI4, SP6, BL60, BL67, GB21;
  - with `pregnant: false`, it contains every `selfCareSafe` point;
  - `suggestForNow` at 09:30 (巳时, SP) returns only SP or HT points.
- [ ] **6.2** Safety gate, Press now, Routines.
- [ ] **6.3** Baduanjin follow-along (needs Phase 7 poses).

---

## Phase 7: Asset production pipeline

### 7.1 Style bible (write first: `docs/assets/STYLE_BIBLE.md`)
- **Palette** (match `globals.css` tokens):
  - paper `#FAF6F0`;
  - ink `#1C1917`;
  - cinnabar `#B91C1C`;
  - jade `#2D6A4F`;
  - amber-gold `#B45309`;
  - indigo `#1E3A8A`;
  - element colours from `WUXING_ELEMENTS.colorHex`.
- **Idiom:** Song/Ming woodblock and 工笔 (gongbi) line art with light 水墨 ink-wash fills on 宣纸 (xuan paper). Warm, low-saturation, generous negative space. Anatomy is stylized but anatomically correct for point location.
- **Never:** baked-in text or seals, photoreal skin, gore, needles in faces, Western medical-illustration style, glossy 3D-render looks in 2D art, heavy gradients, AI artifacts (extra fingers: check every hand).
- **Dark variants:** the same composition as ink on indigo-black silk (`#141311` base), light lines, gold accents.

### 7.2 Tooling
| Need | Tool | Output |
|---|---|---|
| Raster illustration | Image generator per D2 (keep a seed and prompt log) | PNG master ≥ 2752 px wide |
| Upscale and cleanup | Generator's upscaler, then manual retouch (hands, anatomy) | PNG master |
| Vector line art | Hand-trace in Figma or Illustrator over the raster, or vectorize (potrace) then clean | SVG, then SVGO |
| Web delivery | `sharp` script `scripts/assets/build-images.mjs` | AVIF + WebP at 640 / 1280 / 1920 w |
| 3D | MakeHuman → Blender (sculpt, retopo, bake) → `@gltf-transform/cli` (`optimize --compress meshopt --texture-compress webp`) | `tongren.glb` ≤ 3 MB |
| HDRI | Poly Haven (CC0) studio HDRI, 1k | `.hdr` ≤ 1.5 MB |
| Fonts for seals/labels | A licensed seal or Kaiti font (check the web licence) | WOFF2 subset |

Delivery uses `next/image` with `images.formats: ['image/avif','image/webp']` (read `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` first). Static masters live in `assets-src/` (git LFS or outside the repo). Only built outputs go in `public/`.

### 7.3 Prompt template

Style prefix (prepend to every raster prompt):
> Traditional Chinese gongbi illustration with light ink-wash, Song dynasty woodblock linework, on warm cream xuan rice paper texture, muted mineral pigments (cinnabar red, malachite jade green, ochre gold, indigo), generous negative space, museum-scroll composition, soft even lighting, no text, no calligraphy, no seals, no watermark, no signature

Negative (where supported): `text, letters, characters, calligraphy, seal, stamp, watermark, photorealistic, 3d render, glossy, gradient background, extra fingers, distorted hands, blood, modern clinic`

Per-asset prompts follow the prefix; they're in the manifest's `prompt` column.

### 7.4 Asset manifest (create `docs/assets/ASSET_MANIFEST.md`; one row per asset, tracked to `done`)

Columns: `id | path | type | size/format | budget | used by | source/tool | prompt / brief | licence | status`

**A. Heroes and backgrounds** (regenerate existing ones textless and at higher resolution; add new ones)
| id | path | spec | brief |
|---|---|---|---|
| hero-wuxing | `public/images/hero/wuxing.avif` (+`_dark`) | 16:9, 2752×1548 | Five vignettes on a pentagram ring: bamboo (wood), flame-cloud (fire), ochre mountain (earth), bronze ding vessel (metal), wave (water), with arrows as faint brushed lines. Labels added in HTML. |
| hero-meridians | `…/meridians.avif` | 16:9 | Song bronze acupuncture statue 天圣铜人, three-quarter view, faint channel lines, scroll border |
| hero-diagnostics | `…/diagnostics.avif` | 16:9 | Scholar's desk: physician's fingers on a wrist over a pulse pillow, tongue study sketch, tea bowl, brush |
| hero-materia | `…/materia.avif` | 16:9 | Ginseng, astragalus slices, angelica, licorice, goji, chrysanthemum on paper, apothecary composition |
| hero-therapeutics | `…/therapeutics.avif` | 16:9 | Practitioner's hands in tuina on a robed patient's shoulder; moxa smoke curling; cups and gua sha horn on a lacquer tray |
| hero-curriculum | `…/curriculum.avif` | 16:9 | Open thread-bound classic 《黄帝内经》 (pages blank), bamboo slips, ink stone |
| bg-shanshui | `public/images/bg/shanshui-top.avif` + `shanshui-tile.avif` | top 2752×900; seamless tile 1376×1376 | Misty mountains with pines; top band fades to paper. The tile repeats vertically (fixes the seam). |
| bg-shanshui-dark | `…/shanshui-top_dark.avif` | as above | Same as ink on dark silk |
| splash-handscroll | `public/images/splash/layer-{far,mid,near,mist}.webp` | 4 transparent layers, 4000×1200 | Panoramic 手卷 handscroll split into parallax depth layers for the splash unroll |
| texture-paper | `public/images/tex/xuan.webp` | 512² seamless | Xuan paper fibres, very subtle |
| texture-silk-dark | `public/images/tex/silk-dark.webp` | 512² seamless | Dark silk weave |

**B. 2D anatomy (vector, hand-cleaned SVG)**
| id | path | brief |
|---|---|---|
| body-anterior / posterior / lateral | `public/svg/body/{anterior,posterior,lateral}.svg` | Gongbi line-art figure on a 100×100 viewBox frame matching the existing `coords2D` percentages. **Keep the frame, or remap every `coords2D` and `svgPath*` in `meridiansData.ts`.** Replaces the clip-art figure. |
| plate-{hand,forearm,leg,foot,head,back,abdomen} | `public/svg/plates/*.svg` | Regional landmark plates (bones lightly indicated) for acupoint location detail; replaces inline plates |
| wrist-pulse | `public/svg/diagnostics/wrist.svg` | Wrist and forearm, radial artery line, 寸关尺 positions as anchors; 3 fingertip overlays as separate groups |
| tongue-base | `public/svg/diagnostics/tongue.svg` | Layered groups: `#body-{normal,swollen,thin}`, `#edge-scalloped`, `#coat`, `#cracks`, `#red-points`, `#zones` |
| tongue-coat-textures | `public/svg/diagnostics/coat-patterns.svg` | `<pattern>` fills: thin, thick-greasy, peeled (geographic), dry-cracked |
| needle-cross-section | `public/svg/therapeutics/tissue-layers.svg` | Skin, subcutaneous fat, fascia, muscle bands; filiform needle as a separate group |

**C. Therapeutics illustrations**
| id | type | brief |
|---|---|---|
| modality-{acupuncture,moxibustion,tuina,cupping,guasha,qigong,diet,herbal} | raster 16:10, 1600×1000 | One card illustration each: filiform needles in a cloth roll; burning moxa stick over 足三里; tuina hands on a shoulder; glass cups on a back; buffalo-horn gua sha board; Baduanjin figure in 两手托天; seasonal food spread; apothecary drawers |
| tuina-hand-{tui,na,an,mo,rou,gun,ca,nie} | SVG | Hand pose line art per technique, plus a `<path id="motion-…">` for `TechniqueAnimator` |
| baduanjin-pose-1…8 | SVG | Robed figure, consistent proportions, one pose per movement; a start/end frame pair where the movement needs it |
| cupping-back-map / guasha-stroke-map | SVG | Back figure with placements / stroke-direction arrows |
| moxa-glow | SVG + CSS | Ember and heat-shimmer sprite for the moxibustion animation |

**D. Materia medica**
| id | type | brief |
|---|---|---|
| herb-{id} ×10 (one per `ESSENTIAL_HERBS` id) | raster, transparent PNG → WebP, 1024² | Single 饮片 slice or root, top-down, gongbi; no shadow plate. Used in the radar, cards and decoction pot. |
| decoction-pot | SVG layers (`#pot`, `#lid`, `#rim-front` for occlusion) | Unglazed clay 砂锅 on a small charcoal stove |

**E. Identity, UI and social**
| id | type | brief |
|---|---|---|
| seals | SVG | Vector seal stamps (内经, 杏林实训, module seals) hand-set in the licensed seal font. **Never AI-generated.** |
| icons-modality | SVG 24px, 1.5 stroke | 8 icons matching lucide weight |
| ink-wipe-mask | SVG | Ink blot / brush-sweep mask for view transitions |
| og-{module} | 1200×630 | Hero crop and live-set title (generated at build or by OG route) |

**F. 3D**
| id | path | spec |
|---|---|---|
| tongren | `public/models/tongren.glb` | ≤ 40k tris, meshopt; baked 2k WebP maps (base colour with verdigris patina in recesses, roughness, metalness, normal); neutral A-pose matching the Song statue stance; topknot; plinth separate |
| acupoint-anchors | `src/data/generated/anchors3d.json` | Blender empties named by point code, plus channel curves (shrinkwrapped to the surface) sampled to ≤ 24 points each; replaces `coords3D` and `points3D` |
| hdri-studio | `public/hdri/studio_1k.hdr` | Poly Haven CC0 |
| droplet-sprite / wax-crack-decal | `public/images/fx/*.webp` | 256² transparent |

**G. Audio:** none as files. Pulse thumps and exam chimes are synthesized with Web Audio. Optional later: one CC0 guqin ambient loop, off by default.

### 7.5 Asset tasks
- [ ] **7.5.1** Style bible and manifest skeleton; pick tools (D2, D3).
- [ ] **7.5.2** Pilot: hero-therapeutics plus 2 herb slices plus 1 tuina hand SVG. Review against the style bible before mass production.
- [ ] **7.5.3** Batch A, then B (B blocks Phases 1 and 5f), then C (blocks Phase 4), then D, then E.
- [ ] **7.5.4** 3D pipeline:
  1. MakeHuman base and Blender sculpt.
  2. Retopology to ≤ 40k tris.
  3. UV and bake.
  4. Place point empties with a practitioner checking locations against standard references (WHO Standard Acupuncture Point Locations).
  5. Export glTF.
  6. `gltf-transform optimize`.
  7. Export anchors JSON.
- [ ] **7.5.5** `scripts/assets/build-images.mjs` builds every raster in `assets-src/` into AVIF/WebP widths. Verify output sizes against the budgets.
- [ ] **7.5.6** Licence audit: every manifest row has a licence and source before launch.

### 7.6 Asset acceptance checklist (every asset)
- [ ] Matches the style bible palette and idiom; reads at 375px.
- [ ] No baked text or glyph artifacts; hands have 5 fingers.
- [ ] Anatomy-bearing assets are checked by the practitioner for point location.
- [ ] Light and dark variants exist where listed.
- [ ] Within the size budget; licence recorded.

---

## Phase 8: QA, performance and launch

- [ ] **8.1** `npm test`, `npx tsc --noEmit` and `npx eslint src` are all clean.
- [ ] **8.2** gstack `/qa` on the Vercel preview across all 6 modules, and `/design-review` at 375 / 768 / 1440 in light and dark mode and all three language modes.
- [ ] **8.3** Real devices: an iPhone (Safari: view transitions behave differently), a mid-range Android (WebGL performance, `vibrate`), and a desktop with hardware acceleration turned off (2D fallback).
- [ ] **8.4** Performance: `/benchmark` LCP < 2.5 s on mobile; the 3D chunk and model load only on `?m=meridians`; no module JS in the initial bundle except the active one.
- [ ] **8.5** Accessibility: keyboard paths for the exam, decoction pot and pulse lab; `aria-live` announcements for score and diagnosis; contrast ≥ 4.5:1 for all body text in both themes.
- [ ] **8.6** Clinical sign-off file (Phase 2.6) covers every shipped therapeutics and self-care screen.

---

## Suggested sequence

1. **Weeks 1–2:** Phase 0, Phase 1 and Phase 7.5.1–7.5.2 (style bible and pilot assets) in parallel. Decide D1–D5.
2. **Weeks 3–4:** Phase 2 (content writing and review), Phase 3, and Phase 7 batches A and B.
3. **Weeks 5–7:** Phase 4 (acupuncture and tuina first), Phase 5d and 5f, and 7C and 7D.
4. **Weeks 8–10:** the 7F 3D pipeline, then Phase 5a, 5b and 5c (the headline release: "find the point on the bronze statue").
5. **Weeks 11–12:** Phase 6, Phases 5e, 5g and 5h, then Phase 8.
