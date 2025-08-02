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
import { homedir } from 'os';
import type { DarwinPaths } from '../types';

const HOME = homedir();

export const darwin: DarwinPaths = {
  userDataDir: (app) => join(HOME, 'Library', 'Application Support', app),
  userConfigDir: (app) => join(HOME, 'Library', 'Preferences', app),
  userCacheDir: (app) => join(HOME, 'Library', 'Caches', app),
  userLogDir: (app) => join(HOME, 'Library', 'Logs', app),
  runtimeDir: () => null,
  siteDataDir: () => ['/Library/Application Support'],
  siteConfigDir: () => ['/Library/Preferences'],
  userDocumentsDir: () => join(HOME, 'Documents'),
  userDownloadsDir: () => join(HOME, 'Downloads'),
  userPicturesDir: () => join(HOME, 'Pictures'),
  userVideosDir: () => join(HOME, 'Movies'),
  userMusicDir: () => join(HOME, 'Music'),
  userDesktopDir: () => join(HOME, 'Desktop'),
};
