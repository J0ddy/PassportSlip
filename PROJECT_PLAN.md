# Boarding Pass Printer for Phomemo T02 — Project Plan

A cross-platform mobile app (iOS + Android) that connects directly to a Phomemo T02 thermal printer over Bluetooth and prints styled boarding passes — bypassing the official Phomemo app. Users upload a boarding pass image / scan its barcode, review and edit the parsed details, and print a clean, designed receipt-style boarding pass for safekeeping in a passport cover.

---

## 1. Goals & Non-Goals

### Goals
- Connect to a Phomemo T02 over BLE without any Phomemo SDK or app.
- Accept a boarding pass via (a) live PDF417/QR scan, (b) image upload, or (c) manual entry.
- Parse IATA BCBP Format M to auto-fill flight details.
- Render a beautifully styled boarding pass at the printer's exact pixel width.
- Apply Floyd–Steinberg dithering and send as a 1-bit raster to the printer.
- Work on iOS 13+ and Android 8+.

### Non-Goals (v1)
- Multi-printer support beyond the T02. Other Phomemo models (M02/M02S/M03 etc.) are post-v1.
- Cloud sync, accounts, or multi-device pass library.
- Real-time flight status / API integrations.
- Replacing the actual airport-issued boarding pass at the gate. The printed pass is for safekeeping/backup; users are warned the printed barcode may not always scan reliably at the gate due to thermal dithering.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React Native via Expo (dev client) | Cross-platform, large ecosystem, BCBP parser in npm |
| Language | TypeScript (strict) | Type safety across BLE byte handling |
| Build | EAS Build | Cloud builds, no Mac required for iOS |
| BLE | `react-native-ble-plx` | Most mature RN BLE library |
| Barcode scan | `react-native-vision-camera` + `vision-camera-code-scanner` | PDF417 + QR support on both platforms |
| Image picker | `expo-image-picker` | Pick boarding pass screenshots |
| BCBP parser | `bcbp` (npm) | IATA Format M decoder |
| Rendering | `react-native-skia` | High-quality canvas, easy raster export |
| Persistence | `expo-sqlite` or `mmkv` | Recent passes, paired printer |
| State | Zustand | Lightweight, no boilerplate |
| Testing | Vitest (unit) + Maestro (E2E) | Fast unit tests, declarative flows |

---

## 3. Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  UI Layer (screens, components, Zustand stores)              │
└────────────┬─────────────────────────────────────────────────┘
             │
   ┌─────────┴─────────┐         ┌──────────────────┐
   │  Pass Pipeline    │         │  Printer Service │
   │                   │         │                  │
   │  scan → parse →   │  PNG    │  BLE scan/connect│
   │  edit → render →  ├────────►│  Protocol encode │
   │  dither → bitmap  │         │  Chunked write   │
   └───────────────────┘         └──────────────────┘
```

Three internal modules, each independently testable:
1. **`pass/`** — input handling, BCBP parsing, model, Skia rendering, dithering, 1-bit packing.
2. **`printer/`** — BLE discovery, connection, T02 protocol (ESC/POS variant), chunked transfer.
3. **`ui/`** — screens, navigation, state.

---

## 4. Phased Build Plan

Each phase below is a single, agent-executable unit of work. Complete and verify each before moving to the next. Each phase ends with a concrete acceptance check.

---

### Phase 0 — Project bootstrap

**Goal:** Working Expo app with dev client, TypeScript strict, lint/format, and CI scaffolding.

**Steps:**
1. `npx create-expo-app@latest boarding-pass-printer --template blank-typescript`
2. Install: `expo-dev-client`, `eslint`, `prettier`, `@typescript-eslint/*`, `husky`, `lint-staged`.
3. Set `tsconfig.json` to `"strict": true`, `"noUncheckedIndexedAccess": true`.
4. Add npm scripts: `lint`, `typecheck`, `test`, `format`.
5. Add `app.json` permissions placeholders for Bluetooth and Camera (iOS `NSBluetoothAlwaysUsageDescription`, `NSCameraUsageDescription`; Android `BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`, `ACCESS_FINE_LOCATION`, `CAMERA`).
6. Initialize git, add `.gitignore`, commit.
7. Configure EAS: `eas.json` with `development`, `preview`, `production` profiles. Set `developmentClient: true` for dev profile.

**Acceptance:** `npm run typecheck && npm run lint` passes. `eas build --profile development --platform android` produces an installable dev client APK.

---

### Phase 1 — BLE scan, connect, and disconnect

**Goal:** Reliable BLE lifecycle management for the T02.

**Steps:**
1. Install and configure `react-native-ble-plx` (`expo prebuild` to generate native code).
2. Create `src/printer/ble.ts` exporting:
   - `scanForT02(timeoutMs): Observable<Device>`
   - `connect(deviceId): Promise<Connection>`
   - `disconnect(connection): Promise<void>`
3. Filter scan results by name prefix `T02` (verify exact advertised name during physical testing — adjust filter accordingly).
4. Discover services and characteristics on connect; identify the **write characteristic** (write-without-response). The T02 typically exposes a Nordic-UART-like service. Log all services/characteristics to console during first run for documentation.
5. Persist last-paired device ID in MMKV; auto-reconnect on app launch if available.
6. Handle: Bluetooth off, permission denied, scan timeout, connection drop mid-print.

**Acceptance:** Press a "Scan" button → T02 appears in the list → tap to connect → connection state reflected in UI. App survives toggling printer off/on with clean error messaging.

---

### Phase 2 — T02 print protocol

**Goal:** Send a hardcoded test bitmap (e.g. a small black square or "HELLO") to the printer and have it physically print.

**Reference:** `https://github.com/vivier/phomemo-tools` — protocol details live in `printer/` and `cups/` directories. The T02 uses the same protocol family as the M02.

**Protocol summary (verify against repo before implementing):**
- Init bytes (printer reset / wakeup).
- Set print quality / density (T02 supports density levels).
- Raster bitmap command: `GS v 0 m xL xH yL yH` followed by raw 1-bit pixel data, MSB first, packed left-to-right top-to-bottom. Width = 384 px = **48 bytes per row**.
- Per-chunk row count: send the bitmap in vertical chunks (e.g. 256 rows at a time) — long bitmaps in a single command can fail.
- Footer: line feeds + finalize.

**Steps:**
1. Create `src/printer/protocol.ts` with pure functions: `buildInitFrame()`, `buildRasterFrames(bitmap1bpp, widthPx, heightPx, rowsPerChunk)`, `buildFooterFrame()`.
2. Pack 1-bit pixel data into `Uint8Array`: each byte holds 8 horizontal pixels, MSB = leftmost.
3. Create `src/printer/transport.ts`: takes a connected device + array of frames, writes each in BLE-MTU-sized chunks (typically 180–240 bytes) with `writeWithoutResponse`. Apply a small inter-chunk delay (5–15 ms) — flow control on these printers is fragile.
4. Add a `printTestPattern()` function that prints a 384×100 checkerboard.
5. Unit-test the byte-packing logic with known fixtures (e.g. a 16×1 input → known 2-byte output).

**Acceptance:** Tap "Print test" in the dev UI → printer outputs a clean checkerboard of correct width with no skewed or repeating rows.

---

### Phase 3 — Boarding pass input

**Goal:** Accept a boarding pass barcode by scanning live, picking an image from the camera roll, or manual entry, and produce a normalized `BoardingPass` data model.

**Steps:**
1. Define the data model in `src/pass/types.ts`:
   ```ts
   type BoardingPass = {
     passengerName: string;
     pnr: string;            // booking reference
     from: string;           // IATA code
     to: string;
     flightNumber: string;
     carrierIATA: string;
     departureDate: string;  // ISO
     departureTime?: string; // HH:mm if known
     seat?: string;
     cabin?: string;
     gate?: string;
     boardingTime?: string;
     sequenceNumber?: string;
     rawBarcode: string;     // original BCBP string — must be preserved verbatim for the reprinted barcode
   };
   ```
2. Add `src/pass/bcbp.ts` wrapping the `bcbp` npm package. Map its fields → `BoardingPass`.
3. Live scan: `vision-camera-code-scanner` configured for `pdf-417` + `qr-code`.
4. Image upload: `expo-image-picker` → run `vision-camera-code-scanner` (or fallback library) on the still image to extract the barcode.
5. Manual entry form for fallback (when the barcode is unreadable).
6. Validation: required fields → passengerName, flightNumber, from, to, departureDate. Other fields optional.

**Acceptance:** Scan or upload a real boarding pass image → fields auto-populate correctly. Manual edit and save still works. Tested on at least 3 different airline samples.

---

### Phase 4 — Boarding pass rendering

**Goal:** Render a high-contrast, print-optimized boarding pass as a 384px-wide PNG using `react-native-skia`.

**Design constraints (for layout, not aesthetics — aesthetics handled by the UI/UX prompt at the end):**
- Width = exactly 384 px. Height variable (typically 600–900 px).
- Pure black on white — no greys, no gradients.
- Fonts must be hinted bitmap-friendly at small sizes — Inter or IBM Plex are good defaults; large field labels in caps for legibility on thermal.
- Reprinted barcode: render the `rawBarcode` as a PDF417 at minimum 250 px wide using a JS PDF417 generator (`pdf417-generator` or similar). The barcode must not be dithered later — composite it as already-1bit pixels.
- Cut line / dashed border at the top and bottom for tearing.

**Steps:**
1. Create `src/pass/render.tsx` — a Skia canvas component that takes a `BoardingPass` and renders it offscreen.
2. Use `Skia.Surface.Make(384, height)` to render at exact pixel dimensions, independent of device pixel density. **Do not** rely on the device's screen scale.
3. Lay out: header (carrier + flight), main row (FROM → TO with large IATA codes), passenger / seat / class block, gate / boarding time block, PDF417 barcode, footer with PNR + sequence number.
4. Export to PNG bytes via `surface.makeImageSnapshot().encodeToBytes()`.
5. Add a "Preview" screen that shows the rendered PNG at 1:1 inside a passport-cover-sized frame for visual sanity check.

**Acceptance:** A `BoardingPass` test fixture renders a 384×N PNG. Snapshot test verifies pixel-stable output. The preview matches expectations when exported and opened in an image viewer.

---

### Phase 5 — Dither + 1-bit pack + integrated print

**Goal:** Wire the rendered PNG through dithering into the print pipeline and physically print a real boarding pass.

**Steps:**
1. Create `src/pass/dither.ts`: pure function `floydSteinberg(rgba: Uint8Array, width: number, height: number): Uint8Array` returning grayscale-thresholded 1-bit-per-pixel packed bytes. Threshold at 128.
2. Skip dithering for regions marked as "already 1-bit" (the PDF417 barcode area) — pass through directly. Easiest approach: render the barcode last as pure-black-on-white pixels, and during dither detect any pixel that is already exactly 0 or 255 in the source and preserve it.
3. Connect `pass/render` → `pass/dither` → `printer/protocol` → `printer/transport`.
4. Add a "Print" action in the UI that:
   - Confirms printer is connected (else trigger Phase 1 flow).
   - Renders the pass.
   - Dithers and packs.
   - Sends to printer with a progress indicator (% of frames sent).
   - Shows success / error toast on completion.
5. Add a low-battery warning if BLE reports it (T02 advertises battery in some firmware versions — log and inspect during dev).

**Acceptance:** End-to-end: pick image → parse → preview → print. Physical output is sharp, correctly proportioned, and the embedded PDF417 scans with a phone camera scanner app.

---

### Phase 6 — UI flow polish

**Goal:** Tie the screens together with proper navigation, state, and error handling.

**Screens (final aesthetic to be determined by the UI/UX agent — see Section 7):**
1. **Home** — "Print a new boarding pass" CTA, list of recent passes (last 10), printer connection status pill.
2. **Capture** — choose: scan camera / upload image / enter manually.
3. **Review & edit** — form pre-filled from BCBP; edit any field; live preview pane.
4. **Print** — confirm + connect-if-needed + print progress.
5. **Settings** — paired printer, density, default cabin styling, "forget printer", privacy note.

**Steps:**
1. Add `react-navigation` with native stack.
2. Zustand stores: `printerStore` (device, connectionState), `passStore` (current draft), `historyStore` (past passes via SQLite/MMKV).
3. Permissions UX: a single, friendly prelude screen before any BLE/camera ask.
4. Empty / loading / error states for every async surface.
5. Accessibility pass: VoiceOver / TalkBack labels on all interactive elements; minimum 4.5:1 text contrast.

**Acceptance:** A user can complete the full flow with no console errors, on both platforms, including offline (after first launch). All states tested with Maestro.

---

### Phase 7 — Persistence, hardening, and release prep

**Steps:**
1. Persist boarding passes (without raw PII beyond what's needed) so users can re-print. Add a clear-history option.
2. Crash reporting: Sentry (free tier).
3. Add a hidden "developer drawer" (long-press the version number) exposing: print test pattern, dump last BLE log, raw protocol replay.
4. App icon + splash + store listing copy.
5. EAS Build production profiles for both platforms; submit to TestFlight + Google Play internal testing track.
6. README with setup, architecture, protocol notes, and acknowledgements (`vivier/phomemo-tools`, `bcbp` author).

**Acceptance:** TestFlight build installs on a real iPhone, prints a real boarding pass end-to-end. Same on Android internal track.

---

## 5. Key External References

- **Phomemo protocol:** [`vivier/phomemo-tools`](https://github.com/vivier/phomemo-tools) — reverse-engineered command set for M02/T02 family.
- **BCBP standard:** IATA Resolution 792 (Bar Coded Boarding Pass, Format M). The `bcbp` npm package implements it.
- **react-native-ble-plx docs:** https://github.com/dotintent/react-native-ble-plx
- **react-native-skia docs:** https://shopify.github.io/react-native-skia/
- **Vision Camera Code Scanner:** https://github.com/mrousavy/react-native-vision-camera

When implementing protocol-sensitive code, the agent should pull the latest docs via Context7 (`resolve-library-id` then `query-docs`) for `react-native-ble-plx`, `react-native-skia`, and `react-native-vision-camera`.

---

## 6. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| T02 firmware variants behave differently | Log full service/characteristic dump on first connect; keep protocol pluggable behind a `T02Driver` interface. |
| Reprinted PDF417 unscannable at the gate | Surface a clear in-app warning that printed pass is for backup/safekeeping, not gate use. Test scannability with phone camera before claiming any "primary use" capability. |
| BLE permission UX differs significantly Android 12+ vs iOS | Single permissions prelude screen, platform-specific copy. |
| react-native-vision-camera + new architecture | Pin to versions known to work with current Expo SDK; document in README. |
| Dithering performance on long passes | Run dither in JS off the UI thread via `react-native-worklets-core`; or pre-compute on render. |

---

## 7. UI/UX Designer Agent Prompt

> You are a senior product designer with experience in travel apps and physical-product companion apps (Polaroid, Sonos, etc.). Design the visual language and full UI for a mobile app called **Pass Printer** — a cross-platform iOS + Android app that lets travellers print stylish, monochrome thermal boarding passes from a Phomemo T02 pocket printer, to keep in their passport cover as a backup.
>
> **Aesthetic direction:** quiet, considered, travel-document-coded. Think early-aviation ticket stubs meeting modern Swiss type. Editorial restraint — generous whitespace, one accent colour at most, no skeuomorphism, no AI-generic gradients, no glassmorphism. The printed output is monochrome thermal, so the in-app preview should feel like a continuation of that material: high-contrast, paper-like, deliberate.
>
> **Deliverables:**
> 1. A design system: colour tokens (light + dark), type scale (display, heading, body, mono for codes), spacing scale, elevation rules, border radii. Default to system fonts for performance, with one display weight allowed for IATA codes.
> 2. High-fidelity Figma frames for all five core screens: **Home / recent passes**, **Capture (scan + upload + manual)**, **Review & edit**, **Print (with progress)**, **Settings / printer pairing**. Cover empty, loading, success, error, and permissions-pre-prompt states for each.
> 3. The actual printed boarding pass design itself — black-on-white, exactly 384 px wide, designed at 1:1 thermal scale, optimised for ~203 DPI legibility. Include the rendered PDF417 placement, FROM/TO IATA hierarchy, passenger and seat block, gate/boarding block, footer. Provide it as a vector spec the engineering team can rebuild in `react-native-skia`.
> 4. Microcopy for the entire app — every button, error, empty state, and the privacy / "this is a backup pass, not for gate scanning" disclosure. Tone: calm, factual, slightly bookish. No exclamation marks.
> 5. A short motion spec: connection state pill animation, print progress, scan-confirmed feedback. Keep motion modest — under 250 ms on most transitions.
>
> **Constraints:**
> - Accessible: WCAG AA contrast minimum, dynamic type support, VoiceOver / TalkBack labels noted on every interactive element.
> - The printer is the hero. The connection state should always be discoverable without dominating the screen.
> - Avoid travel-app clichés: no airplane icons flying across loaders, no boarding-pass-shape modals with rounded notches as a cute gimmick.
> - Native platform conventions where they don't fight the brand — iOS sheets, Android Material 3 motion — but visual language should be unified, not dual-branded.
>
> Begin by sharing your design principles in one short paragraph, then your moodboard direction (3–5 references), then the design system, then screens, then the printed pass, then microcopy and motion. Ask clarifying questions before producing the full deliverable if anything is ambiguous.

---

## 8. Definition of Done (v1)

- [ ] App installs from TestFlight and Google Play internal track on a real device.
- [ ] User can pair a Phomemo T02 from a cold start in under 30 seconds.
- [ ] User can scan a real airline boarding pass and print a styled version of it in under 60 seconds end-to-end.
- [ ] Printed PDF417 is scannable from the printed paper using a phone scanner app (≥ 90% scan rate across 10 trials).
- [ ] App handles printer-off, BLE-off, and permission-denied states without crashing.
- [ ] No PII leaves the device; all parsing and rendering is local.
- [ ] README includes setup, architecture, and how to run protocol tests against a real T02.
