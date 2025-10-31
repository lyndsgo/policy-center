import { http, HttpResponse } from "msw";
import { MOCK_WHITELIST } from "@/mocks/data/whitelist";

export const DELETE_WHITELIST_ITEM = http.delete(
  "/whitelist/:id",
  ({ params }) => {
    const { id } = params;

    if (!id) {
      return HttpResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const existingIndex = MOCK_WHITELIST.findIndex((rule) => rule.id === id);

    if (existingIndex === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    MOCK_WHITELIST.splice(existingIndex, 1);

    return HttpResponse.json(MOCK_WHITELIST, { status: 200 });
  },
);
