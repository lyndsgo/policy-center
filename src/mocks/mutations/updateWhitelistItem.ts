import { http, HttpResponse } from "msw";
import { MOCK_WHITELIST } from "../data/whitelist";

export const UPDATE_WHITELIST_ITEM = http.patch(
  `/whitelist/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const response = (await request.json()) as { id: string; ip: string };

    const existingIndex = MOCK_WHITELIST.findIndex((rule) => rule.id === id);

    if (existingIndex === -1) {
      return new HttpResponse({ error: "Not found" }, { status: 404 });
    }

    MOCK_WHITELIST[existingIndex].ip = response.ip;

    return HttpResponse.json(MOCK_WHITELIST[existingIndex], { status: 200 });
  },
);
