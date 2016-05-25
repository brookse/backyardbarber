# Ian Mahuta
# Pathfinder function v2.0

import pymongo
from datetime import datetime
from pymongo import MongoClient
import geopy
from geopy.distance import vincenty
import sys
from simpleGraph import *
from queue import *
from squareGrid import *

class Pathfinder:   
    def __init__(self, cutDiameter, mowerLength, turnRadius, centerDistance, length, width):
        self.path = []
        self.client = MongoClient()
        self.db = self.client.pidb
        self.collection = self.db.mapnodes
        self.hasMap = True # Will repopulate the database if False
        self.startId = -1
        self.endId = -1
        self.cutDiameter = 19
        self.mowerLength = 42
        self.turnRadius = 16.5
        self.centerDistance = 22.5
        self.length = 1200
        self.width = 1200
        self.graph = None
        print("init")
        
    def buildBasePath(self):
        #cutDiameter = 19
        #mowerLength = 42
        #turnRadius = 16.5
        #centerDistance = 22.5
        ascending = True
        blocked = False
        start = None
        print ("start " + str(datetime.now()))
        
        self.graph = GridWithWeights(self.length,self.width)
        
        self.collection.update_many({'edge':True},{'$set':{'edge':False}})
        # set all edge points
        result = self.collection.update_many({'inX':{'$lt':int(self.centerDistance)}, 'inY':{'$lt':int(self.centerDistance)}},{'$set':{'edge':True}})
        result = self.collection.update_many({'inX':{'$gt':int(self.width - self.centerDistance)}, 'inY':{'$gt':int(self.length - self.centerDistance)}},{'$set':{'edge':True}})
        edges = self.collection.find({'edge':True})
        
        self.collection.update_one({'inX':{'$eq':75}, 'inY':{'$eq':75}}, {'$set':{'blocked':True}})
        
        blockedItems = self.collection.find({'blocked':True})
        for item in blockedItems:
            result = self.collection.update_many({'inX':{'$lte':int(item['inX'] + self.centerDistance),'$gte':int(item['inX']-self.centerDistance)},'inY':{'$lte':int(item['inY'] + self.centerDistance),'$gte':int(item['inY'] - self.centerDistance)}},{'$set':{'edge':True}})
        
        edges = self.collection.find({'edge':True})
        #print ("edges: " + str(edges.count()))
        
        startingPoint = self.collection.find_one({'inX':int(self.centerDistance),'inY':int(self.centerDistance)})
        self.startId = startingPoint["_id"]
        
        #pathfile = open("path.txt", 'a')
        #pathfile.write("New path generated at: " + str(datetime.now()))
        
        invalidNodes = self.collection.find({"$or": [{"blocked": True}, {"edge": True}]})
        invalidTuples = []
        for invalidNode in invalidNodes:
            invalidTuples.append((invalidNode["inX"],invalidNode["inY"]))
        
        for x in range(int(self.centerDistance), self.width, self.cutDiameter-3):
            print(str(x) + " " + str(datetime.now()))
            if ascending:
                for y in range(int(self.centerDistance), self.length-int(self.centerDistance), (self.cutDiameter-3)):
                    if (x,y) not in invalidTuples:
                        if not blocked:
                            self.path.append((x,y))
                        else:
                            self.path.extend(self.handleBlocked(start, (x,y)))
                            blocked = False
                    elif not blocked:
                        start = self.path[-1]
                        blocked = True
                ascending = False
            else:
                for y in range(self.length-int(self.centerDistance)-1, int(self.centerDistance) +1, -(self.cutDiameter-3)):
                    if (x,y) not in invalidTuples:
                        if not blocked:
                            self.path.append((x,y))
                        else:
                            self.path.extend(self.handleBlocked(start, (x,y)))
                            blocked = False
                    elif not blocked:
                        start = self.path[-1]
                        blocked = True
                ascending = True
                
        print ("length: " + str(len(self.path)))
        print("Got points: " + str(datetime.now()))
        
        self.db.path.remove()
        
        for id in self.path:
            result = self.db.path.insert_one(
                {
                    "inX":id[0],
                    "inY":id[1],
                    "index":self.path.index(id)
                }
            )
                
        print("DB write finished: " + str(datetime.now()))
        #pathfile.close()
        
    def buildMap(size):
        if size == 0:
            size = 1200
        client = MongoClient()
        db = client.pidb
        collection = db.mapnodes
        for x in range(0, size):
            for y in range(0, size):
                result = collection.insert_one(
                    {
                        "inX":x,
                        "inY":y,
                        "blocked":False,
                        "covered":False,
                        "edge":False
                    }
                )
    
    def handleBlocked(self, node, next):
        print ("Handle blocked: " + str(node), str(next) + str(datetime.now()))
        if self.graph == None:
            self.graph = GridWithWeights(self.length,self.width)
        came_from, cost_so_far = self.a_star_search(self.graph, node, next)
        print ("Completed: " + str(datetime.now()))
        current = next
        path = [current]
        while current != node:
            current = came_from[current]
            path.append(current)
        path.reverse()
        return path
        
    def a_star_search(self, graph, start, goal): 
        frontier = PriorityQueue()
        frontier.put(start, 0)
        came_from = {}
        cost_so_far = {}
        came_from[start] = None
        cost_so_far[start] = 0
        nextNode = None
        new_cost = 0
        invalidNodes = self.collection.find({"$or": [{"blocked": True}, {"edge": True}]})
        invalidTuples = []
        for node in invalidNodes:
            invalidTuples.append((node["inX"],node["inY"]))
        
        while not frontier.empty():
            current = frontier.get()
            
            if current == goal:
                break
            
            for next in graph.neighbors(current):
                if next in invalidTuples:
                    new_cost = cost_so_far[current] + self.length
                else:
                    new_cost = cost_so_far[current] + graph.cost(current, next)
                if next not in cost_so_far or new_cost < cost_so_far[next]:
                    cost_so_far[next] = new_cost
                    priority = new_cost + self.heuristic(goal, next)
                    frontier.put(next, priority)
                    came_from[next] = current
        
        return came_from, cost_so_far
    
    def heuristic(self, a, b):
        (x1, y1) = a
        (x2, y2) = b
        return abs(x1 - x2) + abs(y1 - y2)


