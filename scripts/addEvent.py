#!/usr/bin/python3

import connectToDb
import datetime

db = connectToDb.connectToDb()
if db is not None:
    eventName = str(input("Enter the name of the event: "))

    startDate = None
    endDate = None
    while startDate is None or endDate is None:

        while startDate is None:
            startDateString = str(input("Enter the start date (YYYY-MM-DD): "))
            startTimeString = str(input("Enter the start time (HH:mm:ss): "))

            try:
                startDate = datetime.datetime.fromisoformat(
                    "%sT%s" % (startDateString, startTimeString))
            except ValueError:
                print("You entered %s for the date and %s for the time." %
                      (startDateString, startTimeString))
                print("The date must be in the format 'YYYY-MM-DD.'")
                print("The time must be in the format 'HH:mm:ss.'")
                print("Please try again.")

        while endDate is None:
            endDateString = str(input("Enter the end date (YYYY-MM-DD): "))
            endTimeString = str(input("Enter the end time (HH:mm:ss): "))

            try:
                endDate = datetime.datetime.fromisoformat(
                    "%sT%s" % (endDateString, endTimeString))
            except ValueError:
                print("You entered %s for the date and %s for the time." %
                      (endDateString, endTimeString))
                print("The date must be in the format 'YYYY-MM-DD.'")
                print("The time must be in the format 'HH:mm:ss.'")
                print("Please try again.")

        if startDate >= endDate:
            print("You entered a start datetime of %s and an end datetime of %s." % (
                startDate.isoformat(), endDate.isoformat()))
            print("The start datetime must come before the end datetime.")
            print("Please try again.")
            startDate = None
            endDate = None

    location = str(input("Enter the event's location: "))

    ftc = None
    while ftc is None:
        ftc = str(
            input("If the event is FTC specific, enter 'y,' otherwise enter 'n': ")).lower()

        if len(ftc) < 1 or (ftc[0] != 'y' and ftc[0] != 'n'):
            print("Invalid entry. Please try again.")
            ftc = None

    if db.events.count_documents({"name": eventName}) > 0:
        print("There is already an event with the name %s." % (eventName))
        print("Please remove the existing event or rename the event.")
    else:
        db.events.insert_one({
            "name": eventName,
            "startDate": startDate,
            "endDate": endDate,
            "location": location,
            "ftcSpecific": True if ftc == 'y' else False
        })
        print("Successfully added new event (%s)!" % (eventName))
