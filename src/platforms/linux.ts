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

import { isAbsolute } from 'path';
import { homedir, userInfo } from 'os';
import type { LinuxDirs } from '../types';
import { getXdgUserDir } from '../xdg-user-dirs';

const HOME = homedir();

export const linuxDirs: LinuxDirs = {
  userDataDir: (app) => {
    const base = process.env.XDG_DATA_HOME;
    const dir = base && isAbsolute(base) ? base : `${HOME}/.local/share`;
    return `${dir}/${app}`;
  },

  userConfigDir: (app) => {
    const base = process.env.XDG_CONFIG_HOME;
    const dir = base && isAbsolute(base) ? base : `${HOME}/.config`;
    return `${dir}/${app}`;
  },

  userCacheDir: (app) => {
    const base = process.env.XDG_CACHE_HOME;
    const dir = base && isAbsolute(base) ? base : `${HOME}/.cache`;
    return `${dir}/${app}`;
  },

  userLogDir: (app) => {
    const base = process.env.XDG_STATE_HOME;
    const dir = base && isAbsolute(base) ? base : `${HOME}/.local/state`;
    return `${dir}/${app}/logs`;
  },

  runtimeDir: (app) => {
    const dir = process.env.XDG_RUNTIME_DIR || `/run/user/${userInfo().uid}`;
    return dir && isAbsolute(dir) ? `${dir}/${app}` : null;
  },

  siteDataDir: (app) => {
    const raw = process.env.XDG_DATA_DIRS || '/usr/local/share:/usr/share';
    const filtered = raw.split(':').filter((p) => isAbsolute(p));
    /* c8 ignore next 2 in - tested linux.test */
    return filtered.map((p) => `${p}/${app || ''}`);
  },

  siteConfigDir: (app) => {
    const raw = process.env.XDG_CONFIG_DIRS || '/etc/xdg';
    const filtered = raw.split(':').filter((p) => isAbsolute(p));
    /* c8 ignore next 2 in - tested in linux.test */
    return filtered.map((p) => `${p}/${app || ''}`);
  },

  userDocumentsDir: () => getXdgUserDir('XDG_DOCUMENTS_DIR', 'Documents'),
  userDownloadsDir: () => getXdgUserDir('XDG_DOWNLOAD_DIR', 'Downloads'),
  userPicturesDir: () => getXdgUserDir('XDG_PICTURES_DIR', 'Pictures'),
  userVideosDir: () => getXdgUserDir('XDG_VIDEOS_DIR', 'Videos'),
  userMusicDir: () => getXdgUserDir('XDG_MUSIC_DIR', 'Music'),
  userDesktopDir: () => getXdgUserDir('XDG_DESKTOP_DIR', 'Desktop'),
};
