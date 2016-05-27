var express = require('express'),
    router = express.Router(),
    PythonShell = require('python-shell');

/* Stop the mower */
router.get('/:id/stop', function(req, res) {
  var pyshell = new PythonShell('/python/server.py', {
    mode: 'text'
  });

  pyshell.send('interrupt');

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
  var pyshell = new PythonShell('/python/server.py', {
    mode: 'text'
  });

  pyshell.send('startMower');

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
  var pyshell = new PythonShell('/python/server.py', {
    mode: 'text'
  });
  
  pyshell.send('buildPath');

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
