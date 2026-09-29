import {
  sanitiseReturnPath,
  withReturnPath,
} from "@/features/auth/utils/return-to";

describe("sanitiseReturnPath", () => {
  it.each(["/checkout", "/products?page=2", "/orders/ODR-1"])(
    "keeps the same-site path %s",
    (path) => expect(sanitiseReturnPath(path)).toBe(path),
  );

  it.each([
    "https://evil.example.com",
    "//evil.example.com",
    "http://evil.example.com/x",
    "/\\evil.example.com",
    "javascript:alert(1)",
    "",
    null,
    undefined,
  ])("refuses %p", (path) => {
    expect(sanitiseReturnPath(path)).toBeUndefined();
  });
});

describe("withReturnPath", () => {
  it("appends the encoded path", () => {
    expect(withReturnPath("/login", "/products?page=2")).toBe(
      "/login?next=%2Fproducts%3Fpage%3D2",
    );
  });

  it("leaves the target alone when the path is not usable", () => {
    expect(withReturnPath("/login", "https://evil.example.com")).toBe("/login");
  });
});
