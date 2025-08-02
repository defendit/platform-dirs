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

// Compatibility: Bun or Vitest
import { userLogDir, runtimeDir, userDataDir, userCacheDir, userConfigDir } from '../../index';
import { join } from 'path';
import { homedir } from 'os';

// Vite is used for coverage reporting via `vitest`
// While the regular tests are run with Bun
const isBun = typeof Bun !== 'undefined';
if (!isBun) {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var { describe, it, expect } = await import('vitest');
} else {
  // If running in Bun, use Bun's global test functions
  // @ts-ignore
  var { describe, it, expect } = await import('bun:test');
}

const HOME = homedir();
const app = 'TestApp';
const author = 'DefendIT';
// Only run tests on macOS (darwin)
if (process.platform === 'darwin') {
  describe('platform-dirs-darwin', () => {
    it('resolves userDataDir correctly', () => {
      const path = userDataDir(app, author);
      expect(path).toBe(join(HOME, 'Library', 'Application Support', app));
    });

    it('resolves userConfigDir correctly', () => {
      const path = userConfigDir(app, author);
      expect(path).toBe(join(HOME, 'Library', 'Preferences', app));
    });

    it('resolves userCacheDir correctly', () => {
      const path = userCacheDir(app, author);
      expect(path).toBe(join(HOME, 'Library', 'Caches', app));
    });

    it('resolves userLogDir correctly', () => {
      const path = userLogDir(app, author);
      expect(path).toBe(join(HOME, 'Library', 'Logs', app));
    });

    it('resolves runtimeDir correctly', () => {
      const path = runtimeDir();
      expect(path).toBe(null);
    });
  });
} else {
  describe('platform-dirs-darwin', () => {
    it('macOS tests should not run on non-macOS platforms', () => {
      expect(true).toBe(true);
    });
  });
}
