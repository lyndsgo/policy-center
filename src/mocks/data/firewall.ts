import type { Firewall } from "@/types/firewall";

export const MOCK_FIREWALL: Firewall = {
  firewall: true,
  apps: [
    {
      id: "google-chrome",
      name: "Google Chrome",
      firewall: true,
    },
    {
      id: "spotify",
      name: "Spotify",
      firewall: true,
    },
    {
      id: "postman",
      name: "Postman",
      firewall: true,
    },
    {
      id: "figma",
      name: "Figma",
      firewall: true,
    },
    {
      id: "microsoft-outlook",
      name: "Microsoft Outlook",
      firewall: true,
    },
    {
      id: "adobe-ps",
      name: "Adobe Photoshop",
      firewall: true,
    },
  ],
};
