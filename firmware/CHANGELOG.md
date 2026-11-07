# A1 Firmware Change Log

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
