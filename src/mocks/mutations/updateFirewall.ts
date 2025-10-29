import { http, HttpResponse } from "msw";
import { MOCK_SECURITY_SETTINGS } from "../data/security-settings";
import type { App, SecuritySettings } from "@/types/security-settings";

export const UPDATE_FIREWALL_ALL = http.patch(
  `/security-settings/firewall`,
  async ({ request }) => {
    const response = (await request.json()) as {
      value?: SecuritySettings["firewall"];
    };

    if (!response.value) {
      return new HttpResponse(null, { status: 500 });
    }

    return HttpResponse.json({
      ...MOCK_SECURITY_SETTINGS,
      firewall: response.value,
    });
  },
);

export const UPDATE_FIREWALL_APP = http.patch(
  `/security-settings/firewall/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const response = (await request.json()) as {
      value?: App["firewall"];
    };

    // update the mock device in-memory
    const appIndex = MOCK_SECURITY_SETTINGS.apps.findIndex((p) => p.id === id);
    if (appIndex === -1 || !response.value) {
      return new HttpResponse(null, { status: 500 });
    }

    MOCK_SECURITY_SETTINGS.apps[appIndex] = {
      ...MOCK_SECURITY_SETTINGS.apps[appIndex],
      firewall: response.value,
    };

    return HttpResponse.json(MOCK_SECURITY_SETTINGS);
  },
);
