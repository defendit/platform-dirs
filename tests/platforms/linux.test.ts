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
const HOME = '/home/testuser';

// Environment setup
const ORIGINAL_ENV = { ...process.env };

describe('linux platform paths (mocked to /home/testuser with XDG spec)', () => {
  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      HOME,
      XDG_DATA_HOME: join(HOME, '.local', 'share'),
      XDG_CONFIG_HOME: join(HOME, '.config'),
      XDG_CACHE_HOME: join(HOME, '.cache'),
      XDG_STATE_HOME: join(HOME, '.local', 'state'),
      XDG_RUNTIME_DIR: '', // Explicitly set to empty to simulate unavailable runtime dir
      XDG_DATA_DIRS: '/usr/local/share:/usr/share',
      XDG_CONFIG_DIRS: '/etc/xdg',
    };

    vi.resetModules();
    vi.mock('os', () => ({
      homedir: () => '/home/testuser',
      platform: () => 'linux',
      userInfo: () => ({ uid: 1000 }), // Mock user info for runtimeDir
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...ORIGINAL_ENV };
  });

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
  } = platformDirs('linux');

  describe('userDataDir', () => {
    it('returns absolute path from XDG_DATA_HOME', () => {
      expect(userDataDir(app, author)).toBe(`${HOME}/.local/share/${app}`);
    });

    it('returns default if XDG_DATA_HOME is not absolute', () => {
      process.env.XDG_DATA_HOME = 'relative/path';
      vi.resetModules();
      expect(userDataDir(app, author)).toBe(`${HOME}/.local/share/${app}`);
    });
  });

  describe('userConfigDir', () => {
    it('returns absolute path from XDG_CONFIG_HOME', () => {
      expect(userConfigDir(app, author)).toBe(`${HOME}/.config/${app}`);
    });

    it('returns default if XDG_CONFIG_HOME is not absolute', () => {
      process.env.XDG_CONFIG_HOME = 'relative/config';
      vi.resetModules();
      expect(userConfigDir(app, author)).toBe(`${HOME}/.config/${app}`);
    });
  });

  describe('userCacheDir', () => {
    it('returns absolute path from XDG_CACHE_HOME', () => {
      expect(userCacheDir(app, author)).toBe(`${HOME}/.cache/${app}`);
    });

    it('returns default if XDG_CACHE_HOME is not absolute', () => {
      process.env.XDG_CACHE_HOME = 'not/absolute';
      vi.resetModules();
      expect(userCacheDir(app, author)).toBe(`${HOME}/.cache/${app}`);
    });
  });

  describe('userLogDir', () => {
    it('returns absolute path from XDG_STATE_HOME', () => {
      expect(userLogDir(app, author)).toBe(`${HOME}/.local/state/${app}/logs`);
    });

    it('returns default if XDG_STATE_HOME is not absolute', () => {
      process.env.XDG_STATE_HOME = 'relative/state';
      vi.resetModules();
      expect(userLogDir(app, author)).toBe(`${HOME}/.local/state/${app}/logs`);
    });
  });

  describe('runtimeDir', () => {
    it('returns absolute path from default if XDG_RUNTIME_DIR is empty', () => {
      expect(runtimeDir(app)).toBe(`/run/user/1000/${app}`);
    });

    it('returns absolute path from XDG_RUNTIME_DIR if set and absolute', () => {
      process.env.XDG_RUNTIME_DIR = '/tmp/runtime';
      vi.resetModules();
      expect(runtimeDir(app)).toBe(`/tmp/runtime/${app}`);
    });

    it('returns default if XDG_RUNTIME_DIR is not absolute', () => {
      process.env.XDG_RUNTIME_DIR = 'relative/runtime';
      vi.resetModules();
      expect(runtimeDir(app)).toBe(null);
    });
  });

  describe('siteDataDir', () => {
    it('resolves siteDataDir from XDG_DATA_DIRS', () => {
      expect(siteDataDir(app)).toEqual([`/usr/local/share/${app}`, `/usr/share/${app}`]);
    });

    it('returns default if XDG_DATA_DIRS is not set', () => {
      delete process.env.XDG_DATA_DIRS;
      vi.resetModules();
      expect(siteDataDir(app)).toEqual([`/usr/local/share/${app}`, `/usr/share/${app}`]);
    });

    it('returns an empty array if no absolute paths are found', () => {
      process.env.XDG_DATA_DIRS = 'relative/path';
      vi.resetModules();
      expect(siteDataDir(app)).toEqual([]);
    });
  });

  describe('siteConfigDir', () => {
    it('resolves siteConfigDir correctly', () => {
      expect(siteConfigDir(app)).toEqual([`/etc/xdg/${app}`]);
    });

    it('returns default if XDG_CONFIG_DIRS is not set', () => {
      delete process.env.XDG_CONFIG_DIRS;
      vi.resetModules();
      expect(siteConfigDir(app)).toEqual([`/etc/xdg/${app}`]);
    });

    it('returns an empty array if no absolute paths are found', () => {
      process.env.XDG_CONFIG_DIRS = 'relative/path';
      vi.resetModules();
      expect(siteConfigDir(app)).toEqual([]);
    });
  });

  it('resolves userDocumentsDir correctly', () => {
    expect(userDocumentsDir()).toBe(`${HOME}/Documents`);
  });

  it('resolves userDownloadsDir correctly', () => {
    expect(userDownloadsDir()).toBe(`${HOME}/Downloads`);
  });

  it('resolves userPicturesDir correctly', () => {
    expect(userPicturesDir()).toBe(`${HOME}/Pictures`);
  });

  it('resolves userVideosDir correctly', () => {
    expect(userVideosDir()).toBe(`${HOME}/Videos`);
  });

  it('resolves userMusicDir correctly', () => {
    expect(userMusicDir()).toBe(`${HOME}/Music`);
  });

  it('resolves userDesktopDir correctly', () => {
    expect(userDesktopDir()).toBe(`${HOME}/Desktop`);
  });
});
