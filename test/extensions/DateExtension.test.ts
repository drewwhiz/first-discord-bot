import { expect } from "chai";
import "mocha";
import "../../src/extensions/DateExtension";

describe("Date Extensions", () => {

  it("should return correct day name", () => {
    const sunday = new Date(2019, 7, 4);
    expect(sunday.getDayNameLocal()).to.equal("Sunday");
  });

  it("should return correct day name in UTC and Central Time", () => {
    const sunday = new Date("2019-08-04T03:00:00Z");
    expect(sunday.getDayNameUtc()).to.equal("Sunday");
    expect(sunday.getDayNameLocal()).to.equal("Saturday");
  });

  it("should return correct month name", () => {
    const august = new Date(2019, 7, 4);
    expect(august.getMonthNameLocal()).to.equal("August");
  });

  it("should return correct month name in UTC and Central Time", () => {
    const august = new Date("2019-08-01T03:00:00Z");
    expect(august.getMonthNameUtc()).to.equal("August");
    expect(august.getMonthNameLocal()).to.equal("July");
  });

  it("should return correct time in 12 hour format", () => {
    const threePM = new Date("2019-08-01T15:00:00Z");
    expect(threePM.getTwelveHourTimeUtc()).to.equal("3:00 PM");

    const twelveMidnight = new Date("2019-08-01T00:00:00Z");
    expect(twelveMidnight.getTwelveHourTimeUtc()).to.equal("12:00 AM");

    const twelveNoon = new Date("2019-08-01T12:00:00Z");
    expect(twelveNoon.getTwelveHourTimeUtc()).to.equal("12:00 PM");

    const threeAM = new Date("2019-08-01T03:00:00Z");
    expect(threeAM.getTwelveHourTimeUtc()).to.equal("3:00 AM");
  });

  it("should return correct time in 12 hour format in Central Time", () => {
    const threePM = new Date("2019-08-01T15:00:00Z");
    expect(threePM.getTwelveHourTimeLocal()).to.equal("10:00 AM");

    const twelveMidnight = new Date("2019-08-01T00:00:00Z");
    expect(twelveMidnight.getTwelveHourTimeLocal()).to.equal("7:00 PM");

    const twelveNoon = new Date("2019-08-01T12:00:00Z");
    expect(twelveNoon.getTwelveHourTimeLocal()).to.equal("7:00 AM");

    const threeAM = new Date("2019-08-01T03:00:00Z");
    expect(threeAM.getTwelveHourTimeLocal()).to.equal("10:00 PM");
  });

});
