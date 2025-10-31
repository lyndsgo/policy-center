import { http, HttpResponse } from "msw";
import { MOCK_USER } from "@/mocks/data/user";

export const GET_USER_DATA = http.get("/user", () => {
  return HttpResponse.json(MOCK_USER);
});
