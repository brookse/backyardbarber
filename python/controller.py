from pathfinder import Pathfinder
from communications import Communications
from crontab import CronTab
import pymongo
from pymongo import MongoClient

class Controller():
    coms = Communications(0)
    running = False
    
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
        self.pathBuilt = (self.db.path.find().count > 0)
        
    def buildPath(self):
        self.finder.buildBasePath()
        self.pathBuilt = True
        
    def startMower(self):
        if self.pathBuilt == False:
            self.buildPath()
        if Controller.running == False:
            Controller.coms.run()
            Controller.running = True
        # tell node that we started
        
    def interrupt(self, message, terminate):
        Controller.coms.interrupt(message, terminate)
        Controller.running = False
        
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