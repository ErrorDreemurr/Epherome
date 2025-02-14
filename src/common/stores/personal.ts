import { userDataPath } from "common/utils/info";
import fs from "fs";
import { action, makeObservable, observable } from "mobx";
import path from "path";
import got, { RequestError } from "got";
import { configStore, setConfig } from "../struct/config";
import { Nullable, Trilean } from "common/utils";
import { commonLogger } from "common/loggers";
import Steve from "assets/Steve.png";
import { Counter } from "common/utils/object";

export interface EphUserInfo {
  uuid: string;
  name: string;
  email: string;
  plan: "default" | "ultimate";
  verified: boolean;
}

export async function validateEphToken(token: string): Promise<Trilean> {
  try {
    await got.post("https://api.epherome.com/auth/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 1;
  } catch (e) {
    if ((e as RequestError).response) {
      configStore.epheromeToken = "";
      return -1;
    }
    return 0;
  }
}

export function parseEphToken(token: string): Nullable<EphUserInfo> {
  try {
    const [, payload] = token.split(".");
    const text = Buffer.from(payload, "base64").toString();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const currentHeadPath = path.join(userDataPath, "current_head");

export class PersonalStore {
  private counter = new Counter();
  @observable head: Nullable<string> = null;
  @observable userInfo: Nullable<EphUserInfo> = null;
  private defaultHead: string = Steve;
  getDefaultHead() {
    return this.defaultHead;
  }
  constructor() {
    if (fs.existsSync(currentHeadPath)) {
      this.defaultHead = fs.readFileSync(currentHeadPath).toString();
    }
    makeObservable(this);
  }
  @action private setHead(head: string) {
    this.head = head;
  }
  async updateHead(): Promise<void> {
    if (this.userInfo) {
      try {
        this.setHead(
          `https://api.epherome.com/users/avatar/${
            this.userInfo.uuid
          }?${this.counter.count()}`
        );
      } catch {
        commonLogger.warn("Unable to fetch head, finding in file system");
        try {
          // load head from local
          this.head = fs.readFileSync(currentHeadPath).toString();
        } catch {
          commonLogger.warn(
            "Unable to fetch head from file system, using none"
          );
        }
      }
    } else {
      commonLogger.warn("No token, skipping head updating");
    }
  }
  @action autoLogin() {
    this.userInfo = parseEphToken(configStore.epheromeToken);
    this.updateHead();
  }
  @action login(token: string) {
    setConfig((cfg) => (cfg.epheromeToken = token));
    this.userInfo = parseEphToken(token);
    this.updateHead();
  }
  @action logout() {
    setConfig((cfg) => (cfg.epheromeToken = ""));
    this.userInfo = null;
  }
}

export const personalStore = new PersonalStore();
