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
import { darwin } from './platforms/darwin';
import { linuxPaths } from './platforms/linux';
import type { PlatformPathsMap } from './types';
import { windowsPaths } from './platforms/win32';

/**
 * Platform-specific paths based on the current Node.js platform.
 *
 * This object provides methods to retrieve directories for user data, configuration,
 * cache, logs, and other common directories based on the operating system.
 */
export function platformPaths(osPlatform?: NodeJS.Platform): PlatformPathsMap[NodeJS.Platform] {
  const _platform: NodeJS.Platform = osPlatform ?? platform();
  if (_platform === 'win32') return windowsPaths;
  if (_platform === 'darwin') return darwin;
  return linuxPaths;
}
