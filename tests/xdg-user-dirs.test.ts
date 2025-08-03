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
import { platformDirs } from '../src/platform';
import { getXdgUserDir } from '../src/xdg-user-dirs';
import { mkdirSync, writeFileSync, rmSync } from 'fs';
import { describe, it, beforeEach, afterEach, expect, vi, afterAll, beforeAll } from 'vitest';
const testHome = join(__dirname, 'mock_home');
const testTmp = join(__dirname, 'mock_tmp');

describe('getXdgUserDir', () => {
  const mockHome = testHome;
  const mockConfigHome = join(mockHome, '.config');
  const mockUserDirsFile = join(mockConfigHome, 'user-dirs.dirs');
  const ORIGINAL_ENV = { ...process.env };

  beforeAll(() => {
    // Ensure the test directories exist before running tests
    mkdirSync(testHome, { recursive: true });
    mkdirSync(testTmp, { recursive: true });
  });

  beforeEach(() => {
    // Reset and recreate mock config dir
    rmSync(mockHome, { recursive: true, force: true });
    mkdirSync(mockConfigHome, { recursive: true });

    // Set env
    process.env.XDG_CONFIG_HOME = mockConfigHome;
    vi.resetModules();

    // Full os mock: homedir + tmpdir

    vi.mock('os', () => ({
      homedir: () => join(__dirname, 'mock_home'),
      tmpdir: () => join(__dirname, 'mock_tmp'),
      platform: () => 'linux',
      userInfo: () => ({ uid: 1000 }),
    }));

    vi.stubGlobal('process', { ...process, env: process.env });
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.restoreAllMocks();
    rmSync(mockHome, { recursive: true, force: true });
  });

  afterAll(() => {
    rmSync(testHome, { recursive: true, force: true });
    rmSync(testTmp, { recursive: true, force: true });
  });

  it('resolves path from user-dirs.dirs with $HOME correctly', () => {
    writeFileSync(mockUserDirsFile, `XDG_DOWNLOAD_DIR="$HOME/Downloads"`, 'utf8');
    const result = getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads');
    expect(result).toBe(join(mockHome, 'Downloads'));
  });

  it('falls back if user-dirs.dirs file is missing', () => {
    const result = getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads');
    expect(result).toBe(join(mockHome, 'Downloads'));
  });

  it('falls back if key is not found in file', () => {
    writeFileSync(mockUserDirsFile, `XDG_DOCUMENTS_DIR="$HOME/Documents"`, 'utf8');
    const result = getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads');
    expect(result).toBe(join(mockHome, 'Downloads'));
  });

  it('resolves correctly with relative path in file (non-absolute)', () => {
    writeFileSync(mockUserDirsFile, `XDG_DOWNLOAD_DIR="downloads-folder"`, 'utf8');
    const result = getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads');
    expect(result).toBe(join(mockHome, 'Downloads')); // fallback because value is not absolute
  });

  it('matches platformDirs fallback if key missing', () => {
    const { userDownloadsDir } = platformDirs('linux');
    const expected = userDownloadsDir();
    const result = getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads');
    expect(result).toBe(expected);
  });

  // it falls back to homedir.config if XDG_CONFIG_HOME is not set
  it('falls back to homedir.config if XDG_CONFIG_HOME is not set', () => {
    delete process.env.XDG_CONFIG_HOME;
    writeFileSync(mockUserDirsFile, `XDG_DOWNLOAD_DIR="$HOME/Downloads"`, 'utf8');
    const result = getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads');
    expect(result).toBe(join(mockHome, 'Downloads'));
  });

  // if the match was not resolved, it should return the homedir/fallback
  it('returns fallback if match is not resolved', () => {
    writeFileSync(mockUserDirsFile, `XDG_DOWNLOAD_DIR=""`, 'utf8');
    const result = getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads');
    expect(result).toBe(join(mockHome, 'Downloads'));
  });
});
