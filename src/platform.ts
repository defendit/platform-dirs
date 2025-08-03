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

import { platform } from 'os';

import { linuxDirs } from './platforms/linux';
import { darwinDirs } from './platforms/darwin';
import { windowsDirs } from './platforms/win32';
import type { DarwinDirs, LinuxDirs, PlatformDirsMap, WindowsDirs } from './types';

/**
 * Returns platform-specific paths based on the current Node.js platform.
 *
 * @param osPlatform - Optional platform to override the detected one.
 * @returns Platform-specific paths object.
 *
 * @example
 * platformDirs(); // Returns paths for the current platform
 * platformDirs('linux'); // Returns Linux paths
 * platformDirs('win32'); // Returns Windows paths
 * platformDirs('darwin'); // Returns macOS paths
 */
export function platformDirs(platform: 'linux'): LinuxDirs;
export function platformDirs(platform: 'win32'): WindowsDirs;
export function platformDirs(platform: 'darwin'): DarwinDirs;
export function platformDirs(): PlatformDirsMap[NodeJS.Platform];
export function platformDirs(osPlatform?: NodeJS.Platform): PlatformDirsMap[NodeJS.Platform] {
  const _platform: NodeJS.Platform = osPlatform ?? platform();
  if (_platform === 'win32') return windowsDirs;
  if (_platform === 'darwin') return darwinDirs;
  return linuxDirs;
}
