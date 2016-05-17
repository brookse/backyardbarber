import sys, zerorpc

class ServerRPC(object):
    '''pass the method a name, it replies "Hello name!"'''
    def hello(self, name):
        return "Hello, {0}!".format(name)

def main():
    s = zerorpc.Server(ServerRPC())
    s.bind("tcp://*:4242")
    s.run()

if __name__ == "__main__" : main()