export interface App {
  id: string;
  name: string;
  currentVersion: string;
  nextVersion: string;
  lastUpdateDate: string;
  autoUpdate: "true" | "false";
  firewall: "true" | "false";
}

export interface SecuritySettings {
  firewall: "true" | "false";
  autoUpdate: "true" | "false";
  apps: App[];
}
