#!/usr/bin/python3

import pymongo
import json


def connectToDb() -> pymongo.database.Database:
    try:
        authJsonFile = open('../auth/auth.json')
    except:
        print("Unable to locate the JSON auth file.")
        return None

    try:
        data = json.load(authJsonFile)
    except:
        print("Auth file is not properly formatted JSON.")
        return None

    client = pymongo.MongoClient(
        data["dbUri"],
        username=data["mongoUserName"],
        password=data["mongoPassword"],
        authSource=data["dbName"]
    )

    db = client[data["dbName"]]
    return db
