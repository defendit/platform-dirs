/*
MIT License

Copyright © 2025 Defend I.T. Solutions LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the Software), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { join } from 'path';
import { homedir, platform } from 'os';

const env = process.env;
const HOME = homedir();
const PLATFORM = platform();

const isMac = PLATFORM === 'darwin';
const isWin = PLATFORM === 'win32';

/**
 * Returns the path to the user-specific data directory for the given application.
 *
 * The directory location varies by operating system:
 * - Windows: Uses `%APPDATA%` or falls back to `AppData/Roaming`.
 * - macOS: Uses `~/Library/Application Support`.
 * - Linux/Unix: Uses `$XDG_DATA_HOME` or falls back to `~/.local/share`.
 *
 * @param app - The name of the application.
 * @param author - Optional author or vendor name, used on Windows for namespacing.
 * @returns The absolute path to the user data directory for the application.
 */
export function userDataDir(app: string, author?: string): string {
  /* c8 ignore next 5*/
  if (isWin) {
    const base = env.APPDATA || join(HOME, 'AppData', 'Roaming');
    return join(base, author || '', app);
  }

  if (isMac) {
    return join(HOME, 'Library', 'Application Support', app);
    /* c8 ignore next 5*/
  }

  return env.XDG_DATA_HOME ? join(env.XDG_DATA_HOME, app) : join(HOME, '.local', 'share', app);
}

/**
 * Returns the path to the user-specific configuration directory for the given application.
 *
 * The directory location is determined based on the operating system:
 * - Windows: Uses `%APPDATA%` or falls back to `AppData/Roaming`, optionally namespaced by author.
 * - macOS: Uses `~/Library/Preferences`.
 * - Linux/Other: Uses `$XDG_CONFIG_HOME` or falls back to `~/.config`.
 *
 * @param app - The application name.
 * @param author - Optional author or vendor name for namespacing (used on Windows).
 * @returns The absolute path to the configuration directory for the app.
 */
export function userConfigDir(app: string, author?: string): string {
  /* c8 ignore next 4*/
  if (isWin) {
    const base = env.APPDATA || join(HOME, 'AppData', 'Roaming');
    return join(base, author || '', app);
  }
  if (isMac) {
    return join(HOME, 'Library', 'Preferences', app);
    /* c8 ignore next 5*/
  }

  return env.XDG_CONFIG_HOME ? join(env.XDG_CONFIG_HOME, app) : join(HOME, '.config', app);
}

/**
 * Returns the path to the user-specific cache directory for the given application.
 *
 * The directory location varies by operating system:
 * - Windows: Uses `%LOCALAPPDATA%` or falls back to `AppData/Local`.
 * - macOS: Uses `~/Library/Caches`.
 * - Linux/Unix: Uses `$XDG_CACHE_HOME` or falls back to `~/.cache`.
 *
 * @param app - The name of the application.
 * @param author - Optional author or vendor name, used on Windows for namespacing.
 * @returns The absolute path to the user cache directory for the application.
 */
export function userCacheDir(app: string, author?: string): string {
  /* c8 ignore next 4*/
  if (isWin) {
    const base = env.LOCALAPPDATA || join(HOME, 'AppData', 'Local');
    return join(base, author || '', app, 'Cache');
  }
  if (isMac) {
    return join(HOME, 'Library', 'Caches', app);
    /* c8 ignore next 5*/
  }

  return env.XDG_CACHE_HOME ? join(env.XDG_CACHE_HOME, app) : join(HOME, '.cache', app);
}

/**
 * Returns the path to the user-specific log directory for the given application.
 *
 * The directory location varies by operating system:
 * - Windows: Uses the cache directory and appends "Logs".
 * - macOS: Uses `~/Library/Logs`.
 * - Linux/Unix: Uses the cache directory and appends "logs".
 *
 * @param app - The name of the application.
 * @param author - Optional author or vendor name, used on Windows for namespacing.
 * @returns The absolute path to the user log directory for the application.
 */
export function userLogDir(app: string, author?: string): string {
  /* c8 ignore next 3*/
  if (isWin) {
    return join(userCacheDir(app, author), 'Logs');
  }
  if (isMac) {
    return join(HOME, 'Library', 'Logs', app);
    /* c8 ignore next 4*/
  }

  return join(userCacheDir(app), 'logs');
}

/**
 * Returns the path to the user-specific runtime directory, if applicable.
 *
 * The runtime directory is typically used for temporary files and IPC sockets.
 * - Linux: Uses `$XDG_RUNTIME_DIR` if set, otherwise returns null.
 * - macOS/Windows: Returns null as they do not have a standard runtime directory.
 *
 * @returns The path to the runtime directory or null if not applicable.
 */
export function runtimeDir(): string | null {
  /* c8 ignore next 2 */
  return PLATFORM === 'linux' && env.XDG_RUNTIME_DIR ? env.XDG_RUNTIME_DIR : null;
}
