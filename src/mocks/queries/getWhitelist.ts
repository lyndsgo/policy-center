import { http, HttpResponse } from "msw";
import { MOCK_WHITELIST } from "@/mocks/data/whitelist";

export const GET_WHITELIST = http.get("/whitelist", () => {
  return HttpResponse.json(MOCK_WHITELIST);
});
