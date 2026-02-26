# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Companion module for controlling **For.A Hanabi video switchers** (HVS 100/110, HVS 390, HVS 2000) via an undocumented WebSocket protocol on port 8621. Built on `@companion-module/base` ~1.0.2 for [Bitfocus Companion](https://bitfocus.io/companion).

## Commands

- **Install**: `yarn install`
- **Lint**: `npx eslint .` (ESLint config in `.eslintrc`, ES2018, eslint:recommended)
- **No build step**: Pure JavaScript (CommonJS), no transpilation
- **No tests**: Test script is a stub; no test framework configured
- **CI**: GitHub Actions workflow runs `bitfocus/actions` module-checks on all pushes

## Architecture

**Entry point**: `index.js` — exports `forAinstance` (extends `InstanceBase`) and calls `runEntrypoint()`.

**Module structure**:
- `index.js` — Main class with WebSocket lifecycle (`initWebSocket`, `messageReceivedFromWebSocket`, `destroy`), config fields (model dropdown + IP address), variable registration, and status management
- `actions.js` — All action definitions and command execution. Methods are mixed into the main class via `Object.assign(this, { ...require('./actions.js') })` in the constructor
- `protocol_hvs100.js`, `protocol_hvs390.js`, `protocol_hvs2000.js` — Per-model protocol definitions: command templates, source lists, layers, keys, AUX mappings
- `upgrades.js` — Array of migration functions for breaking config changes between versions
- `companion/manifest.json` — Module metadata (node22 runtime, nodejs-ipc API)

**Key patterns**:
- **Mixin pattern**: `actions.js` exports plain functions that are Object.assign'd onto the instance, so `this` inside action functions refers to the InstanceBase instance
- **Protocol abstraction**: Each protocol file exports `{ COMMANDS, ME_LAYERS, AUXES, MES, KEYS, SOURCES_ME, SOURCES_AUX, ... }`. Actions use `this.protocol.COMMANDS[cmdName]` with placeholder substitution (e.g., `{me}`, `{layer}`, `{source}`)
- **Command format**: Plain text strings sent over WebSocket, e.g., `SET.ME_XPT_ME1_BKGD_A:1`. Device responds with comma-separated `KEY:value` pairs
- **Variable parsing**: Regex-based extraction in `parseVariable()` updates Companion variables from device responses
- **Upgrade scripts**: Each function in the upgrades array transforms old action configs to new formats (e.g., renaming action IDs, adding new option fields)

**Companion module lifecycle**: `init(config)` → `configUpdated(config)` → `destroy()`. Status reported via `updateStatus()` with `InstanceStatus` enum (Ok, Connecting, Disconnected, BadConfig).

## Code Style

- Tab indentation (size 2), Unix LF line endings (`.editorconfig`)
- CommonJS modules (`require`/`module.exports`)
- camelCase for functions, UPPER_CASE for protocol constants
