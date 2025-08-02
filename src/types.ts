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

export type WindowsPaths = {
  /**
   * Returns the user data directory for the application.
   *
   * - If roaming === false: `%LOCALAPPDATA%\Author\App`
   *   - **Fallback**: `C:\Users\Alice\AppData\Local\Author\App`
   * ---
   * - If roaming === true or undefined: `%APPDATA%\Author\App`.
   *   - **Fallback**: `C:\Users\Alice\AppData\Roaming\Author\App`
   *
   * @example
   * userDataDir("SuperApp", "Acme");
   * // C:\Users\Alice\AppData\Roaming\Acme\SuperApp
   */
  userDataDir(app: string, author?: string, roaming?: boolean): string;

  /**
   * Returns the user configuration directory.
   * Same logic as `userDataDir`.
   *
   * @example
   * userConfigDir("SuperApp", "Acme"); // C:\Users\Alice\AppData\Roaming\Acme\SuperApp
   */
  userConfigDir(app: string, author?: string, roaming?: boolean): string;

  /**
   * Returns the user cache directory.
   * Appends \Cache to `userDataDir`.
   *
   * @example
   * userCacheDir("SuperApp", "Acme"); // C:\Users\Alice\AppData\Roaming\Acme\SuperApp\Cache
   */
  userCacheDir(app: string, author?: string, roaming?: boolean): string;

  /**
   * Returns the user log directory.
   * Appends \Logs to `userCacheDir`.
   *
   * @example
   * userLogDir("SuperApp", "Acme"); // C:\Users\Alice\AppData\Roaming\Acme\SuperApp\Cache\Logs
   */
  userLogDir(app: string, author?: string, roaming?: boolean): string;

  /**
   * Always returns null on Windows.
   *
   * @example
   * runtimeDir(); // null
   */
  runtimeDir(): string | null;

  /**
   * Returns system-wide data directories.
   *
   * @example
   * siteDataDir(); // ["C:\\ProgramData\\SuperApp"]
   */
  siteDataDir(app: string): string[];

  /**
   * Returns system-wide configuration directories.
   *
   * @example
   * siteConfigDir(); // ["C:\\ProgramData\\SuperApp"]
   */
  siteConfigDir(app: string): string[];

  /**
   * @example
   * userDocumentsDir(); // C:\Users\Alice\Documents
   */
  userDocumentsDir(): string;

  /**
   * @example
   * userDownloadsDir(); // C:\Users\Alice\Downloads
   */
  userDownloadsDir(): string;

  /**
   * @example
   * userPicturesDir(); // C:\Users\Alice\Pictures
   */
  userPicturesDir(): string;

  /**
   * @example
   * userVideosDir(); // C:\Users\Alice\Videos
   */
  userVideosDir(): string;

  /**
   * @example
   * userMusicDir(); // C:\Users\Alice\Music
   */
  userMusicDir(): string;

  /**
   * @example
   * userDesktopDir(); // C:\Users\Alice\Desktop
   */
  userDesktopDir(): string;
};

export type LinuxPaths = {
  /**
   * @example
   * userDataDir("SuperApp"); // /home/alice/.local/share/SuperApp
   */
  userDataDir(app: string, author?: string): string;

  /**
   * @example
   * userConfigDir("SuperApp"); // /home/alice/.config/SuperApp
   */
  userConfigDir(app: string, author?: string): string;

  /**
   * @example
   * userCacheDir("SuperApp"); // /home/alice/.cache/SuperApp
   */
  userCacheDir(app: string, author?: string): string;

  /**
   * @example
   * userLogDir("SuperApp"); // /home/alice/.cache/SuperApp/logs
   */
  userLogDir(app: string, author?: string): string;

  /**
   * @example
   * runtimeDir(); // /run/user/1000
   */
  runtimeDir(): string | null;

  /**
   * @example
   * siteDataDir(); // ["/usr/local/share", "/usr/share"]
   */
  siteDataDir(): string[];

  /**
   * @example
   * siteConfigDir(); // ["/etc/xdg"]
   */
  siteConfigDir(): string[];

  /**
   * @example
   * userDocumentsDir(); // /home/alice/Documents
   */
  userDocumentsDir(): string;

  /**
   * @example
   * userDownloadsDir(); // /home/alice/Downloads
   */
  userDownloadsDir(): string;

  /**
   * @example
   * userPicturesDir(); // /home/alice/Pictures
   */
  userPicturesDir(): string;

  /**
   * @example
   * userVideosDir(); // /home/alice/Videos
   */
  userVideosDir(): string;

  /**
   * @example
   * userMusicDir(); // /home/alice/Music
   */
  userMusicDir(): string;

  /**
   * @example
   * userDesktopDir(); // /home/alice/Desktop
   */
  userDesktopDir(): string;
};

export type DarwinPaths = {
  /**
   * @example
   * userDataDir("SuperApp"); // /Users/alice/Library/Application Support/SuperApp
   */
  userDataDir(app: string, author?: string): string;

  /**
   * @example
   * userConfigDir("SuperApp"); // /Users/alice/Library/Preferences/SuperApp
   */
  userConfigDir(app: string, author?: string): string;

  /**
   * @example
   * userCacheDir("SuperApp"); // /Users/alice/Library/Caches/SuperApp
   */
  userCacheDir(app: string, author?: string): string;

  /**
   * @example
   * userLogDir("SuperApp"); // /Users/alice/Library/Logs/SuperApp
   */
  userLogDir(app: string, author?: string): string;

  /**
   * @example
   * runtimeDir(); // null
   */
  runtimeDir(): string | null;

  /**
   * @example
   * siteDataDir(); // ["/Library/Application Support"]
   */
  siteDataDir(): string[];

  /**
   * @example
   * siteConfigDir(); // ["/Library/Preferences"]
   */
  siteConfigDir(): string[];

  /**
   * @example
   * userDocumentsDir(); // /Users/alice/Documents
   */
  userDocumentsDir(): string;

  /**
   * @example
   * userDownloadsDir(); // /Users/alice/Downloads
   */
  userDownloadsDir(): string;

  /**
   * @example
   * userPicturesDir(); // /Users/alice/Pictures
   */
  userPicturesDir(): string;

  /**
   * @example
   * userVideosDir(); // /Users/alice/Movies
   */
  userVideosDir(): string;

  /**
   * @example
   * userMusicDir(); // /Users/alice/Music
   */
  userMusicDir(): string;

  /**
   * @example
   * userDesktopDir(); // /Users/alice/Desktop
   */
  userDesktopDir(): string;
};

// /** Platform path type map by Node platform identifier. */
export type PlatformPathsMap = {
  win32: WindowsPaths;
  darwin: DarwinPaths;
  linux: LinuxPaths;
  [key: string]: WindowsPaths | DarwinPaths | LinuxPaths; // fallback to union for unknown platforms
};

/** Union type of supported platforms. */
export type Platform = keyof PlatformPathsMap;

/** Platform-specific path type by platform key. */
export type PlatformPaths<T extends Platform = Platform> = PlatformPathsMap[T];
