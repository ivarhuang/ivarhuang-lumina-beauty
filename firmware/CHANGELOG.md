# A1 Firmware Change Log

## 1.0.17 — 2026-11-20

- Introduces the new LUMINA user interface for the startup and treatment screens.
- Adds the revised startup transition and connection presentation.
- Updates all four treatment-mode layouts while preserving their established
  treatment behavior, countdown display, battery status, and BLE operation.

## 1.0.16 — 2026-11-16

- Latches the handpiece power supply before displaying the first startup light,
  so releasing the power button after the light appears no longer removes power.
- Preserves the existing startup-light timing and all established mode artwork.
- Plays one confirmation beep when switching modes and removes the duplicate
  beep that previously sounded after the new mode screen finished drawing.

## 1.0.15 — 2026-11-16

- Keeps the removed GPIO28 status LED off during startup.
- Displays the LCD startup light immediately after LCD initialization while
  the power-button hold continues to be confirmed.
- Cancels the startup display and powers it down if the button is released
  before the long-press confirmation.

## 1.0.14 — 2026-11-16

- Derives a stable BLE static address from each GR5525 chip's unique eFuse UID.
- Avoids relying on an unprogrammed factory Bluetooth-address field.
- Replaces the legacy shared address stored in NVDS after the first boot.

## 1.0.13 — 2026-11-16

- Uses each GR5525 chip's factory-programmed Bluetooth address.
- Replaces the legacy fixed address previously stored in NVDS on the next boot.
- Keeps the product ID and advertised device name unchanged.

## 1.0.12 — 2026-11-16

- Corrects the built-in main-page artwork mapping for all four modes.
- Swaps the Mode 1 and Mode 3 artwork, and swaps the Mode 2 and Mode 4 artwork.
- Keeps the shared Bluetooth, battery, and countdown graphics unchanged.
- Keeps all treatment timing and hardware-output behavior unchanged.

## 1.0.11 — 2026-11-08

- Restores the stable startup transition image between the horizontal line and Press Button screen.
- Removes the experimental direct Press Button reveal that caused a full-screen or lower-half white flash.
- Keeps the shortened transition timing without the old 0.5-second image hold.

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
