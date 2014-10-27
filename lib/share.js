// Generated by CoffeeScript 1.6.3
(function() {
  var command, machine,
    __slice = [].slice;

  machine = require('./machine');

  command = require('./command');

  /*
  	* Lists folders.
  	*
  	* @param {function(?err, result)} callback
  */


  exports.list_folders = function(vm, callback) {
    return machine.info(vm, function(err, info) {
      var folders, id, key, mappings, match, path, property, type, val;
      if (err) {
        return callback(err);
      }
      mappings = {};
      folders = {};
      for (key in info) {
        val = info[key];
        match = key.match(/SharedFolder(Name|Path)(Machine|Transient)Mapping(\d+)/);
        if (!match) {
          continue;
        }
        property = match[1].toLowerCase();
        type = match[2].toLowerCase();
        id = match[3];
        path = "" + type + id;
        if (folders[type] == null) {
          folders[type] = {};
        }
        switch (property) {
          case 'name':
            mappings[path] = val;
            break;
          case 'path':
            folders[type][mappings[path]] = val;
        }
      }
      if (callback) {
        return callback(null, folders);
      }
    });
  };

  /*
  	* Adds machine folder.
  	*
  	* @param {string} vm
  	* @param {string} name
  	* @param {string} path
  	* @param {boolean} readonly
  	* @param {boolean} automount
  	* @param {function(?err)} callback
  */


  exports.add_machine_folder = function(vm, name, path, readonly, automount, callback) {
    var optionals;
    optionals = [];
    if (readonly) {
      optionals.push('--readonly');
    }
    if (automount) {
      optionals.push('--automount');
    }
    return command.exec.apply(command, ['sharedfolder', 'add', vm, '--name', name, '--hostpath', path].concat(__slice.call(optionals), [function(err, code, output) {
      if (err) {
        return callback(err);
      }
      if (code > 0) {
        return callback(new Error("cannot add machine folder " + name + " on " + vm));
      }
      if (callback) {
        return callback();
      }
    }]));
  };

  /*
  	* Removes machine folder.
  	*
  	* @param {string} vm
  	* @param {string} name
  	* @param {function(?err)} callback
  */


  exports.remove_machine_folder = function(vm, name, callback) {
    return command.exec('sharedfolder', 'remove', vm, '--name', name, function(err, code, output) {
      if (err) {
        return callback(err);
      }
      if (code > 0) {
        return callback(new Error("cannot remove machine folder " + name + " on " + vm));
      }
      if (callback) {
        return callback();
      }
    });
  };

  /*
  	* Adds transient folder.
  	*
  	* @param {string} vm
  	* @param {string} name
  	* @param {string} path
  	* @param {boolean} readonly
  	* @param {boolean} automount
  	* @param {function(?err)} callback
  */


  exports.add_transient_folder = function(vm, name, path, readonly, automount, callback) {
    var optionals;
    optionals = [];
    if (readonly) {
      optionals.push('--readonly');
    }
    if (automount) {
      optionals.push('--automount');
    }
    return command.exec.apply(command, ['sharedfolder', 'add', vm, '--name', name, '--hostpath', path, '--transient'].concat(__slice.call(optionals), [function(err, code, output) {
      if (err) {
        return callback(err);
      }
      if (code > 0) {
        return callback(new Error("cannot add transient folder " + name + " on " + vm));
      }
      if (callback) {
        return callback();
      }
    }]));
  };

  /*
  	* Removes transient folder.
  	*
  	* @param {string} vm
  	* @param {string} name
  	* @param {function(?err)} callback
  */


  exports.remove_transient_folder = function(vm, name, callback) {
    return command.exec('sharedfolder', 'remove', vm, '--name', name, '--transient', function(err, code, output) {
      if (err) {
        return callback(err);
      }
      if (code > 0) {
        return callback(new Error("cannot remove transient folder " + name + " on " + vm));
      }
      if (callback) {
        return callback();
      }
    });
  };

}).call(this);