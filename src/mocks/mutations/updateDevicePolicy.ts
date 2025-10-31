import { http, HttpResponse } from "msw";
import { MOCK_DEVICE } from "@/mocks/data/device";
import type { DevicePolicy } from "@/types/device";

export const UPDATE_DEVICE_POLICY = http.patch(
  `/device/policies/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const response = (await request.json()) as {
      value: DevicePolicy["value"];
    };

    if (id === "enforce-mfa") {
      return HttpResponse.json(
        { message: "Something went wrong updating policy" },
        { status: 500 },
      );
    }
    // update the mock device in-memory
    const policyIndex = MOCK_DEVICE.policies.findIndex((p) => p.id === id);
    if (policyIndex === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    MOCK_DEVICE.policies[policyIndex] = {
      ...MOCK_DEVICE.policies[policyIndex],
      value: response.value,
    };

    return HttpResponse.json(MOCK_DEVICE.policies[policyIndex], {
      status: 200,
    });
  },
);
