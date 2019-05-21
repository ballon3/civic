import civicFormat from "./civicFormat";

describe("civicFormat", () => {
  it("should format numbers correctly", () => {
    expect(civicFormat.numeric(0.1)).to.eql("0");
    expect(civicFormat.numeric(0.5)).to.eql("1");
    expect(civicFormat.numeric(1000)).to.eql("1,000");
    expect(civicFormat.numeric(1500)).to.eql("1,500");
    expect(civicFormat.numeric(1000000)).to.eql("1 million");
    expect(civicFormat.numeric(7300000)).to.eql("7.3 million");
    expect(civicFormat.numeric(-7300000)).to.eql("-7.3 million");
    expect(civicFormat.numeric(73000000000)).to.eql("73 billion");
  });

  it("should abbriviate numbers correctly", () => {
    expect(civicFormat.numericShort(0.1)).to.eql("0");
    expect(civicFormat.numericShort(0.5)).to.eql("1");
    expect(civicFormat.numericShort(1000)).to.eql("1k");
    expect(civicFormat.numericShort(1500)).to.eql("1.5k");
    expect(civicFormat.numericShort(1000000)).to.eql("1m");
    expect(civicFormat.numericShort(7300000)).to.eql("7.3m");
    expect(civicFormat.numericShort(-7300000)).to.eql("-7.3m");
    expect(civicFormat.numericShort(73000000000)).to.eql("73b");
  });

  it("should format percentages correctly", () => {
    expect(civicFormat.percentage(0.75)).to.eql("75%");
    expect(civicFormat.percentage(0.2379)).to.eql("24%");
  });

  it("should format dollars correctly", () => {
    expect(civicFormat.dollars(12)).to.eql("$12");
    expect(civicFormat.dollars(230.5)).to.eql("$231");
    expect(civicFormat.dollars(7300000)).to.eql("$7.3 million");
  });

  it("abreviates 2000 to 2k", () => {});
});
