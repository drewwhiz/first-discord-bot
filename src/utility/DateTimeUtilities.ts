export class DateTimeUtilities {
  public static isCooldownInEffect(deadline: string): boolean {
    if (deadline == null) return false;
    if (deadline.length == 0) return false;
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return now < deadlineDate;
  }

  public static getFutureTimeUTCString(hours: number): string {
    const now = new Date();
    now.setHours(now.getHours() + hours);
    return now.toUTCString();
  }
}