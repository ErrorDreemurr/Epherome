import { Language } from ".";

const enUs: Language = {
  name: "en-us",
  nativeName: "English",
  definition: {
    hello: "Hello",
    home: "Home",
    epherome: "Epherome",
    accounts: "Accounts",
    profiles: "Profiles",
    settings: "Settings",
    launch: "Launch",
    launching: "Launching",
    edit: "Edit",
    news: "News",
    create: "Create",
    cancel: "Cancel",
    remove: "Remove",
    fine: "Fine",
    email: "E-mail",
    password: "Password",
    username: "Username",
    authserver: "Authserver",
    name: "Name",
    directory: "Directory",
    version: "Version",
    general: "General",
    appearance: "Appearance",
    about: "About",
    os: "OS",
    language: "Language",
    save: "Save",
    warning: "Warning",
    done: "Done",
    add: "Add",
    tip: "Tip",
    help: "Help",
    refresh: "Refresh",
    collapse: "Collapse",
    expand: "Expand",
    useDefault: "<Default>",
    haveNot: "Haven't yet",
    export: "Export",
    "account.mojang": "Mojang",
    "account.microsoft": "Microsoft",
    "account.authlib": "Authlib Injector",
    "account.offline": "Offline",
    "account.errCreating":
      "The information is incorrect or the authentication server is down",
    "account.removing": "Remove Account",
    "account.notSelected": "No Account Selected",
    "account.wrongPassword": "Password Wrong",
    "account.inputPassword": "Please Input Password",
    "account.msAccNoMinecraft":
      "You don't have Minecraft in your Microsoft account yet.",
    "account.clickToLogin":
      "Click 'Create' to log in to your Microsoft account.",
    "account.skin": "Skin",
    "account.skin.notSupportedExcludeMojangMs":
      "Only support to view the skin of Mojang or Microsoft account.",
    "profile.removing": "Remove Profile",
    "profile.notSelected": "No Profile Selected",
    "profile.openDirectory": "Browse",
    "profile.usuallyDotMinecraftEtc":
      "Usually '.minecraft' on Windows and 'minecraft' on macOS and Linux.",
    "profile.maps": "Maps",
    "profile.resourcePacks": "Resourcepacks",
    "profile.resolution": "Resolution",
    "profile.jvmArgs": "JVM Arguments",
    "profile.noContent": "No Content",
    "profile.disable": "Disable",
    "profile.enable": "Enable",
    "profile.import": "Import",
    "profile.gameDirIsolation": "Game Dir Isolation",
    "profile.showEpherome": "Show Epherome",
    "profile.gameDirIsolation.description":
      "For different game versions, use different game directories.",
    "profile.showEpherome.description":
      'Display "Epherome" in the lower left corner of the Minecraft home page.',
    "profile.install": "Installs",
    "profile.installing": "Installing",
    "profile.installForMinecraft": "Install for Minecraft {0}",
    "profile.selectInstallContent": "Choose what you want to install.",
    "profile.installerAdaptToSomething": "{1} for Minecraft {0}",
    "profile.noInstallerAdaptToSomething": "No {1} for Minecraft {0} found",
    "profile.canOnlyInstallOnVanilla":
      '"Installs" is only available for vanilla Minecraft.',
    "profile.safeLog4j": "Safe Log4J",
    "profile.safeLog4j.description":
      'Enable "formatMsgNoLookups" to prevent Log4J issues.',
    "profile.exportModpack": "Export Modpack",
    "profile.gameOptionsPath": "Game Options Path",
    "profile.resourceType.resourcePack": "Resource Pack",
    "profile.resourceType.shaderPack": "Shader Pack",
    "settings.epheromePath": "Epherome Path",
    "settings.officialSite": "Official Site",
    "settings.openSourceSoftware": "Open Source Software",
    "settings.downloadProvider": "Download Provider",
    "settings.downloadProvider.official": "Official",
    "settings.downloadConcurrency": "Download Concurrency",
    "settings.hitokoto": "Hitokoto",
    "settings.theme": "Theme",
    "settings.theme.followOS": "Follow OS",
    "settings.titleBar": "Title Bar",
    "settings.titleBar.message":
      "Restart Epherome to apply the title bar settings.",
    "settings.devMode": "Developer Mode",
    "settings.downloadProvider.description":
      "If the official source is slow, you can try to replace it.",
    "settings.downloadCurrency.description":
      "The number of files that can be downloaded at the same time.",
    "settings.showNews": "Show News",
    "settings.autoCheckUpdate": "Automatically check for updates",
    display: "Display",
    "java.executablePath": "Java Executable Path",
    "java.manage": "Manage Java",
    "java.invalidPath": "Invalid Path",
    "java.duplicatePath": "Duplicate Path",
    "java.detect": "Detect",
    "java.bitNumber": "{0}-Bit",
    "java.default": "Default Java",
    "java.installJava": "Install Java",
    "java.pleaseGoTo": "If you want to download this kind of JDK, go to",
    "java.nickName": "Nickname of the JVM",
    download: "Download",
    downloading: "Downloading",
    downloadingSomething: "Downloading {0}",
    "download.profileName": "Profile Name",
    "download.preparing": "Preparing",
    "download.notSelected": "No Version Selected",
    "version.release": "Release",
    "version.snapshot": "Snapshot",
    "version.old": "Old",
    "version.old_alpha": "Old Alpha",
    "version.old_beta": "Old Beta",
    processes: "Processes",
    "processes.noMinecraft": "No Minecraft Processes",
    "processes.logExported": "Log Exported at\n{0}",
    "processes.terminate": "Terminate",
    "processes.terminateIrreversible":
      "Forcibly terminating the process may cause you to lose some important data. Do you want to continue?",
    "processes.lookupLog": "See Log",
    "processes.exportLog": "Export Log",
    "processes.lookupProfile": "See Profile",
    "processes.notSelected": "No Process Selected",
    extensions: "Extensions",
    epheromeUpdate: "Epherome Update",
    "epheromeUpdate.check": "Check Update",
    "epheromeUpdate.available": "New version {0} is available.",
    "epheromeUpdate.availableMessage":
      "Please go to Epherome official website to download the latest version.",
    "epheromeUpdate.needNot": "Epherome is the latest version.",
    "launching.noAccOrProSelected": "No account or profile selected.",
    "launching.considerUsingJava17":
      "Java 17 is required to launch Minecraft since 1.18.",
    "launching.considerUsingJava16":
      "Java 16 is required to launch Minecraft since 1.17.",
    "launching.considerUsingJava8":
      "Java 8 is required to launch Minecraft before 1.6.",
    "launching.javaNotFound": "Java Not Found",
    "launching.javaNotFoundMessage":
      "Java not found on your computer. Please install one and add it through settings.",
    "launching.downloadingAsset": "Downloading Assets",
    "launching.downloadingLib": "Downloading Libraries",
    "launching.crashReport": "Minecraft Crashed!",
    "launching.crashReport.helper":
      "For more details, see Process Management page.",
    "ext.apps": "Applications",
    "theme.create": "Create a theme...",
    "theme.newTheme": "New Theme",
    "theme.type": "Type",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.background": "Background",
    "theme.secondary": "Secondary",
    "theme.divider": "Divider",
    "theme.contrast": "Contrast",
    "theme.primary": "Primary",
    "theme.shallow": "Shallow",
    "theme.card": "Card",
    "theme.danger": "Danger",
    "task.manager": "Task Manager",
    "task.noTasks": "No Tasks Running",
    "modpack.import": "Import Modpack",
    "modpack.filePath": "Modpack File Path (*.zip)",
    "modpack.unzipping": "Unzipping",
    "modpack.installingMinecraft": "Installing Minecraft",
    "modpack.installingModLoader": "Installing Mod Loader",
    "modpack.info": "Modpack Info",
    "modpack.name": "Modpack Name",
    "modpack.version": "Modpack Version",
    "modpack.author": "Modpack Author",
    "modpack.selectFiles": "Select Files",
    "modpack.export": "Export",
    "modpack.exporting": "Exporting",
    next: "Next",
    previous: "Previous",
    search: "Search",
    internetNotAvailable:
      "The web is different for you, cannot connect to the Internet.",
    errorOccurred: "Error Occurred",
    notSupportedYet: "Sorry that this is not supported yet.",
    confirmRemoving:
      "Are you sure you want to remove it? The operation is irreversible.",
    continueAnyway: "Continue Anyway",
    moveToTrash: "Move To Trash",
    confirmMoveSomethingToTrash:
      "Are you sure you want to remove {0} to trash? This operation is irreversible.",
    exportedAt: "Export at: ",
    versionOfSomething: "{0} Version",
    doneMessage: "This task has been done.",
    minimize: "Minimize",
    quit: "Quit",
    confirmQuitting: "Are you sure you want to quit Epherome?",
    removeFilesAsWell: "Remove files as well",
    unableToRefreshMsToken:
      "Unable to refresh Microsoft account token, please login again.",
    msLoginAgain: "Login Again",
    ephPersonalCenter: "Personal Center",
    ephLogin: "Login",
    "ext.installed": "Installed",
    "ext.recommended": "Recommended",
    "ext.all": "All",
    "ext.noItems": "No Items",
    "ext.remove": "Remove from Epherome",
    "ext.add": "Add to Epherome",
    "ext.reloadRequired": "Reload Required",
    "personal.loginTo": "Login to Epherome",
    "personal.register": "Register",
    "personal.login": "Login",
    "personal.openPersonalCenter": "Open Personal Center",
    "personal.changeAvatar": "Change Avatar",
    "personal.logout": "Logout",
    "personal.notLoggedIn": "Not Logged In",
    imageTooBig: "Image should not bigger than 256KB.",
    notSelected: "Not Selected",
    "ext.added": "Added",
    "ext.removed": "Removed",
    checkTokenAvailability: "Check Token Availability",
    "token.available.true": "Token is available.",
    "token.available.false": "Token is not available.",
    "profiles.dirUnavailable": "Directory is unavailable.",
    "profiles.searchVersion": "Search",
    serverControl: "Server Control",
    "server.removing": "Remove Server",
    marketplace: "Marketplace",
  },
};

export default enUs;
