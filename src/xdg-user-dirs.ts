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

import { homedir } from 'os';
import { join, isAbsolute } from 'path';
import { readFileSync, existsSync } from 'fs';

export function getXdgUserDir(key: string, fallback: string): string {
  const configHome = process.env.XDG_CONFIG_HOME || join(homedir(), '.config');
  const file = join(configHome, 'user-dirs.dirs');

  if (!existsSync(file)) return join(homedir(), fallback);

  const content = readFileSync(file, 'utf8');
  const regex = new RegExp(`${key}\\s*=\\s*"(.+?)"`);
  const match = content.match(regex);

  if (!match) return join(homedir(), fallback);

  /* c8 ignore next -- this is tested in xdg-user-dirs.test.ts */
  const resolved = match[1]?.replace(/^\$HOME/, homedir()) ?? '';
  return isAbsolute(resolved) ? resolved : join(homedir(), fallback);
}
