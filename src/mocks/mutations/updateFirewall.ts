import { http, HttpResponse } from "msw";
import { MOCK_FIREWALL } from "@/mocks/data/firewall";
import type { FirewallApp, Firewall } from "@/types/firewall";

export const UPDATE_FIREWALL = http.patch("/firewall", async ({ request }) => {
  const response = (await request.json()) as {
    value?: Firewall["firewall"];
  };

  if (response.value === undefined) {
    return new HttpResponse({ error: "An error occurred" }, { status: 500 });
  }

  return HttpResponse.json(
    {
      ...MOCK_FIREWALL,
      firewall: response.value,
    },
    { status: 200 },
  );
});

export const UPDATE_FIREWALL_APP = http.patch(
  `/firewall/application/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const response = (await request.json()) as {
      value: FirewallApp["firewall"];
    };

    // update the mock firewall rule in-memory
    const appIndex = MOCK_FIREWALL.apps.findIndex((p) => p.id === id);

    if (appIndex === -1) {
      return new HttpResponse({ error: "Not found" }, { status: 404 });
    }

    MOCK_FIREWALL.apps[appIndex] = {
      ...MOCK_FIREWALL.apps[appIndex],
      firewall: response.value,
    };

    return HttpResponse.json(MOCK_FIREWALL.apps[appIndex], { status: 200 });
  },
);
