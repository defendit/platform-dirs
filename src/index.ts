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

import { platformDirs } from './platform';
import type { PlatformDirsMap } from './types';
export type {
  Platform,
  LinuxDirs,
  DarwinDirs,
  WindowsDirs,
  PlatformDirs,
  PlatformDirsMap,
} from './types';

const dirs = platformDirs();
export const {
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
} = dirs as PlatformDirsMap[NodeJS.Platform];
export default dirs;
export { platformDirs } from './platform';
