import type { PatchRules } from "@/types/patch-rules";

export const MOCK_PATCH_RULES: PatchRules = {
  autoUpdate: true,
  apps: [
    {
      id: "google-chrome",
      name: "Google Chrome",
      currentVersion: "138.0.72",
      nextVersion: "139.0.72",
      lastUpdateDate: "2025-10-24",
      autoUpdate: true,
    },
    {
      id: "spotify",
      name: "Spotify",
      currentVersion: "9.0.90",
      nextVersion: "9.1.0",
      lastUpdateDate: "2025-10-22",
      autoUpdate: true,
    },
    {
      id: "postman",
      name: "Postman",
      currentVersion: "10.15.0",
      nextVersion: "10.16.0",
      lastUpdateDate: "2025-09-30",
      autoUpdate: true,
    },
    {
      id: "figma",
      name: "Figma",
      currentVersion: "2025.10.12",
      nextVersion: "2025.11.0",
      lastUpdateDate: "2025-10-12",
      autoUpdate: true,
    },
    {
      id: "microsoft-outlook",
      name: "Microsoft Outlook",
      currentVersion: "17.42.0",
      nextVersion: "17.43.0",
      lastUpdateDate: "2025-10-01",
      autoUpdate: true,
    },
    {
      id: "adobe-ps",
      name: "Adobe Photoshop",
      currentVersion: "26.8.1",
      nextVersion: "27.0.0",
      lastUpdateDate: "2025-10-15",
      autoUpdate: true,
    },
  ],
};
