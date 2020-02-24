// This is being used to create Date extension methods,
//  so the interface name does not start with an "I".
// tslint:disable-next-line: interface-name
interface Date {
  getDayNameLocal: (this: Date) => string;
  getDayNameUtc: (this: Date) => string;
  getMonthNameLocal: (this: Date) => string;
  getMonthNameUtc: (this: Date) => string;
  getTwelveHourTimeLocal: (this: Date) => string;
  getTwelveHourTimeUtc: (this: Date) => string;
  getFullDateLocal: (this: Date) => string;
  getFullDateUtc: (this: Date) => string;
  getTimezone: (this: Date) => string;
  getIsoDate: (this: Date) => string;
  getIsoTime: (this: Date) => string;
}

// This is being used to create Date static extension methods,
//  so the interface name does not start with an "I".
// tslint:disable-next-line: interface-name
interface DateConstructor {
  millisecondsPerDay: number;
}

Date.millisecondsPerDay = 24 * 60 * 60 * 1000;

Date.prototype.getDayNameLocal = function(this: Date): string {
  return numberToDay(this.getDay());
};

Date.prototype.getDayNameUtc = function(this: Date): string {
  return numberToDay(this.getUTCDay());
};

Date.prototype.getMonthNameLocal = function(this: Date): string {
  return numberToMonth(this.getMonth());
};

Date.prototype.getMonthNameUtc = function(this: Date): string {
  return numberToMonth(this.getUTCMonth());
};

Date.prototype.getTwelveHourTimeLocal = function(this: Date): string {
  return twelveHourConverter(this.getHours(), this.getMinutes());
};

Date.prototype.getTwelveHourTimeUtc = function(this: Date): string {
  return twelveHourConverter(this.getUTCHours(), this.getUTCMinutes());
};

Date.prototype.getFullDateLocal = function(this: Date): string {
  return `${this.getDate()} ${this.getMonthNameLocal()} ${this.getFullYear()}`;
};

Date.prototype.getFullDateUtc = function(this: Date): string {
  return `${this.getUTCDate()} ${this.getMonthNameUtc()} ${this.getUTCFullYear()}`;
};

Date.prototype.getTimezone = function(this: Date): string {
  return this.toString().split("(")[1].replace(")", "");
}

Date.prototype.getIsoDate = function(this: Date): string {
  return this.toISOString().split('T')[0];
}

Date.prototype.getIsoTime = function(this: Date): string {
  return this.toISOString().split('T')[1].split('Z')[0];
}

function twelveHourConverter(hours: number, minutes: number) {
  const suffix = hours >= 12 ? "PM" : "AM";
  const convertedHours = hours - (hours > 12 ? 12 : 0) + (hours === 0 ? 12 : 0);
  const convertedMinutes = `${minutes < 10 ? "0" : ""}${minutes}`;
  return `${convertedHours}:${convertedMinutes} ${suffix}`;
}

function numberToMonth(month: number) {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Invalid month specified.";
  }
}

function numberToDay(day: number) {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid day specified.";
  }
}
