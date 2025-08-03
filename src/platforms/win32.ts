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
import { isAbsolute, win32 } from 'path';
import type { WindowsDirs } from '../types';

const env = process.env;
const join = win32.join;

export const getWinBase = (roaming?: boolean): string => {
  const HOME = homedir();
  if (!roaming) {
    const local = env.LOCALAPPDATA || join(HOME, 'AppData', 'Local');
    /* c8 ignore next 3 -- this is in win32.test */
    return isAbsolute(local) ? local : join(HOME, 'AppData', 'Local');
  }

  const roamingBase = env.APPDATA || join(HOME, 'AppData', 'Roaming');
  /* c8 ignore next 3 -- this is in win32.test */
  return isAbsolute(roamingBase) ? roamingBase : join(HOME, 'AppData', 'Roaming');
};

export const getProgramData = (): string => {
  const systemDrive = env.SystemDrive || 'C:';
  const fallback = join(systemDrive, 'ProgramData');
  const programData = env.PROGRAMDATA || fallback;
  /* c8 ignore next 3 -- this is tested in win32.test */
  return isAbsolute(programData) ? programData : fallback;
};

export const windowsDirs: WindowsDirs = {
  userDataDir: (app, author, roaming) => join(getWinBase(roaming), author || '', app),
  userConfigDir: (app, author, roaming) => join(getWinBase(roaming), author || '', app),
  userCacheDir: (app, author, roaming) => join(getWinBase(roaming), author || '', app, 'Cache'),
  userLogDir: (app, author, roaming) =>
    join(windowsDirs.userCacheDir(app, author, roaming), 'Logs'),
  runtimeDir: () => null,
  siteDataDir: (app, author) => [join(getProgramData(), author || '', app || '')],
  siteConfigDir: (app, author) => [join(getProgramData(), author || '', app || '')],
  userDocumentsDir: () => join(homedir(), 'Documents'),
  userDownloadsDir: () => join(homedir(), 'Downloads'),
  userPicturesDir: () => join(homedir(), 'Pictures'),
  userVideosDir: () => join(homedir(), 'Videos'),
  userMusicDir: () => join(homedir(), 'Music'),
  userDesktopDir: () => join(homedir(), 'Desktop'),
};
