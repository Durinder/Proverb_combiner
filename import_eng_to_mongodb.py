import json
import sys
import pymongo
import json
from pymongo import MongoClient, InsertOne

def valid_proverb(line: str) -> int:
    if len(line.strip()) > 2:
        return 1
    return 0

def get_proverbs() -> list:
    proverbs = []
    with open('raw_data_eng.txt') as f:
        for line in f:
            if valid_proverb(line):
                tmp = line.strip()
                proverb = tmp[0].upper() + tmp[1:]
                proverb += '.'
                proverbs.append({'content': proverb})
    return proverbs

if __name__=='__main__':
    client = pymongo.MongoClient("mongodb+srv://fullstack:" + str(sys.argv[1]) + "@cluster0.yfvnm.mongodb.net/Proverbs?retryWrites=true&w=majority")
    db = client.Proverbs
    collection = db.engs
    requesting = []

    proverbs = get_proverbs()
    for jsonObj in proverbs:
        requesting.append(InsertOne(jsonObj))

    result = collection.bulk_write(requesting)
    client.close()