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
        self.path = self.collection.find().sort("index", pymongo.ASCENDING)
        self.index = startingIndex
        self.interrupted = False
        self.terminated = False
        print("init coms")
    
    def run(self):      
        # spin out listening thread
        coms = threading.Thread(target=self.listen)
        threads.append(coms)
        coms.start()
        
    def listen(self):
        print("start listening")
        while self.terminated == False:
            try:
                response = "r"
                response = self.xbee.wait_read_frame()
                if response!= "r":
                    self.process(response)
                    
            except KeyboardInterrupt:
                break
        print("\ndone listening")
        
    def process(self, response):
        if response['name'] != "rx_explicit": # otherwise ack packet
            #normal packet, message = bytestring
            message = response['data'].decode('utf-8')
            status = message[4]
            if status == '?':
                # error
                #                        version      |stat |bound              | target coords (x,y)                                                          | timestamp          |degree
                bytes = bytearray([0x00,0x00,0x00,0x00,0x21,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00])
                self.send(bytes)
            elif status == 'G':
                # in progress
                # do not respond, continue
                #                        version      |stat |bound              | target coords (x,y)                                                          | timestamp          |degree
                bytes = bytearray([0x00,0x00,0x00,0x00,0x43,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00])
                self.send(bytes)
            elif status == 'S':
                # destination reached
                #             version      |stat|bound         | target coords (x,y) | timestamp        |degree
                x = self.path[self.index]["inX"]
                y = self.path[self.index]["inY"]
                print(str(x) + ", " +str(y))
                #                        version      |stat |bound              | target coords (x,y)                                                          
                
                bytes = bytearray([0x00,0x00,0x00,0x00,0x46,0x00,0x00,0x00,0x00])
                bytes.append(bytes(x))
                bytes.append(bytes(y))
                #                   timestamp          |degree
                bytes2 = bytearray([0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00])
                bytes.append(bytes2)
                self.send(bytes)
                if self.interrupted == True:
                    self.interrupted = False
                else:
                    index += 1
                    if index >= self.path.length:
                        terminated = True
            elif status == 'T':
                # tipped
                #                        version      |stat |bound              | target coords (x,y)                                                          | timestamp          |degree
                bytes = bytearray([0x00,0x00,0x00,0x00,0x21,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00])
                self.send(bytes)
            elif status == 'B':
                # blocked
                #                        version      |stat |bound              | target coords (x,y)                                                          | timestamp          |degree
                bytes = bytearray([0x00,0x00,0x00,0x00,0x21,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00])
                self.send(bytes)
        
    def send(self, message):
        print("send message: " + message)
        self.xbee.send("tx", dest_addr=bytearray([0xFF,0xFF]) dest_addr_long=bytearray([0x00,0x13,0xAZ,0x00,0x40,0xE6,0x5B,0xBD]), data=message)
        
    def interrupt(self, message, terminate):
        self.interrupted = True
        if terminate == True:
            self.terminated = True
        self.send(self, message)

