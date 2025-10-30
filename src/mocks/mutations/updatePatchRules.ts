import { http, HttpResponse } from "msw";
import type { PatchRulesApp, PatchRules } from "@/types/patch-rules";
import { MOCK_PATCH_RULES } from "@/mocks/data/patch-rules";

export const TOGGLE_GLOBAL_PATCH_RULES = http.patch(
  `/patch-rules`,
  async ({ request }) => {
    const response = (await request.json()) as {
      value?: PatchRules["autoUpdate"];
    };

    if (response.value === undefined) {
      return new HttpResponse(null, { status: 500 });
    }

    return HttpResponse.json({
      ...MOCK_PATCH_RULES,
      autoUpdate: response.value,
    });
  },
);

export const UPDATE_PATCH_RULE = http.patch(
  `/patch-rules/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const response = (await request.json()) as {
      value?: PatchRulesApp["autoUpdate"];
    };

    // update the mock patch-rule in-memory
    const appIndex = MOCK_PATCH_RULES.apps.findIndex((p) => p.id === id);
    if (appIndex === -1 || response.value === undefined) {
      return new HttpResponse(null, { status: 500 });
    }

    MOCK_PATCH_RULES.apps[appIndex] = {
      ...MOCK_PATCH_RULES.apps[appIndex],
      autoUpdate: response.value,
    };

    return HttpResponse.json(MOCK_PATCH_RULES);
  },
);
