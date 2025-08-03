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

import { describe, it, expect } from 'vitest';
import {
  runtimeDir,
  userLogDir,
  siteDataDir,
  userDataDir,
  userMusicDir,
  userCacheDir,
  siteConfigDir,
  userConfigDir,
  userVideosDir,
  platformDirs,
  userDesktopDir,
  userPicturesDir,
  userDocumentsDir,
  userDownloadsDir,
} from '../src/index';

describe('index exports', () => {
  it('all exported functions are defined', () => {
    expect(typeof platformDirs).toBe('function');
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
