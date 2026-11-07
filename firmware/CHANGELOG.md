# A1 Firmware Change Log

## 1.0.10 — 2026-11-08

- Expands the Press Button startup screen upward and downward from the center horizontal line.
- Removes the direct screen swap that could appear as a brief white flash below the line.

## 1.0.9 — 2026-11-08

- Removes the transition photo shown before the Press Button startup screen.
- Keeps the center light-dot and horizontal-line animation, then enters Press Button immediately.

## 1.0.8 — 2026-11-08

- Removes the 0.5-second hold after the startup image reveal.
- Enters the Press Button startup screen immediately after the reveal animation completes.

## 1.0.7 — 2026-11-08

- Clears a stale DFU request when the normal application is already running.
- Allows normal startup to recover cleanly after an interrupted DFU or initial Bootloader installation test.
- Retains the existing A1 treatment, IMU, BLE UART, and firmware-version protocol behavior.

## 1.0.6 — 2026-11-07

- Validates source-controlled firmware versioning and the automatic GitHub release workflow.
- Keeps the existing A1 runtime behavior unchanged for release-pipeline testing.

## 1.0.5 — 2026-11-07

- Establishes the automatic GitHub firmware release workflow.
- Publishes a versioned Goodix DFU image with SHA-256 and file-size metadata.
- Retains the DFU handoff changes introduced in 1.0.3.

## 1.0.4 — 2026-11-07

- Adds the first GitHub-hosted A1 firmware release and `latest.json` manifest.

## 1.0.3 — 2026-11-07

- Writes the single-bank DFU request to Flash before waiting for BLE disconnection.
- Adds an APP timeout for the DFU flash-preparation stage.

## 1.0.2 — 2026-11-07

- Adds UART-over-BLE command `0x62` for entering the Goodix Bootloader.

## 1.0.1 — 2026-11-07

- Initializes the Goodix DFU parser and command handlers.

## 1.0.0

- Initial versioned A1 handpiece firmware.
