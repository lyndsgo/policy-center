export interface PatchRulesApp {
  id: string;
  name: string;
  currentVersion: string;
  nextVersion: string;
  lastUpdateDate: string;
  autoUpdate: boolean;
}

export interface PatchRules {
  autoUpdate: boolean;
  apps: PatchRulesApp[];
}
