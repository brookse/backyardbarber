import sys
from controller import Controller

controls = Controller(19,42,16.5,22.5,1200,1200,0)
for line in sys.stdin:
    controls.controller.startMower()
    print("mower started")
