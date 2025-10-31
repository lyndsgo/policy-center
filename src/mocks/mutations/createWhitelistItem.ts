import { http, HttpResponse } from "msw";
import { MOCK_WHITELIST } from "@/mocks/data/whitelist";

export const CREATE_WHITELIST_ITEM = http.post(
  "/whitelist",
  async ({ request }) => {
    const response = (await request.json()) as { ip: string };

    if (!response.ip) {
      return HttpResponse.json(
        { error: "Missing IP address" },
        { status: 400 },
      );
    }
    const newItem = {
      id: crypto.randomUUID(),
      ip: response.ip,
    };

    MOCK_WHITELIST.push(newItem);

    return HttpResponse.json(newItem, { status: 201 });
  },
);
