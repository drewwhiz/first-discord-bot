#!/usr/bin/python3

import connectToDb

db = connectToDb.connectToDb()
if db is not None:
    eventName = str(input("Enter the name of the event to delete: "))

    if db.events.count_documents({"name": eventName}) > 0:
        db.events.delete_one({"name": eventName})
        print("Deleted event named %s." % (eventName))
    else:
        print("No event named %s found." % (eventName))
