import { http, HttpResponse } from "msw";
import { MOCK_PATCH_RULES } from "@/mocks/data/patch-rules";

export const GET_PATCH_RULES = http.get("/patch-rules", () => {
  return HttpResponse.json(MOCK_PATCH_RULES);
});
