# dis-platform-dirs

![platform-dirs](./assets/pd.png) 

Dependency-free, cross-platform user directory resolver for Node.js and Bun.  
Inspired by Python’s [`platformdirs`](https://pypi.org/project/platformdirs/).

## Install

```bash
bun add dis-platform-dirs
# or
npm install dis-platform-dirs
```

## Overview

This module provides consistent paths for storing user-specific application data, config files, cache, logs, and runtime data across Linux, macOS, and Windows. All logic is based on environment variables and standard platform conventions.

### Windows

```ts
import platformDirs from "dis-platform-dirs";
import type { WindowsDirs } from "dis-platform-dirs";

const {
  userLogDir,
  runtimeDir,
  userDataDir,
  userCacheDir,
  userConfigDir,
  userDesktopDir,
  userDocumentsDir,
  userDownloadsDir,
  userMusicDir,
  userPicturesDir,
  userVideosDir,
  siteConfigDir,
  siteDataDir,
} = platformDirs as WindowsDirs;

const appName = "SuperApp";
const author = "SuperApp Inc";

console.log({
  appName,
  runtimeDir: runtimeDir(),
  userConfigDir: userConfigDir(appName),
  userConfigDirWAuthor: userConfigDir(appName, author),
  userConfigDirRoaming: userConfigDir(appName, undefined, true),
  userConfigDirRoamingWAuthor: userConfigDir(appName, author, true),
  userDataDir: userDataDir(appName),
  userDataDirWAuthor: userDataDir(appName, author),
  userDataDirRoaming: userDataDir(appName, undefined, true),
  userDataDirRoamingWAuthor: userDataDir(appName, author, true),
  userCacheDir: userCacheDir(appName),
  userCacheDirWAuthor: userCacheDir(appName, author),
  userCacheDirRoaming: userCacheDir(appName, undefined, true),
  userCacheDirRoamingWAuthor: userCacheDir(appName, author, true),
  userLogDir: userLogDir(appName),
  userLogDirWAuthor: userLogDir(appName, author),
  userLogDirRoaming: userLogDir(appName, undefined, true),
  userLogDirRoamingWAuthor: userLogDir(appName, author, true),
  siteDataDir: siteDataDir(appName),
  siteDataDirWAuthor: siteDataDir(appName, author),
  siteConfigDir: siteConfigDir(appName),
  siteConfigDirWAuthor: siteConfigDir(appName, author),
  userDesktopDir: userDesktopDir(),
  userDownloadsDir: userDownloadsDir(),
  userDocumentsDir: userDocumentsDir(),
  userPicturesDir: userPicturesDir(),
  userMusicDir: userMusicDir(),
  userVideosDir: userVideosDir(),
});

/*
// Expected output on Windows where <USER> is replaced with the current user
{
  appName: "SuperApp",
  runtimeDir: null,
  userConfigDir: "C:\\Users\\<USER>\\AppData\\Local\\SuperApp",
  userConfigDirWAuthor: "C:\\Users\\<USER>\\AppData\\Local\\SuperApp Inc\\SuperApp",
  userConfigDirRoaming: "C:\\Users\\<USER>\\AppData\\Roaming\\SuperApp",
  userConfigDirRoamingWAuthor: "C:\\Users\\<USER>\\AppData\\Roaming\\SuperApp Inc\\SuperApp",
  userDataDir: "C:\\Users\\<USER>\\AppData\\Local\\SuperApp",
  userDataDirWAuthor: "C:\\Users\\<USER>\\AppData\\Local\\SuperApp Inc\\SuperApp",
  userDataDirRoaming: "C:\\Users\\<USER>\\AppData\\Roaming\\SuperApp",
  userDataDirRoamingWAuthor: "C:\\Users\\<USER>\\AppData\\Roaming\\SuperApp Inc\\SuperApp",
  userCacheDir: "C:\\Users\\<USER>\\AppData\\Local\\SuperApp\\Cache",
  userCacheDirWAuthor: "C:\\Users\\<USER>\\AppData\\Local\\SuperApp Inc\\SuperApp\\Cache",
  userCacheDirRoaming: "C:\\Users\\<USER>\\AppData\\Roaming\\SuperApp\\Cache",
  userCacheDirRoamingWAuthor: "C:\\Users\\<USER>\\AppData\\Roaming\\SuperApp Inc\\SuperApp\\Cache",
  userLogDir: "C:\\Users\\<USER>\\AppData\\Local\\SuperApp\\Cache\\Logs",
  userLogDirWAuthor: "C:\\Users\\<USER>\\AppData\\Local\\SuperApp Inc\\SuperApp\\Cache\\Logs",
  userLogDirRoaming: "C:\\Users\\<USER>\\AppData\\Roaming\\SuperApp\\Cache\\Logs",
  userLogDirRoamingWAuthor: "C:\\Users\\<USER>\\AppData\\Roaming\\SuperApp Inc\\SuperApp\\Cache\\Logs",
  siteDataDir: [ "C:\\ProgramData\\SuperApp" ],
  siteDataDirWAuthor: [ "C:\\ProgramData\\SuperApp Inc\\SuperApp" ],
  siteConfigDir: [ "C:\\ProgramData\\SuperApp" ],
  siteConfigDirWAuthor: [ "C:\\ProgramData\\SuperApp Inc\\SuperApp" ],
  userDesktopDir: "C:\\Users\\<USER>\\Desktop",
  userDownloadsDir: "C:\\Users\\<USER>\\Downloads",
  userDocumentsDir: "C:\\Users\\<USER>\\Documents",
  userPicturesDir: "C:\\Users\\<USER>\\Pictures",
  userMusicDir: "C:\\Users\\<USER>\\Music",
  userVideosDir: "C:\\Users\\<USER>\\Videos",
}
*/
```

### macOS

```ts
import  platformDirs  from "dis-platform-dirs";
import type { DarwinDirs } from "dis-platform-dirs";

const {
  userLogDir,
  runtimeDir,
  userDataDir,
  userCacheDir,
  userConfigDir,
  userDesktopDir,
  userDocumentsDir,
  userDownloadsDir,
  userMusicDir,
  userPicturesDir,
  userVideosDir,
  siteConfigDir,
  siteDataDir,
} = platformDirs as DarwinDirs;

const appName = "SuperApp";

console.log({
  appName,
  runtimeDir: runtimeDir(),
  userConfigDir: userConfigDir(appName),
  userDataDir: userDataDir(appName),
  userCacheDir: userCacheDir(appName),
  userLogDir: userLogDir(appName),
  siteDataDir: siteDataDir(appName),
  siteConfigDir: siteConfigDir(appName),
  userDesktopDir: userDesktopDir(),
  userDownloadsDir: userDownloadsDir(),
  userDocumentsDir: userDocumentsDir(),
  userPicturesDir: userPicturesDir(),
  userMusicDir: userMusicDir(),
  userVideosDir: userVideosDir(),
});
/*
// Expected output on macOS where <USER> is replaced with the current user
{
  appName: "SuperApp",
  runtimeDir: null,
  userConfigDir: "/Users/<USER>/Library/Preferences/SuperApp",
  userDataDir: "/Users/<USER>/Library/Application Support/SuperApp",
  userCacheDir: "/Users/<USER>/Library/Caches/SuperApp",
  userLogDir: "/Users/<USER>/Library/Logs/SuperApp",
  siteDataDir: [ "/Library/Application Support/SuperApp" ],
  siteConfigDir: [ "/Library/Preferences/SuperApp" ],
  userDesktopDir: "/Users/<USER>/Desktop",
  userDownloadsDir: "/Users/<USER>/Downloads",
  userDocumentsDir: "/Users/<USER>/Documents",
  userPicturesDir: "/Users/<USER>/Pictures",
  userMusicDir: "/Users/<USER>/Music",
  userVideosDir: "/Users/<USER>/Movies",
}
*/
```

### Linux

```ts
import platformDirs from "dis-platform-dirs";
import type { LinuxDirs } from "dis-platform-dirs";

const {
  userLogDir,
  runtimeDir,
  userDataDir,
  userCacheDir,
  userConfigDir,
  userDesktopDir,
  userDocumentsDir,
  userDownloadsDir,
  userMusicDir,
  userPicturesDir,
  userVideosDir,
  siteConfigDir,
  siteDataDir,
} = platformDirs as LinuxDirs;

const appName = "SuperApp";

console.log({
  appName,
  runtimeDir: runtimeDir(appName),
  userConfigDir: userConfigDir(appName),
  userDataDir: userDataDir(appName),
  userCacheDir: userCacheDir(appName),
  userLogDir: userLogDir(appName),
  siteDataDir: siteDataDir(appName),
  siteConfigDir: siteConfigDir(appName),
  userDesktopDir: userDesktopDir(),
  userDownloadsDir: userDownloadsDir(),
  userDocumentsDir: userDocumentsDir(),
  userPicturesDir: userPicturesDir(),
  userMusicDir: userMusicDir(),
  userVideosDir: userVideosDir(),
});

/*
// Expected output on Linux where <user_name> is replaced with the current user
{
  appName: "SuperApp",
  runtimeDir: "/run/user/1000/SuperApp", // 1000 is an example id
  userConfigDir: "/home/<user_name>/.config/SuperApp",
  userDataDir: "/home/<user_name>/.local/share/SuperApp",
  userCacheDir: "/home/<user_name>/.cache/SuperApp",
  userLogDir: "/home/<user_name>/.local/state/SuperApp/logs",
  siteDataDir: [ "/usr/local/share/SuperApp", "/usr/share/SuperApp" ],
  siteConfigDir: [ "/etc/xdg/SuperApp" ],
  userDesktopDir: "/home/<user_name>/Desktop",
  userDownloadsDir: "/home/<user_name>/Downloads",
  userDocumentsDir: "/home/<user_name>/Documents",
  userPicturesDir: "/home/<user_name>/Pictures",
  userMusicDir: "/home/<user_name>/Music",
  userVideosDir: "/home/<user_name>/Videos",
}
*/
```

## Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository and.
2. **Install** any dependencies

   ```bash
   bun install
   
   #npm 
   npm i 
   ```

3. **Create a new branch**:

   ```bash
   git checkout -b feature/my-feature
   ```

4. **Develop your changes**, using vitest and follow the platform-specific test structure.

5. **Run tests**:

   ```bash
   bun run test 
   ```

   ---
  
   To test for a specific platform, i.e. ***darwin***, ***win32***, or ***linux***, use the included scripts:  

   ```bash
   #darwin
   bun run test:darwin

   #win32
   bun run test:win32

   #linux
   bun run test:linux
   ```

   > ***Note***: If using npm, simply replace `bun` with `npm`

6. **Ensure 100% coverage**:

   ```bash
   bun run coverage

   #npm
   npm run coverage
   ```

7. **Submit a pull request** with a clear description and include coverage report, i.e.

   ```bash
   % Coverage report from v8
   -------------------|---------|----------|---------|---------|-------------------
   File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
   -------------------|---------|----------|---------|---------|-------------------
   All files          |     100 |      100 |     100 |     100 |                   
    src               |     100 |      100 |     100 |     100 |                   
     index.ts         |     100 |      100 |     100 |     100 |                   
     platform.ts      |     100 |      100 |     100 |     100 |                   
     xdg-user-dirs.ts |     100 |      100 |     100 |     100 |                   
    src/platforms     |     100 |      100 |     100 |     100 |                   
     darwin.ts        |     100 |      100 |     100 |     100 |                   
     linux.ts         |     100 |      100 |     100 |     100 |                   
     win32.ts         |     100 |      100 |     100 |     100 |                   
   -------------------|---------|----------|---------|---------|-------------------
   ```

> *Note*: All contributions must comply with the [MIT License](#license) and cannot contain any runtime dependencies.

## License

[MIT License](./LICENSE.md)

© 2025 Defend I.T. Solutions LLC
