const app = 'TestApp';
const author = 'DefendIT';

const isBun = typeof Bun !== 'undefined';
if (!isBun) {
  // @ts-ignore
  var { describe, it, expect, vi } = await import('vitest');
} else {
  // If running in Bun, use Bun's global test functions
  // @ts-ignore
  var { describe, it, expect } = await import('bun:test');
}

import {
  platformPaths,
  userDataDir,
  userConfigDir,
  userCacheDir,
  userLogDir,
  runtimeDir,
  siteDataDir,
  siteConfigDir,
  userDocumentsDir,
  userDownloadsDir,
  userPicturesDir,
  userVideosDir,
  userMusicDir,
  userDesktopDir,
} from '../src/index';

describe('index exports', () => {
  it('all exported functions are defined', () => {
    expect(typeof platformPaths).toBe('function');
    expect(typeof userDataDir).toBe('function');
    expect(typeof userConfigDir).toBe('function');
    expect(typeof userCacheDir).toBe('function');
    expect(typeof userLogDir).toBe('function');
    expect(typeof runtimeDir).toBe('function');
    expect(typeof siteDataDir).toBe('function');
    expect(typeof siteConfigDir).toBe('function');
    expect(typeof userDocumentsDir).toBe('function');
    expect(typeof userDownloadsDir).toBe('function');
    expect(typeof userPicturesDir).toBe('function');
    expect(typeof userVideosDir).toBe('function');
    expect(typeof userMusicDir).toBe('function');
    expect(typeof userDesktopDir).toBe('function');
  });
});
