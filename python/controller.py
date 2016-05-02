from pathfinder import Pathfinder
from communications import Communications
from crontab import CronTab
import pymongo
from pymongo import MongoClient

class Controller():
    coms = Communications(0)
    running = False
    pathBuilt = False
    
    def __init__(self, cutDiameter, mowerLength, turnRadius, centerDistance, length, width, startingIndex):
        self.client = MongoClient()
        self.db = self.client.pidb
        self.collection = self.db.schedules
        self.finder = Pathfinder(cutDiameter, mowerLength, turnRadius, centerDistance, length, width)
        self.cutDiameter = cutDiameter
        self.mowerLength = mowerLength
        self.turnRadius = turnRadius
        self.centerDistance = centerDistance
        self.length = length
        self.width = width
        
    def buildPath(self):
        self.finder.buildBasePath()
        pathBuilt = True
        
    def startMower():
        coms.run()
        running = True
        # tell node that we started
        
    def interrupt(self, message, terminate):
        coms.interrupt(message, terminate)
        running = False
        
    def schedule(self):
        cron = CronTab()
        for schedule in self.collection.find():
            job  = cron.new(command='python /backyarbarber/python/controller.py startMower')
            min = schedule["time"]["minute"]
            hour = schedule["time"]["hour"]
            days = schedule["days"]
            dayString = ""
            if days["Sunday"]:
                dayString += ",0"
            elif days["Monday"]:
                dayString += ",1"
            elif days["Tuesday"]:
                dayString += ",2"
            elif days["Wednesday"]:
                dayString += ",3"
            elif days["Thursday"]:
                dayString += ",4"
            elif days["Friday"]:
                dayString += ",5"
            elif days["Saturay"]:
                dayString += ",6"
            if dayString[0] == ',':
                dayString = dayString[1:]
            job.minute.on(min)
            job.hour.on(hour)
            job.days.on(dayString)
            job.enable()