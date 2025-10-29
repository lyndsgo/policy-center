export interface DevicePolicy {
  id: string;
  name: string;
  type: "boolean" | "number" | "string";
  value: string;
}

export interface Device {
  id: string;
  name: string;
  serial: string;
  protected: boolean;
  policyEnd: string;
  policies: DevicePolicy[];
}
