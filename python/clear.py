import pymongo
from pymongo import MongoClient

client = MongoClient()
print client.backyardbarber.currentMap.count()
client.backyardbarber.currentMap.remove()
print "empty"
