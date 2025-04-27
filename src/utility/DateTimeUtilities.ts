export class DateTimeUtilities {
  public static isCooldownInEffect(deadline: Date): boolean {
    if (deadline == null) return false;
    return new Date() < deadline;
  }

  public static getFutureTime(hours: number): Date {
    const now = new Date();
    now.setHours(now.getHours() + hours);
    return now;
  }
}