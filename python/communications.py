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
        self.ser = serial.Serial(PORT, BAUD_RATE)
        # Create API object
        self.xbee = ZigBee(ser)
        self.threads = []
        self.startingGPS = ""
        self.path = self.collection.find().sort("index", pymongo.ASCENDING)
        self.index = startingIndex
        print("init coms")
    
    def run(self):      
        # spin out listening thread
        coms = threading.Thread(target=self.listen)
        threads.append(coms)
        coms.start()
        
    def listen(self):
        print("start listening")
        while True:
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
                #             version      |stat|bound         | target coords (x,y)                                         | timestamp        |degree
                self.send(('\x00\x00\x00\x00\x21\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'))
            elif status == 'G':
                # in progress
                # do not respond, continue
                print("continue")
            elif status == 'S':
                # destination reached
                #             version      |stat|bound         | target coords (x,y) | timestamp        |degree
                x = self.path[self.index]["inX"]
                y = self.path[self.index]["inY"]
                self.send(('\x00\x00\x00\x00\x46\x00\x00\x00\x00'+hex(x)+hex(y)+      '\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'))
                index += 1
            elif status == 'T':
                # tipped
                #             version      |stat|bound         | target coords (x,y)                                         | timestamp        |degree
                self.send(('\x00\x00\x00\x00\x21\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'))
            elif status == 'B':
                # blocked
                #             version      |stat|bound         | target coords (x,y)                                         | timestamp        |degree
                self.send(('\x00\x00\x00\x00\x21\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'))
        
    def send(self, message):
        print("send message: " + message)
        self.xbee.send("tx", dest_addr='\xFF\xFF', dest_addr_long='\x00\x13\xAZ\x00\x40\xE6\x5B\xBD', data=message)


'''if __name__ == '__main__':
    run(sys.argv)'''
