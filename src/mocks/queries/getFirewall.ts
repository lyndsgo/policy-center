import { http, HttpResponse } from "msw";
import { MOCK_FIREWALL } from "@/mocks/data/firewall";

export const GET_FIREWALL = http.get(`/firewall`, () => {
  return HttpResponse.json(MOCK_FIREWALL);
});
