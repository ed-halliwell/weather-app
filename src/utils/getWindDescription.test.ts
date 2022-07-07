import getWindDescription from "./getWindDescription";

test("getWindDescription returns a sensible string when called", () => {
  expect(getWindDescription(-10, 0)).toBe("No winds from the north");
  expect(getWindDescription(5, 0)).toBe("Light winds from the north");
  expect(getWindDescription(7, 0)).toBe("Moderate winds from the north");
  expect(getWindDescription(16, 0)).toBe("Strong winds from the north");
  expect(getWindDescription(100, 0)).toBe("Very strong winds from the north");

  expect(getWindDescription(50, 359)).toBe("Very strong winds from the north");
  expect(getWindDescription(30, 50)).toBe(
    "Very strong winds from the north east"
  );
  expect(getWindDescription(30, 110)).toBe("Very strong winds from the east");
  expect(getWindDescription(30, 200)).toBe("Very strong winds from the south");
  expect(getWindDescription(30, 300)).toBe(
    "Very strong winds from the north west"
  );
  expect(getWindDescription(30, 360)).toBe("Very strong winds from the sky");
  expect(getWindDescription(30, 370)).toBe("Very strong winds from the sky");
});
