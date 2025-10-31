import { http, HttpResponse } from "msw";
import type { PatchRulesApp, PatchRules } from "@/types/patch-rules";
import { MOCK_PATCH_RULES } from "@/mocks/data/patch-rules";

export const UPDATE_PATCH_RULES = http.patch(
  "/patch-rules",
  async ({ request }) => {
    const response = (await request.json()) as {
      value: PatchRules["autoUpdate"];
    };

    return HttpResponse.json(
      {
        ...MOCK_PATCH_RULES,
        autoUpdate: response.value,
      },
      { status: 200 },
    );
  },
);

export const UPDATE_PATCH_RULE_APP = http.patch(
  "/patch-rules/application/:id",
  async ({ params, request }) => {
    const { id } = params;
    const response = (await request.json()) as {
      value: PatchRulesApp["autoUpdate"];
    };

    // update the mock patch-rule in-memory
    const appIndex = MOCK_PATCH_RULES.apps.findIndex((p) => p.id === id);
    if (appIndex === -1) {
      return new HttpResponse({ error: "Not found" }, { status: 404 });
    }

    MOCK_PATCH_RULES.apps[appIndex] = {
      ...MOCK_PATCH_RULES.apps[appIndex],
      autoUpdate: response.value,
    };

    return HttpResponse.json(MOCK_PATCH_RULES.apps[appIndex], { status: 200 });
  },
);
