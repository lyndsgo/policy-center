import { expect, it, describe } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DevicePolicyPage from "./DevicePolicyPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MOCK_DEVICE } from "@/mocks/data/device";

const queryClient = new QueryClient();

describe("DevicePolicyPage", () => {
  it("renders page", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DevicePolicyPage />
      </QueryClientProvider>,
    );

    // wait for api response
    await waitFor(() => {
      expect(screen.getByText("Device Policies")).toBeInTheDocument();
      expect(screen.getByText(MOCK_DEVICE.name)).toBeInTheDocument();
      expect(screen.getByText(MOCK_DEVICE.serial)).toBeInTheDocument();
      expect(
        screen.getByText(MOCK_DEVICE.protected ? "Protected" : "Unprotected"),
      ).toBeInTheDocument();

      // check that all boolean policies are rendered
      MOCK_DEVICE.policies.forEach((policy) => {
        expect(screen.getByLabelText(policy.name)).toBeInTheDocument();
      });
    });
  });

  it("toggles a boolean policy", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DevicePolicyPage />
      </QueryClientProvider>,
    );

    // wait for api response (and policies to render)
    await waitFor(() => {
      MOCK_DEVICE.policies.forEach((policy) => {
        expect(screen.getByLabelText(policy.name)).toBeInTheDocument();
      });
    });

    // pick a policy to toggle
    const policyToToggle = MOCK_DEVICE.policies[0];

    const toggleInput = screen.getByRole("switch", {
      name: policyToToggle.name,
    });

    expect(toggleInput instanceof HTMLInputElement).toBe(true);

    const input = toggleInput as HTMLInputElement; //lint should now allow after narrowing

    // store current state
    const isCheckedRightNow = input.checked;

    // fire a change event
    fireEvent.click(input);

    // check state has changed
    expect(input.checked).toBe(!isCheckedRightNow);
  });
});
