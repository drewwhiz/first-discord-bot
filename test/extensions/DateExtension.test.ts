import { expect } from 'chai';
import 'mocha';
import '../../src/extensions/DateExtension.js';

describe('Date Extensions', () => {
  it('should return correct UTC day name', () => {
    const sunday = new Date('2019-08-04T03:00:00Z');
    expect(sunday.getDayNameUtc()).to.equal('Sunday');
  });

  it('should return correct local day name', () => {
    const sundayMorning = new Date('2019-08-04T03:00:00Z');
    const morningOffset = sundayMorning.getTimezoneOffset();
    if (morningOffset >= 180) {
      // Day before is 180 minutes
      expect(sundayMorning.getDayNameLocal()).to.equal('Saturday');
    } else if (morningOffset <= -1260) {
      // Day after is 1260 minutes
      expect(sundayMorning.getDayNameLocal()).to.equal('Monday');
    } else {
      // Same day
      expect(sundayMorning.getDayNameLocal()).to.equal('Sunday');
    }

    const sundayNight = new Date('2019-08-04T21:00:00Z');
    const nightOffset = sundayNight.getTimezoneOffset();
    if (nightOffset >= 1260) {
      // Day before is 1260 minutes
      expect(sundayNight.getDayNameLocal()).to.equal('Saturday');
    } else if (nightOffset <= -180) {
      // Day after is 180 minutes
      expect(sundayNight.getDayNameLocal()).to.equal('Monday');
    } else {
      // Same day
      expect(sundayNight.getDayNameLocal()).to.equal('Sunday');
    }
  });

  it('should return correct UTC month name', () => {
    const august = new Date('2019-08-01T03:00:00Z');
    expect(august.getMonthNameUtc()).to.equal('August');
  });

  it('should return correct local month name', () => {
    const august = new Date('2019-08-01T03:00:00Z');
    const offset = august.getTimezoneOffset();

    if (offset >= 180) {
      // Month before
      expect(august.getMonthNameLocal()).to.equal('July');
    } else {
      // Same month
      expect(august.getMonthNameLocal()).to.equal('August');
    }
  });

  it('should return correct UTC time in 12 hour format', () => {
    const threePM = new Date('2019-08-01T15:00:00Z');
    expect(threePM.getTwelveHourTimeUtc()).to.equal('3:00 PM');

    const twelveMidnight = new Date('2019-08-01T00:00:00Z');
    expect(twelveMidnight.getTwelveHourTimeUtc()).to.equal('12:00 AM');

    const twelveNoon = new Date('2019-08-01T12:00:00Z');
    expect(twelveNoon.getTwelveHourTimeUtc()).to.equal('12:00 PM');

    const threeAM = new Date('2019-08-01T03:00:00Z');
    expect(threeAM.getTwelveHourTimeUtc()).to.equal('3:00 AM');
  });

  it('should return correct local time in 12 hour format', () => {
    const threePM = new Date('2019-08-01T15:00:00Z');
    let hours =
      threePM.getHours() -
      (threePM.getHours() > 12 ? 12 : 0) +
      (threePM.getHours() === 0 ? 12 : 0);
    let minutes = `${
      threePM.getMinutes() < 10 ? '0' : ''
    }${threePM.getMinutes()}`;
    let suffix = threePM.getHours() >= 12 ? 'PM' : 'AM';
    expect(threePM.getTwelveHourTimeLocal()).to.equal(
      `${hours}:${minutes} ${suffix}`,
    );

    const twelveMidnight = new Date('2019-08-01T00:00:00Z');
    hours =
      twelveMidnight.getHours() -
      (twelveMidnight.getHours() > 12 ? 12 : 0) +
      (twelveMidnight.getHours() === 0 ? 12 : 0);
    minutes = `${
      twelveMidnight.getMinutes() < 10 ? '0' : ''
    }${twelveMidnight.getMinutes()}`;
    suffix = twelveMidnight.getHours() >= 12 ? 'PM' : 'AM';
    expect(twelveMidnight.getTwelveHourTimeLocal()).to.equal(
      `${hours}:${minutes} ${suffix}`,
    );

    const twelveNoon = new Date('2019-08-01T12:00:00Z');
    hours =
      twelveNoon.getHours() -
      (twelveNoon.getHours() > 12 ? 12 : 0) +
      (twelveNoon.getHours() === 0 ? 12 : 0);
    minutes = `${
      twelveNoon.getMinutes() < 10 ? '0' : ''
    }${twelveNoon.getMinutes()}`;
    suffix = twelveNoon.getHours() >= 12 ? 'PM' : 'AM';
    expect(twelveNoon.getTwelveHourTimeLocal()).to.equal(
      `${hours}:${minutes} ${suffix}`,
    );

    const threeAM = new Date('2019-08-01T03:00:00Z');
    hours =
      threeAM.getHours() -
      (threeAM.getHours() > 12 ? 12 : 0) +
      (threeAM.getHours() === 0 ? 12 : 0);
    minutes = `${threeAM.getMinutes() < 10 ? '0' : ''}${threeAM.getMinutes()}`;
    suffix = threeAM.getHours() >= 12 ? 'PM' : 'AM';
    expect(threeAM.getTwelveHourTimeLocal()).to.equal(
      `${hours}:${minutes} ${suffix}`,
    );
  });

  it('should return correct full UTC date', () => {
    const sunday = new Date('2019-08-04T03:00:00Z');
    expect(sunday.getFullDateUtc()).to.equal('4 August 2019');
  });

  it('should return correct full local date', () => {
    const sundayMorning = new Date('2019-08-04T03:00:00Z');
    const morningOffset = sundayMorning.getTimezoneOffset();
    if (morningOffset >= 180) {
      // Day before is 180 minutes
      expect(sundayMorning.getFullDateLocal()).to.equal('3 August 2019');
    } else if (morningOffset <= -1260) {
      // Day after is 1260 minutes
      expect(sundayMorning.getFullDateLocal()).to.equal('5 August 2019');
    } else {
      // Same day
      expect(sundayMorning.getFullDateLocal()).to.equal('4 August 2019');
    }

    const sundayNight = new Date('2019-08-04T21:00:00Z');
    const nightOffset = sundayNight.getTimezoneOffset();
    if (nightOffset >= 1260) {
      // Day before is 1260 minutes
      expect(sundayNight.getFullDateLocal()).to.equal('3 August 2019');
    } else if (nightOffset <= -180) {
      // Day after is 180 minutes
      expect(sundayNight.getFullDateLocal()).to.equal('5 August 2019');
    } else {
      // Same day
      expect(sundayNight.getFullDateLocal()).to.equal('4 August 2019');
    }
  });
});
