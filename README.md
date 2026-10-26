# 本草与经络 · The Neijing Scholar

**An Interactive Bilingual Atlas & Clinical Sandbox for Traditional Chinese Medicine (中医)**

*The Neijing Scholar* (`本草与经络`) is an interactive web platform built to explore classical Chinese medicine—drawing from foundational texts including the *Huangdi Neijing* (《黄帝内经》), *Zhenjiu Jiayijing* (《针灸甲乙经》), *Shanghan Zabing Lun* (《伤寒杂病论》), and *Shennong Bencao Jing* (《神农本草经》). It bridges traditional scholarly typography and ink-wash aesthetics with modern 2D/3D interactive visualizations.

---

## Key Modules & Features

### 01 · 阴阳五行与藏象流注 — Foundations, Zang-Fu & 24h Qi Clock
- **Wu Xing (Five-Phase) Cycles (`五行生克乘侮`)**: Interactive diagram visualizing Generating (*Sheng* 生), Controlling (*Ke* 克), Overacting (*Cheng* 乘), and Insulting (*Wu* 侮) relationships across Wood, Fire, Earth, Metal, and Water.
- **Zang-Fu Organ Systems (`脏腑藏象`)**: Side-by-side comparison of classical TCM physiology, syndrome patterns, and modern anatomical/physiological perspectives, complete with annotated classical citations.
- **Live Circadian Qi Clock (`十二时辰子午流注`)**: Real-time local *Shichen* (two-hour Chinese double-hour) tracker indicating the currently active meridian, physiological focus, and seasonal/daily *Yangsheng* (养生) regimen tips.

### 02 · 经络铜人与骨度取穴 — 14 Meridians & 3D Bronze Statue Lab
- **3D Tiansheng Bronze Statue (`三维天圣针灸铜人`)**: Powered by Three.js and React Three Fiber, featuring interactive 3D meridian pathways, glowing Qi comet-trail animations, and clickable acupoint nodes.
- **2D Anatomical & Internal Pathways**: Anterior and posterior SVG body maps illustrating superficial meridian routes, internal organ linkages, and proportional *Cun* (`骨度分寸`) measurement guides.
- **Clinical Acupoint Encyclopedia**: Detailed point profiles with Chinese characters, Pinyin, English etymology, category badges (e.g., *Yuan*-Source, *He*-Sea), localization, clinical actions, and needling guidelines.

### 03 · 四诊八纲辨证沙盒 — Tongue, Pulse & Clinical Case Sandbox
- **Tongue Inspection (`望舌辨证`)**: Visual simulator covering tongue body colors, edge morphology, and coating textures mapped to Zang-Fu reflection zones.
- **Radial Pulse Oscilloscope (`寸关尺脉象示波`)**: Real-time canvas waveform synthesizer modeling classical pulse qualities (frequency, amplitude, depth across *Cun*, *Guan*, and *Chi* positions, dicrotic notch, and tactile metaphors).
- **Clinical Case Sandbox (`八纲辨证医案`)**: Interactive patient cases guiding learners through Four Examinations synthesis, Eight Principle differentiation (*Ba Gang* 八纲), pathomechanism analysis, and treatment formulation.

### 04 · 道地本草与君臣佐使 — Materia Medica & Formula Architecture
- **Materia Medica (`道地本草`)**: Essential medicinal herbs profiled with thermal nature spectra (*Si Qi* 四气: Cold, Cool, Neutral, Warm, Hot), Five-Flavor radar charts (*Wu Wei* 五味), meridian tropism, dosage, and cautions.
- **Jun-Chen-Zuo-Shi Formula Deconstructor (`方剂配伍拆解`)**: Structural breakdown of classical prescriptions into Chief (*Jun* 君), Deputy (*Chen* 臣), Assistant (*Zuo* 佐), and Envoy (*Shi* 使) roles with synergy analyses.

### 05 · 五章导学与名师讲堂 — Guided Curriculum & University Lectures
- **5-Chapter Mastery Curriculum**: Structured learning path with key takeaways, interactive self-assessment quizzes, and local mastery tracking.
- **Concept Graph & Media Vault**: Curated lectures from leading TCM universities (YouTube & Bilibili integration), plus persistent local bookmarks and clinical study notes (`医案札记`).

### Platform-Wide Experience
- **Trilingual Reading Modes**: Seamlessly switch between **Dual (`双语`)**, **English (`EN`)**, and **Chinese (`中文`)** views with Pinyin annotations.
- **Scholarly Ink-Wash Aesthetic**: Custom Shanshui ink-wash backgrounds, seal stamps (`篆刻`), and full support for **Light (`宣纸`)** and **Dark (`玄墨`)** modes.
- **Global Omnisearch & Deep Linking**: Instant search across organs, acupoints, herbs, formulas, and clinical cases, plus shareable URL query parameters (`?m=foundations`, `?m=meridians`, etc.).

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/) & TypeScript 5
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://drei.docs.pmnd.rs/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Project Structure

```text
src/
├── app/
│   ├── globals.css                    # Editorial typography, seal stamps & ink-wash theme tokens
│   ├── layout.tsx                     # Root layout & metadata
│   └── page.tsx                       # Main application shell, navigation, search & live Qi clock
├── components/
│   ├── BilingualUi.tsx                # Reusable bilingual typography & classical quote components
│   ├── WelcomeSplash.tsx              # Frontispiece splash screen (卷首扉页)
│   ├── FoundationsModule.tsx          # Module 01: Wu Xing, Zang-Fu & 24h Qi Clock
│   ├── MeridiansModule.tsx            # Module 02: 14 Meridians, Acupoints & Cun guide
│   ├── Meridian3DCanvas.tsx           # Interactive Three.js 3D Bronze Statue & Qi flow renderer
│   ├── DiagnosticsModule.tsx          # Module 03: Tongue visualizer, Pulse oscilloscope & Case sandbox
│   ├── MateriaMedicaModule.tsx        # Module 04: Herb radar profiles & Formula deconstructor
│   └── CurriculumAndVaultModule.tsx   # Module 05: 5-Chapter curriculum, lectures, bookmarks & notes
├── data/
│   ├── foundationsData.ts             # Wu Xing elements, Zang-Fu organs & 12 Shichen data
│   ├── meridiansData.ts               # 14 Meridian channels (2D/3D paths) & key acupoints
│   ├── diagnosticsData.ts             # Tongue states, pulse waveforms & clinical cases
│   ├── materiaMedicaData.ts           # Herbs & classical formulas
│   └── curriculumAndMediaData.ts      # Curriculum chapters, quizzes & university video lectures
├── types/
│   └── tcm.ts                         # Core TypeScript interfaces for TCM entities
└── utils/
    └── qiClock.ts                     # Local-time Shichen (子午流注) calculation utilities
```

---

## Getting Started

### Prerequisites
- **Node.js** 20+ and **npm**

### Installation & Local Development

1. Clone the repository:
   ```bash
   git clone git@github.com:jumbomochi/tcm.git
   cd tcm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Disclaimer

This project is designed for **educational, cultural, and scholarly reference only**. Nothing contained in this application constitutes medical advice, clinical diagnosis, or treatment prescription. Always consult a licensed healthcare practitioner or qualified Traditional Chinese Medicine physician for medical conditions.
