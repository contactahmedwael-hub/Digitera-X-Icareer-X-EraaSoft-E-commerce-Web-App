import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("px-2", false, "text-sm", undefined)).toBe("px-2 text-sm");
  });
});
