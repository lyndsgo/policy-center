import { http, HttpResponse } from "msw";
import { MOCK_SECURITY_SETTINGS } from "@/mocks/data/security-settings";

export const GET_SECURITY_SETTINGS = http.get(`/security-settings`, () => {
  return HttpResponse.json(MOCK_SECURITY_SETTINGS);
});
