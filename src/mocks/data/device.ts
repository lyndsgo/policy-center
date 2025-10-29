import type { Device } from "@/types/device";

export const MOCK_DEVICE: Device = {
  id: "mock-id-abc",
  name: "Lyndsay's MacBook Pro",
  serial: "XQHM2W332L",
  policyEnd: "2026-01-01",
  protected: "true",
  policies: [
    {
      id: "require-encryption",
      name: "Require disk encryption",
      type: "boolean",
      value: "true",
    },
    {
      id: "min-os",
      name: "Enforce Minimum OS version",
      type: "boolean",
      value: "false",
    },
    {
      id: "auto-install-os",
      name: "Auto-install OS updates",
      type: "boolean",
      value: "true",
    },
    {
      id: "screen-lock",
      name: "Screen timeout after 5 minutes",
      type: "boolean",
      value: "true",
    },
    {
      id: "allow-external",
      name: "Allow external media",
      type: "boolean",
      value: "true",
    },
    {
      id: "enforce-mfa",
      name: "Enforce Multi-Factor Authentication",
      type: "boolean",
      value: "false",
    },
  ],
};
