import { WithUnderline, _ } from "common/utils/arrays";
import { nanoid } from "nanoid";
import { configStore, setConfig } from "./config";

// initialize java config
if (configStore.javas.length === 0) {
  const javas = window.native.findJavas();
  if (javas) {
    javas.forEach((i) => {
      try {
        const java = window.native.checkJava(i);
        java && createJava(java, false);
      } catch (e) {
        console.error(e);
      }
    });
    configStore.save();
  }
}

// process java instances of old epherome
for (const i of configStore.javas) {
  if (!i.nanoid) {
    i.nanoid = nanoid();
  }
}

export interface Java extends WithUnderline {
  nanoid: string;
  dir: string;
  name: string; // version name
  is64Bit: boolean;
  nickname?: string; // created by user manually
}

export type JavaWithoutNanoid = Omit<Java, "nanoid">;

export function createJava(java: JavaWithoutNanoid, save = true): void {
  setConfig((cfg) => {
    _.append(cfg.javas, { ...java, nanoid: nanoid() }, !_.selected(cfg.javas));
    if (cfg.javas.length === 1) {
      _.select(cfg.javas, java);
    }
  }, save);
}

export function removeJava(java: Java): void {
  setConfig((cfg) => _.remove(cfg.javas, java));
}

export function parseJvmArgs(args: string): string[] {
  const arr: string[] = [];
  let inQuote = false;
  let temp = "";
  for (const c of `${args} `) {
    if (c === " " && !inQuote) {
      arr.push(temp);
      temp = "";
    } else if (c === '"') {
      inQuote = !inQuote;
    } else {
      temp += c;
    }
  }
  return arr;
}

export function defaultJvmArgs(): string {
  return "-Xmx2G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M";
}
