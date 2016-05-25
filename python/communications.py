from xbee import XBee,ZigBee
import serial
import threading
import sys
import pymongo
from pymongo import MongoClient

class Communications():
    def __init__(self, startingIndex):
        self.client = MongoClient()
        self.db = self.client.pidb
        self.collection = self.db.path
        # set up serial
        self.PORT = '/dev/ttyAMA0'
        self.BAUD_RATE = 9600
        self.ser = serial.Serial(self.PORT, self.BAUD_RATE)
        # Create API object
        self.xbee = ZigBee(self.ser)
        self.threads = []
        self.startingGPS = ""
        self.path = [(0.0,0.0),(0.0,1.0),(0.0,2.0),(0.0,3.0),(0.0,5.0),(10.0,10.0)]#self.collection.find().sort("index", pymongo.ASCENDING)
        self.index = startingIndex
        self.interrupted = False
        self.terminated = False
        print("init coms")
    
    def run(self):      
        # spin out listening thread
        coms = threading.Thread(target=self.listen)
        self.threads.append(coms)
        coms.start()
        
    def listen(self):
        print("start listening")
        while self.terminated == False:
            try:
                response = "r"
                response = self.xbee.wait_read_frame()
                self.process(response)
                    
            except KeyboardInterrupt:
                break
        print("\ndone listening")
        
    def process(self, response):
        if response == "r":
            bytes1 = '\x46\x46\x46\x46\x46\x46\x46\x46\x46\x46\x46\x46\x46\x46\x46\x46'
            self.send(bytes1)
            print self.index
            if self.index >= len(self.path):
                self.terminated = True
                
        if response['name'] != "rx_explicit": # otherwise ack packet
            #normal packet, message = bytestring
            message = response['data'].decode('utf-8')
            print ("message: " + str(message))
            version = message[:4]
            print ("version: " + str(int(version)))
            status = message[4]
            print ("status: " + str(status))
            if status == '?':
                # error
                #                        version      |stat |bound              | target coords (x,y)                                                          | timestamp          |degree
                bytes = '\x00\x00\x00\x00\x21\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
                self.send(bytes)
            elif status == 'G':
                # in progress
                # do not respond, continue
                #                        version      |stat |bound              | target coords (x,y)                                                          | timestamp          |degree
                bytes = '\x00\x00\x00\x00\x43\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
                self.send(bytes)
            elif status == 'S':
                # destination reached
                #             version      |stat|bound         | target coords (x,y) | timestamp        |degree
                x = self.path[self.index][0]#["inX"]
                y = self.path[self.index][1]#["inY"]
                print(str(x) + ", " +str(y))
                #                        version      |stat |bound              | target coords (x,y)                                                          
                
                bytes1 = '\x00\x00\x00\x00\x46\x00\x00\x00\x00'
                print(str(x).encode("gbk"))
                print(str(y).encode("gbk"))
                bytes1 = bytes1+x
                bytes1 = bytes1+y
                #                   timestamp          |degree
                bytes2 = '\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00'
                bytes1 = bytes1+bytes2
                self.send(bytes1)
                if self.interrupted == True:
                    self.interrupted = False
                else:
                    self.index += 1
                    if iself.ndex >= len(self.path):
                        self.terminated = True
            elif status == 'T':
                # tipped
                #                        version      |stat |bound              | target coords (x,y)                                                          | timestamp          |degree
                bytes = '\x00,\x00,\x00,\x00,\x21,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00'
                self.send(bytes)
            elif status == 'B':
                # blocked
                #                        version      |stat |bound              | target coords (x,y)                                                          | timestamp          |degree
                bytes = '\x00,\x00,\x00,\x00,\x21,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00,\x00'
                self.send(bytes)
            else:
                # unknown status
                bytes1 = '\x00\x00\x00\x00\x21'
                self.send(bytes1)
        else:
            print "Ack packet"
        
    def send(self, message):
        print("send message: " + message)                                                         
        self.xbee.send("tx", dest_addr='\xFF\xFF', dest_addr_long='\x00,\x13,\xA2,\x00,\x40,\xE6,\x5B,\xBD', data=message)
        
    def interrupt(self, message, terminate):
        self.interrupted = True
        if terminate == True:
            self.terminated = True
        self.send(self, message)

