import { http, HttpResponse } from "msw";
import type { User } from "@/types/user";

export const GET_USER_DATA = http.get(
  `${import.meta.env.VITE_API_URL}/user`,
  () => {
    return HttpResponse.json({
      id: "lg-123",
      firstname: "Lyndsay",
      lastname: "Gould",
    } satisfies User);
  },
);
