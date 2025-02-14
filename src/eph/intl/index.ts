import { configStore, setConfig } from "common/struct/config";
import { format } from "common/utils";
import enUs from "./en-us";
import jaJp from "./ja-jp";
import { LanguageDefinition } from "./definition";
import zhCn from "./zh-cn";
import { action, makeObservable, observable } from "mobx";
import ruRu from "./ru-ru";

export interface Language {
  name: string; // eg `en-us`
  nativeName: string; // eg `English`
  definition: LanguageDefinition;
}

export class IntlStore {
  languages: Language[];
  @observable language?: Language;
  constructor(languages: Language[], fallback: string) {
    this.languages = languages;
    this.setLanguage(fallback, false);
    makeObservable(this);
  }
  @action
  setLanguage(name: string, save?: boolean): void {
    this.language = this.languages.find((val) => val.name === name);
    setConfig((cfg) => (cfg.language = name), save);
  }
}

// the only instance of IntlStore
export const intlStore = new IntlStore(
  [enUs, jaJp, zhCn, ruRu],
  configStore.language
);

export type KeyOfLanguageDefinition = keyof LanguageDefinition;

// translator function
export function t(key: KeyOfLanguageDefinition, ...args: string[]): string {
  if (key === "exportedAt") {
    console.log(format(intlStore.language?.definition[key] ?? "", ...args));
  }
  return format(intlStore.language?.definition[key] ?? "", ...args);
}
