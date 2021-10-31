import { capitalizeFirstLetter, formatDate } from "../String/index";

describe("Testing String utils", () => {
  it("should return the string with the first letter as capital", () => {
    expect(capitalizeFirstLetter("test")).toEqual("Test");
    expect(capitalizeFirstLetter("TEST")).toEqual("Test");
    expect(capitalizeFirstLetter("this is a test")).toEqual("This is a test");
  });

  it("should return date formatted as DD/MM/YYYY", () => {
    expect(formatDate("1991-03-20")).toEqual("20/03/1991");
    expect(formatDate("date")).toEqual("Invalid Date");
  });
});
