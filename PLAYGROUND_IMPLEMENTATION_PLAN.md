# Playground Component Implementation Plan

## Overview

This plan outlines the implementation of the **Playground Arena** section. We will build the circular sports ring **from scratch** using individual assets (NOT using Frame 22.svg). Each sports image will rotate at its fixed position.

---

## Confirmed Requirements ✅

| Requirement     | Implementation                                                           |
| --------------- | ------------------------------------------------------------------------ |
| Frame 22.svg    | ❌ NOT USED - Building from scratch                                      |
| Sports Photos   | Individual SVGs from `/assest/pics/` with **rotating animation**         |
| Circle Outline  | Using `/assest/circle/Ellipse 1.svg` (outer) and `Ellipse 2.svg` (inner) |
| Title           | Frame 20.svg positioned above the circular ring                          |
| Quote           | HTML text with Rajdhani font                                             |
| Section Height  | Exactly **100vh**                                                        |
| Hero Transition | Seamless overlap with Hero section                                       |

---

## Assets Used

### Title

| Asset     | Path                        |
| --------- | --------------------------- |
| Title SVG | `/assest/font/Frame 20.svg` |

### Circle Outlines

| Asset        | Path                           | Purpose          |
| ------------ | ------------------------------ | ---------------- |
| Outer Circle | `/assest/circle/Ellipse 1.svg` | White outer ring |
| Inner Circle | `/assest/circle/Ellipse 2.svg` | White inner ring |

### Sports Images (Clockwise from Top)

| Position     | Clock Position | File             | Angle       |
| ------------ | -------------- | ---------------- | ----------- |
| Top          | 12 o'clock     | `Ellipse 7.svg`  | -90° (270°) |
| Top-right    | 1-2 o'clock    | `Ellipse 8.svg`  | -54° (306°) |
| Right        | 3 o'clock      | `Ellipse 3.svg`  | -18° (342°) |
| Bottom-right | 4-5 o'clock    | `Ellipse 4.svg`  | 18°         |
| Bottom       | 6 o'clock      | `Ellipse 9.svg`  | 54°         |
| Bottom-left  | 7-8 o'clock    | `Ellipse 10.svg` | 90°         |
| Left-bottom  | 8-9 o'clock    | `Ellipse 11.svg` | 126°        |
| Left         | 9 o'clock      | `Ellipse 12.svg` | 162°        |
| Left-top     | 10-11 o'clock  | `Ellipse 5.svg`  | 198°        |
| Top-left     | 11 o'clock     | `Ellipse 6.svg`  | 234°        |

### Background

| Asset      | Path                                  |
| ---------- | ------------------------------------- |
| Background | `/assest/background/Rectangle 23.png` |

---

## Background & Positioning Details

The background image (`Rectangle 23.png`) has a **reddish-brown glowing circular area** in the center (like a sun/eclipse effect with dark tree branches around it).

### Critical Positioning:

The circular sports ring MUST be positioned **exactly at the bright glowing area** of the background:

```
┌──────────────────────────────────────────────────────────────┐
│                    Rectangle 23.png                          │
│                                                              │
│     Dark tree branches       Dark tree branches              │
│            ╲                    ╱                            │
│             ╲                  ╱                             │
│              ╲  ┌──────────┐  ╱                              │
│               ╲ │  BRIGHT  │ ╱                               │
│                ╲│ GLOWING  │╱                                │
│                 │  CIRCLE  │  ← Sports ring positioned HERE  │
│                ╱│  AREA    │╲                                │
│               ╱ │          │ ╲                               │
│              ╱  └──────────┘  ╲                              │
│             ╱                  ╲                             │
│            ╱                    ╲                            │
│     Dark tree branches       Dark tree branches              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### CSS Positioning Strategy:

- Background: `object-cover object-center` - ensures the bright area is centered
- Content: `flex items-center justify-center` - centers the ring at the bright area
- The circle container should be vertically centered to align with the glowing area

---

## Quote Typography

```css
/* Muhammad Ali Quote Styling */
.quote-text {
  color: #f2efe9;
  text-align: center;
  font-family: 'Rajdhani', sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.4px;
  text-transform: uppercase;
}
```

**Note:** Need to import Rajdhani font from Google Fonts.

---

## Component Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                  PLAYGROUND SECTION (100vh)                          │
│         ↑↑↑ Seamless overlap with Hero ↑↑↑                          │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                 Background: Rectangle 23.png                    ││
│  │        (Dark branches + BRIGHT GLOWING CIRCLE in center)        ││
│  │                                                                 ││
│  │                 ┌─────────────────────────┐                     ││
│  │                 │   Frame 20.svg (Title)  │                     ││
│  │                 │  "THE PLAYGROUND ARENA" │                     ││
│  │                 │ "CHOOSE YOUR BATTLEGROUND"│                   ││
│  │                 └─────────────────────────┘                     ││
│  │                           ↓                                     ││
│  │    ╔═══════════════════════════════════════════════════════╗    ││
│  │    ║          BRIGHT GLOWING AREA OF BACKGROUND            ║    ││
│  │    ║                                                       ║    ││
│  │    ║                   [Ellipse 7] 🔄                      ║    ││
│  │    ║          [Ellipse 6] 🔄      [Ellipse 8] 🔄           ║    ││
│  │    ║                                                       ║    ││
│  │    ║      [Ellipse 5]   ╭─────────────╮   [Ellipse 3]      ║    ││
│  │    ║         🔄        │  Ellipse 1   │        🔄          ║    ││
│  │    ║                   │  (outer)     │                    ║    ││
│  │    ║      [Ellipse 12] │ ╭─────────╮  │  [Ellipse 4]       ║    ││
│  │    ║         🔄       │ │Ellipse 2│  │       🔄           ║    ││
│  │    ║                   │ │(inner)  │  │                    ║    ││
│  │    ║                   │ │         │  │                    ║    ││
│  │    ║      [Ellipse 11] │ │  QUOTE  │  │  [Ellipse 9]       ║    ││
│  │    ║         🔄       │ │  TEXT   │  │       🔄           ║    ││
│  │    ║                   │ ╰─────────╯  │                    ║    ││
│  │    ║                   ╰─────────────╯                     ║    ││
│  │    ║          [Ellipse 10] 🔄                              ║    ││
│  │    ║                                                       ║    ││
│  │    ║         🔄 = Rotating at fixed position               ║    ││
│  │    ╚═══════════════════════════════════════════════════════╝    ││
│  │                                                                 ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Steps

### Step 1: Add Rajdhani Font

In `globals.css` or `layout.tsx`, import Rajdhani from Google Fonts:

```tsx
// In layout.tsx
import { Rajdhani } from 'next/font/google';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-rajdhani',
});
```

---

### Step 2: Create `playground-animations.css`

```css
/* Rotating animation for sports images */
@keyframes rotate-in-place {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Base rotating class */
.rotate-image {
  animation: rotate-in-place 15s linear infinite;
}

/* Variation speeds */
.rotate-slow {
  animation-duration: 20s;
}
.rotate-medium {
  animation-duration: 15s;
}
.rotate-fast {
  animation-duration: 12s;
}

/* Reverse direction */
.rotate-reverse {
  animation-direction: reverse;
}
```

---

### Step 3: Update `page.tsx`

```tsx
import Hero from '@/components/Hero';
import Navbar from '@/components/navbar';
import Playground from '@/components/Playground';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Playground />
    </div>
  );
};

export default page;
```

---

### Step 4: Implement `Playground.tsx`

```tsx
'use client';
import Image from 'next/image';
import './playground-animations.css';

// Sports images with positions (10 images, 36° apart)
const sportsImages = [
  { id: 1, src: '/assest/pics/Ellipse 7.svg', alt: 'Sport 1', angle: -90 }, // Top (12 o'clock)
  { id: 2, src: '/assest/pics/Ellipse 8.svg', alt: 'Sport 2', angle: -54 }, // Top-right
  { id: 3, src: '/assest/pics/Ellipse 3.svg', alt: 'Sport 3', angle: -18 }, // Right
  { id: 4, src: '/assest/pics/Ellipse 4.svg', alt: 'Sport 4', angle: 18 }, // Bottom-right
  { id: 5, src: '/assest/pics/Ellipse 9.svg', alt: 'Sport 5', angle: 54 }, // Bottom
  { id: 6, src: '/assest/pics/Ellipse 10.svg', alt: 'Sport 6', angle: 90 }, // Bottom-left
  { id: 7, src: '/assest/pics/Ellipse 11.svg', alt: 'Sport 7', angle: 126 }, // Left-bottom
  { id: 8, src: '/assest/pics/Ellipse 12.svg', alt: 'Sport 8', angle: 162 }, // Left
  { id: 9, src: '/assest/pics/Ellipse 5.svg', alt: 'Sport 9', angle: 198 }, // Left-top
  { id: 10, src: '/assest/pics/Ellipse 6.svg', alt: 'Sport 10', angle: 234 }, // Top-left
];

const Playground = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden -mt-20 md:-mt-32">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assest/background/Rectangle 23.png"
          alt="Playground Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
        {/* Title - Frame 20.svg */}
        <div className="w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] mb-4 md:mb-8">
          <Image
            src="/assest/font/Frame 20.svg"
            alt="The Playground Arena"
            width={550}
            height={100}
            className="w-full h-auto"
          />
        </div>

        {/* Circle Container */}
        <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
          {/* Outer Circle - Ellipse 1 */}
          <div className="absolute inset-0">
            <Image
              src="/assest/circle/Ellipse 1.svg"
              alt="Outer Circle"
              fill
              className="object-contain"
            />
          </div>

          {/* Inner Circle - Ellipse 2 */}
          <div className="absolute inset-[15%]">
            <Image
              src="/assest/circle/Ellipse 2.svg"
              alt="Inner Circle"
              fill
              className="object-contain"
            />
          </div>

          {/* Rotating Sports Images */}
          {sportsImages.map((sport, index) => {
            const radius = 50; // % from center to edge
            const angleRad = (sport.angle * Math.PI) / 180;
            const x = 50 + radius * Math.cos(angleRad);
            const y = 50 + radius * Math.sin(angleRad);

            return (
              <div
                key={sport.id}
                className={`absolute w-[18%] h-[18%] sm:w-[16%] sm:h-[16%] rotate-image ${
                  index % 2 === 0 ? 'rotate-slow' : 'rotate-medium'
                } ${index % 3 === 0 ? 'rotate-reverse' : ''}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <Image
                  src={sport.src}
                  alt={sport.alt}
                  fill
                  className="object-contain"
                />
              </div>
            );
          })}

          {/* Center Quote Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 sm:px-8 md:px-12">
              <p className="text-[#F2EFE9] font-rajdhani text-[10px] sm:text-[14px] md:text-[18px] lg:text-[25px] font-bold uppercase tracking-[1.4px]">
                "DON'T COUNT THE DAYS, MAKE THE DAYS COUNT."
              </p>
              <p className="text-[#F2EFE9] font-rajdhani text-[8px] sm:text-[12px] md:text-[16px] lg:text-[20px] font-bold uppercase tracking-[1.4px] mt-1">
                — MUHAMMAD ALI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;
```

---

## Responsive Breakpoints

| Breakpoint  | Circle Size   | Sports Image Size | Quote Font Size |
| ----------- | ------------- | ----------------- | --------------- |
| Mobile (xs) | 280px × 280px | 18%               | 10px            |
| Small (sm)  | 380px × 380px | 16%               | 14px            |
| Medium (md) | 500px × 500px | 16%               | 18px            |
| Large (lg)  | 600px × 600px | 16%               | 25px            |

---

## Sports Images Rotation Behavior

```
     🔄 Ellipse 7 (slow)
         ↑
🔄 Ellipse 6    🔄 Ellipse 8
(slow, rev)         (medium)
    ↖               ↗

🔄 E5    ╭──────╮    🔄 E3
        │ QUOTE │    (slow, rev)
        │  TEXT │
🔄 E12  ╰──────╯    🔄 E4
(slow)               (medium)
    ↙               ↘
🔄 Ellipse 11    🔄 Ellipse 9
(medium, rev)       (slow, rev)
         ↓
     🔄 Ellipse 10
        (medium)
```

Each image rotates **around its own center** at its fixed position.

---

## File Changes Summary

| File                                       | Action                         |
| ------------------------------------------ | ------------------------------ |
| `src/components/Playground.tsx`            | Create - Main component        |
| `src/components/playground-animations.css` | Create - Rotation animations   |
| `src/app/page.tsx`                         | Update - Add Playground import |
| `src/app/layout.tsx`                       | Update - Add Rajdhani font     |

---

## Notes

- ❌ Frame 22.svg is **NOT used** - building from scratch
- ✅ 10 sports images positioned in a circle
- ✅ Each image rotates at its fixed position
- ✅ Circle outlines from Ellipse 1.svg and Ellipse 2.svg
- ✅ Quote uses Rajdhani font (#F2EFE9)
- ✅ Frame 20.svg used for title
- ✅ Section height exactly 100vh
- ✅ Seamless overlap with Hero section

---

## Ready for Implementation! 🚀

All requirements confirmed. Say **"proceed"** or **"implement"** to start coding!
