from controller import Controller
from communications import Communications

#coms = Communications(0)
#coms.run()
controller = Controller(19,42,16.5,22.5,1200,1200,0)
#controller.buildPath()
controller.controller.startMower()
