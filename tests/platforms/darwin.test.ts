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
import { platformDirs } from '../../src/platform';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const app = 'TestApp';
const author = 'DefendIT';
const HOME = '/Users/TestUser'; // Mocked home directory for testing

const {
  userLogDir,
  runtimeDir,
  siteDataDir,
  userDataDir,
  userCacheDir,
  userMusicDir,
  userVideosDir,
  userConfigDir,
  siteConfigDir,
  userDesktopDir,
  userPicturesDir,
  userDocumentsDir,
  userDownloadsDir,
} = platformDirs('darwin');

describe('darwin platform paths (mocked to /Users/TestUser)', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mock('os', () => ({
      homedir: () => '/Users/TestUser',
      platform: () => 'darwin',
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('resolves siteDataDir correctly', () => {
    const path = siteDataDir('SiteApp');
    expect(path).toEqual(['/Library/Application Support/SiteApp']);
  });

  it('resolves siteConfigDir correctly', () => {
    const path = siteConfigDir('SiteApp');
    expect(path).toEqual(['/Library/Preferences/SiteApp']);
  });

  it('resolves userDocumentsDir correctly', () => {
    const path = userDocumentsDir();
    expect(path).toBe(join(HOME, 'Documents'));
  });

  it('resolves userDownloadsDir correctly', () => {
    const path = userDownloadsDir();
    expect(path).toBe(join(HOME, 'Downloads'));
  });

  it('resolves userPicturesDir correctly', () => {
    const path = userPicturesDir();
    expect(path).toBe(join(HOME, 'Pictures'));
  });

  it('resolves userVideosDir correctly', () => {
    const path = userVideosDir();
    expect(path).toBe(join(HOME, 'Movies'));
  });

  it('resolves userMusicDir correctly', () => {
    const path = userMusicDir();
    expect(path).toBe(join(HOME, 'Music'));
  });

  it('resolves userDesktopDir correctly', () => {
    const path = userDesktopDir();
    expect(path).toBe(join(HOME, 'Desktop'));
  });
});
