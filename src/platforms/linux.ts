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
import type { LinuxPaths } from '../types';
import { getXdgUserDir } from '../xdg-user-dirs';

const HOME = homedir();

export const linuxPaths: LinuxPaths = {
  userDataDir: (app) => {
    const base = process.env.XDG_DATA_HOME;
    const dir = base && isAbsolute(base) ? base : join(HOME, '.local', 'share');
    return join(dir, app);
  },

  userConfigDir: (app) => {
    const base = process.env.XDG_CONFIG_HOME;
    const dir = base && isAbsolute(base) ? base : join(HOME, '.config');
    return join(dir, app);
  },

  userCacheDir: (app) => {
    const base = process.env.XDG_CACHE_HOME;
    const dir = base && isAbsolute(base) ? base : join(HOME, '.cache');
    return join(dir, app);
  },

  userLogDir: (app) => join(linuxPaths.userCacheDir(app), 'logs'),

  runtimeDir: () => {
    const dir = process.env.XDG_RUNTIME_DIR;
    return dir && isAbsolute(dir) ? dir : null;
  },

  siteDataDir: () => {
    const raw = process.env.XDG_DATA_DIRS || '/usr/local/share:/usr/share';
    return raw.split(':').filter((p) => isAbsolute(p));
  },

  siteConfigDir: () => {
    const raw = process.env.XDG_CONFIG_DIRS || '/etc/xdg';
    return raw.split(':').filter((p) => isAbsolute(p));
  },

  userDocumentsDir: () => getXdgUserDir('XDG_DOCUMENTS_DIR', 'Documents'),
  userDownloadsDir: () => getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads'),
  userPicturesDir: () => getXdgUserDir('XDG_PICTURES_DIR', 'Pictures'),
  userVideosDir: () => getXdgUserDir('XDG_VIDEOS_DIR', 'Videos'),
  userMusicDir: () => getXdgUserDir('XDG_MUSIC_DIR', 'Music'),
  userDesktopDir: () => getXdgUserDir('XDG_DESKTOP_DIR', 'Desktop'),
};
