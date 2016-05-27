var express = require('express'),
    router = express.Router(),
    PythonShell = require('python-shell');

var pyoption = '-u';
var pypath = '/usr/bin/python';

/* Stop the mower */
router.get('/:id/stop', function(req, res) {
  console.log('start stopping shell');
  var pyshell = new PythonShell('stopMower.py', {
    mode: 'text',
    pythonPath: pypath,
    pythonOptions: [pyoption],
    scriptPath: '././python'
  });
  console.log('stopping shell started');

  pyshell.send('interrupt').end(function(err) {
    if(err) console.log('err:',err);
  });

  console.log('stop mower sent');

  pyshell.on('interrupt', function(message) {
    console.log('interrupt:',message);

    if(message == 'starting') {
      console.log('interrupt starting');
    } else if(message == 'complete') {
      console.log('interrupt complete');

      return res.status(200).json({
        status: 'interrupt complete',
        info: {
          status: 'interrupt complete',
          fullStatus: 'The lawnmower has completely stopped'
        }
      });
    }
  });
});

/* Start the mower */
router.get('/:id/start', function(req, res) {
  console.log('start starting shell');
  var pyshell = new PythonShell('startMower.py', {
    mode: 'text',
    pythonPath: pypath,
    pythonOptions: [pyoption],
    scriptPath: '././python'
  });

  console.log('starting shell started');

  pyshell.send('startMower').end(function(err) {
    console.log('err:',err);
  });

  console.log('start mower sent');

  pyshell.on('startMower', function(message) {
    console.log('startMower:',message);

    if(message == 'starting') {
      console.log('mower start starting');
    } else if(message == 'complete') {
      console.log('mower start complete');

      return res.status(200).json({
        status: 'mower start complete',
        info: {
          status: 'mower start complete',
          fullStatus: 'The lawnmower has started'
        }
      });
    }
  });
});

/* Notify of yard update */
router.get('/:id/updateYard', function(req, res) {
  console.log('start build path shell');
  var pyshell = new PythonShell('buildPath.py', {
    mode: 'text',
    pythonPath: pypath,
    pythonOptions: [pyoption],
    scriptPath: '././python'
  });
  console.log('stop build path shell');

  pyshell.send('buildPath').end(function(err) {
    console.log('err:',err);
  });

  console.log('build path sent');

  pyshell.on('buildPath', function(message) {
    console.log('buildPath:',message);

    if(message == 'starting') {
      console.log('build path starting');
    } else if(message == 'complete') {
      console.log('build path complete');

      return res.status(200).json({
        status: 'build path complete',
        info: {
          status: 'build path complete',
          fullStatus: 'The lawnmower has finished building the path. It can now be started!'
        }
      });
    }
  });
});

/* Notify of schedule updated */
router.get('/:id/updateSchedules', function(req, res) {
  var pyshell = new PythonShell('/python/server.py', {
    mode: 'text'
  });

  pyshell.send('schedule');

  pyshell.on('schedule', function(message) {
    console.log('schedule:',message);

    if(message == 'starting') {
      console.log('scheduling starting');
    } else if(message == 'complete') {
      console.log('scheduling complete');

      return res.status(200).json({
        status: 'scheduling complete',
        info: {
          status: 'scheduling complete',
          fullStatus: 'The lawnmower has completed scheduling. These will now be ran automatically!'
        }
      });
    }
  });
});

module.exports = router;
