import { capitalizeFirstLetter } from "./index";

describe("Testing String utils", () => {
  it("should return the string with the first letter as capital", () => {
    expect(capitalizeFirstLetter("test")).toEqual("Test");
    expect(capitalizeFirstLetter("TEST")).toEqual("Test");
    expect(capitalizeFirstLetter("this is a test")).toEqual("This is a test");
  });
});
