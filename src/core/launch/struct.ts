import { StringMap } from "common/utils";
import { MinecraftVersionType } from "core/launch/versions";

export type ClientJsonArguments = (
  | string
  | {
      rules: ClientJsonRules;
      value: string | string[];
    }
)[];

// Note that there are two kinds of library object
// First: without `url` key
// Second: with only `name` and `url` key (It seems to be LiteLoader or Fabric)
export interface ClientJsonLibrary {
  downloads?: {
    artifact?: ClientJsonCommonArtifact;
    classifiers?: { [key: string]: ClientJsonCommonArtifact };
  };
  name?: string;
  url?: string;
  natives?: StringMap;
  extract?: {
    exclude?: string[];
  };
  rules?: ClientJsonRules;
}

export type ClientJsonLibraries = ClientJsonLibrary[];

export interface ClientJsonAssetIndex {
  id: string;
  sha1: string;
  size: number;
  totalSize: number;
  url: string;
}

export interface ClientJsonOSRule {
  name?: string;
  version?: string;
  arch?: string;
}

export interface ClientJsonFeaturesRule {
  is_demo_user?: boolean;
  has_custom_resolution?: boolean;
}

export interface ClientJsonRule {
  action: "allow" | "disallow";
  os?: ClientJsonOSRule;
  features?: ClientJsonFeaturesRule;
}

export type ClientJsonRules = ClientJsonRule[];

export interface ClientJsonCommonArtifact {
  path: string;
  sha1: string;
  size: number;
  url: string;
}

export interface ClientJson {
  arguments?: {
    game: ClientJsonArguments;
    jvm?: ClientJsonArguments;
  };
  inheritsFrom?: string;
  minecraftArguments?: string;
  assetIndex: ClientJsonAssetIndex;
  assets: string;
  downloads: {
    client: {
      sha1: string;
      size: number;
      url: string;
    };
  };
  id: string;
  libraries: ClientJsonLibraries;
  mainClass: string;
  releaseTime: string;
  time: string;
  type: MinecraftVersionType;
  jar?: string;
  patches?: Omit<ClientJson, "patches">[]; // appears in minecraft json file of HMCL
}

export interface ClientAnalyzedAsset {
  path: string;
  url: string;
  hash: string;
  size: number;
}

export interface ClientAnalyzedLibrary {
  name: string;
  path: string;
  url: string;
  sha1?: string;
  size: number;
}

export interface ClientAssetsResult {
  missing: ClientAnalyzedAsset[];
}

export interface ClientLibraryResult {
  classpath: string[];
  natives: string[];
  missing: ClientAnalyzedLibrary[];
}
