export interface Policy {
  id: string;
  name: string;
  currentVersion: string;
  lastUpdateDate: string;
  signed: "true" | "false";
}

export type Policies = Policy[];
