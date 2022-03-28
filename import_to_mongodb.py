import json
import sys
import pymongo
import json
from pymongo import MongoClient, InsertOne

def valid_proverb(line: str) -> int:
    trimmed = line.split(' (', 1)[0]
    if len(trimmed.split(',')) == 2 and len(trimmed.split(';')) == 1 and len(trimmed.split('.')) == 2 and len(trimmed.split(':')) == 1:
        return 1
    return 0

def get_proverbs() -> list:
    proverbs = []
    with open('raw_data.txt') as f:
        for line in f:
            if valid_proverb(line):
                proverb = line.split(' (', 1)[0].strip().split(',')
                proverb[1] = proverb[1].strip()
                location = line.split(') (')
                if len(location) == 2:
                    location = location[0].split('(')[1]
                else:
                    location = ""
                proverbs.append({'content': proverb, 'location': location})
    return proverbs

if __name__=='__main__':
    client = pymongo.MongoClient("mongodb+srv://fullstack:" + str(sys.argv[1]) + "@cluster0.yfvnm.mongodb.net/Proverbs?retryWrites=true&w=majority")
    db = client.Proverbs
    collection = db.fins
    requesting = []

    proverbs = get_proverbs()
    for jsonObj in proverbs:
        requesting.append(InsertOne(jsonObj))

    result = collection.bulk_write(requesting)
    client.close()