import { http, HttpResponse } from "msw";
import { MOCK_DEVICE } from "@/mocks/data/device";

export const GET_DEVICE = http.get("/device", () => {
  return HttpResponse.json(MOCK_DEVICE);
});
