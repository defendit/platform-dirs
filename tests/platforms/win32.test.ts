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

import path from 'path';
import { getWinBase, getProgramData } from '../../src/platforms/win32';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('win32 platform paths (mocked to C:\\Users\\TestUser)', () => {
  const app = 'TestApp';
  const author = 'DefendIT';
  const homeDir = 'C:\\Users\\TestUser'; // Mocked home directory for testing
  const ORIGINAL_ENV = { ...process.env };
  const DEFAULT_LOCALAPPDATA = path.win32.join(homeDir, 'AppData', 'Local');
  const DEFAULT_ROAMINGAPPDATA = path.win32.join(homeDir, 'AppData', 'Roaming');

  let mod: any;
  let USERPROFILE: string;
  let PROGRAMDATA: string;
  let LOCALAPPDATA: string;

  beforeEach(async () => {
    vi.resetModules();
    vi.mock('os', () => ({
      homedir: () => 'C:\\Users\\TestUser',
    }));
    vi.stubGlobal('process', {
      ...process,
      platform: 'win32',
      env: {
        ...process.env,
        HOME: homeDir,
        SystemDrive: 'C:',
        USERPROFILE: homeDir,
        SystemRoot: 'C:\\Windows',
        PROGRAMDATA: 'C:\\ProgramData',
        APPDATA: DEFAULT_ROAMINGAPPDATA,
        LOCALAPPDATA: DEFAULT_LOCALAPPDATA,
      },
    });
    USERPROFILE = homeDir;
    PROGRAMDATA = 'C:\\ProgramData';
    LOCALAPPDATA = DEFAULT_LOCALAPPDATA;
    // Dynamic import for ES module compatibility
    const platformModule = await import('../../src/platform');
    mod = platformModule.platformDirs('win32');
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('getWinBase', () => {
    it('returns correct base path for local', () => {
      expect(path.win32.normalize(getWinBase())).toBe(path.win32.normalize(DEFAULT_LOCALAPPDATA));
      expect(path.win32.normalize(getWinBase(false))).toBe(
        path.win32.normalize(DEFAULT_LOCALAPPDATA)
      );
    });

    it('returns correct base path for roaming', () => {
      expect(path.win32.normalize(getWinBase(true))).toBe(
        path.win32.normalize(DEFAULT_ROAMINGAPPDATA)
      );
    });

    it('returns absolute path when LOCALAPPDATA is relative', () => {
      const old = process.env.LOCALAPPDATA;
      process.env.LOCALAPPDATA = 'AppData\\Local';
      expect(getWinBase()).toBe(path.win32.join(homeDir, 'AppData', 'Local'));
      process.env.LOCALAPPDATA = old; // restore original
    });
  });

  describe('getProgramData', () => {
    it('returns correct path', () => {
      expect(path.win32.normalize(getProgramData())).toBe(path.win32.normalize('C:\\ProgramData'));
    });

    it('returns absolute path when PROGRAMDATA is relative', () => {
      const old = process.env.PROGRAMDATA;
      process.env.PROGRAMDATA = 'ProgramData';
      expect(getProgramData()).toBe(path.win32.join('C:', 'ProgramData'));
      process.env.PROGRAMDATA = old; // restore original
    });
  });

  describe('userDataDir', () => {
    it('returns correct path', () => {
      expect(path.win32.normalize(mod.userDataDir(app, author))).toBe(
        path.win32.normalize(path.win32.join(LOCALAPPDATA, author, app))
      );
    });

    it('returns correct path with no author', () => {
      expect(path.win32.normalize(mod.userDataDir(app))).toBe(
        path.win32.normalize(path.win32.join(LOCALAPPDATA, app))
      );
    });

    it('returns correct path roaming', () => {
      expect(path.win32.normalize(mod.userDataDir(app, author, true))).toBe(
        path.win32.normalize(path.win32.join(DEFAULT_ROAMINGAPPDATA, author, app))
      );
    });

    it('returns correct path roaming with no author', () => {
      expect(path.win32.normalize(mod.userDataDir(app, undefined, true))).toBe(
        path.win32.normalize(path.win32.join(DEFAULT_ROAMINGAPPDATA, app))
      );
    });
  });

  describe('userConfigDir', () => {
    it('returns correct path', () => {
      expect(path.win32.normalize(mod.userConfigDir(app, author))).toBe(
        path.win32.normalize(path.win32.join(LOCALAPPDATA, author, app))
      );
    });

    it('returns correct path with no author', () => {
      expect(path.win32.normalize(mod.userConfigDir(app))).toBe(
        path.win32.normalize(path.win32.join(LOCALAPPDATA, app))
      );
    });

    it('returns correct path roaming', () => {
      expect(path.win32.normalize(mod.userConfigDir(app, author, true))).toBe(
        path.win32.normalize(path.win32.join(DEFAULT_ROAMINGAPPDATA, author, app))
      );
    });

    it('returns correct path roaming with no author', () => {
      expect(path.win32.normalize(mod.userConfigDir(app, undefined, true))).toBe(
        path.win32.normalize(path.win32.join(DEFAULT_ROAMINGAPPDATA, app))
      );
    });
  });

  describe('userCacheDir', () => {
    it('returns correct path', () => {
      expect(path.win32.normalize(mod.userCacheDir(app, author))).toBe(
        path.win32.normalize(path.win32.join(LOCALAPPDATA, author, app, 'Cache'))
      );
    });

    it('returns correct path with no author', () => {
      expect(path.win32.normalize(mod.userCacheDir(app))).toBe(
        path.win32.normalize(path.win32.join(LOCALAPPDATA, app, 'Cache'))
      );
    });

    it('returns correct path roaming', () => {
      expect(path.win32.normalize(mod.userCacheDir(app, author, true))).toBe(
        path.win32.normalize(path.win32.join(DEFAULT_ROAMINGAPPDATA, author, app, 'Cache'))
      );
    });

    it('returns correct path roaming with no author', () => {
      expect(path.win32.normalize(mod.userCacheDir(app, undefined, true))).toBe(
        path.win32.normalize(path.win32.join(DEFAULT_ROAMINGAPPDATA, app, 'Cache'))
      );
    });
  });

  describe('userLogDir', () => {
    it('returns correct path', () => {
      expect(path.win32.normalize(mod.userLogDir(app, author))).toBe(
        path.win32.normalize(path.win32.join(LOCALAPPDATA, author, app, 'Cache', 'Logs'))
      );
    });

    it('returns correct path with no author', () => {
      expect(path.win32.normalize(mod.userLogDir(app))).toBe(
        path.win32.normalize(path.win32.join(LOCALAPPDATA, app, 'Cache', 'Logs'))
      );
    });

    it('returns correct path roaming', () => {
      expect(path.win32.normalize(mod.userLogDir(app, author, true))).toBe(
        path.win32.normalize(path.win32.join(DEFAULT_ROAMINGAPPDATA, author, app, 'Cache', 'Logs'))
      );
    });

    it('returns correct path roaming with no author', () => {
      expect(path.win32.normalize(mod.userLogDir(app, undefined, true))).toBe(
        path.win32.normalize(path.win32.join(DEFAULT_ROAMINGAPPDATA, app, 'Cache', 'Logs'))
      );
    });
  });

  it('runtimeDir returns null', () => {
    expect(mod.runtimeDir()).toBe(null);
  });

  describe('siteDataDir', () => {
    it('returns correct path with app', () => {
      expect(mod.siteDataDir(app).map(path.win32.normalize)).toEqual([
        path.win32.normalize(path.win32.join(PROGRAMDATA, app)),
      ]);
    });

    it('returns correct path when app is undefined', () => {
      expect(mod.siteDataDir(undefined).map(path.win32.normalize)).toEqual([
        path.win32.normalize(PROGRAMDATA),
      ]);
    });
  });

  describe('siteConfigDir', () => {
    it('returns correct path with app', () => {
      expect(mod.siteConfigDir(app).map(path.win32.normalize)).toEqual([
        path.win32.normalize(path.win32.join(PROGRAMDATA, app)),
      ]);
    });

    it('returns correct path when app is undefined', () => {
      expect(mod.siteConfigDir(undefined).map(path.win32.normalize)).toEqual([
        path.win32.normalize(PROGRAMDATA),
      ]);
    });
  });

  it('userDocumentsDir returns correct path', () => {
    expect(path.win32.normalize(mod.userDocumentsDir())).toBe(
      path.win32.normalize(path.win32.join(USERPROFILE, 'Documents'))
    );
  });

  it('userDownloadsDir returns correct path', () => {
    expect(path.win32.normalize(mod.userDownloadsDir())).toBe(
      path.win32.normalize(path.win32.join(USERPROFILE, 'Downloads'))
    );
  });

  it('userPicturesDir returns correct path', () => {
    expect(path.win32.normalize(mod.userPicturesDir())).toBe(
      path.win32.normalize(path.win32.join(USERPROFILE, 'Pictures'))
    );
  });

  it('userVideosDir returns correct path', () => {
    expect(path.win32.normalize(mod.userVideosDir())).toBe(
      path.win32.normalize(path.win32.join(USERPROFILE, 'Videos'))
    );
  });

  it('userMusicDir returns correct path', () => {
    expect(path.win32.normalize(mod.userMusicDir())).toBe(
      path.win32.normalize(path.win32.join(USERPROFILE, 'Music'))
    );
  });

  it('userDesktopDir returns correct path', () => {
    expect(path.win32.normalize(mod.userDesktopDir())).toBe(
      path.win32.normalize(path.win32.join(USERPROFILE, 'Desktop'))
    );
  });
});
