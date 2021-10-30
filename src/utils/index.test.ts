import { itemHasMeat, getMeatCode, capitalizeFirstLetter } from "./index";

describe("Testing itemHasMeat", () => {
  it("should return correctly if item has meat", () => {
    expect(itemHasMeat("20-c-1991")).toBeTruthy();
    expect(itemHasMeat("20-C-1991")).toBeTruthy();

    expect(itemHasMeat("20-m-1991")).toBeTruthy();
    expect(itemHasMeat("20-M-1991")).toBeTruthy();

    expect(itemHasMeat("20-f-1991")).toBeTruthy();
    expect(itemHasMeat("20-F-1991")).toBeTruthy();

    expect(itemHasMeat("20-s-1991")).toBeTruthy();
    expect(itemHasMeat("20-S-1991")).toBeTruthy();

    expect(itemHasMeat("20-z-1991")).toBeFalsy();
    expect(itemHasMeat("20--1991")).toBeFalsy();
  });

  it("should return correctly the meat code", () => {
    expect(getMeatCode("20-c-1991")).toEqual("C");
    expect(getMeatCode("20-C-1991")).toEqual("C");

    expect(getMeatCode("20-m-1991")).toEqual("M");
    expect(getMeatCode("20-M-1991")).toEqual("M");

    expect(getMeatCode("20-f-1991")).toEqual("F");
    expect(getMeatCode("20-F-1991")).toEqual("F");

    expect(getMeatCode("20-s-1991")).toEqual("S");
    expect(getMeatCode("20-S-1991")).toEqual("S");

    expect(getMeatCode("20-z-1991")).toEqual("");
    expect(getMeatCode("20--1991")).toEqual("");
  });

  it("should return the string with the first letter as capital", () => {
    expect(capitalizeFirstLetter("test")).toEqual("Test");
    expect(capitalizeFirstLetter("TEST")).toEqual("Test");
    expect(capitalizeFirstLetter("this is a test")).toEqual("This is a test");
  });
});
