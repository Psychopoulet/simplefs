
"use strict";

// deps

const fs = require(require("path").join(__dirname, "extends.js"));

// promises

[

// extend
"copyFile", "directoryToString", "directoryToFile", "extractFiles", "filesToString", "filesToFile", "mkdirp", "rmdirp",

// classical
"access", "appendFile", "chmod", "chown", "close", "fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes", "link", "lstat", "mkdtemp", "open", "readdir", "readFile", "rename", "stat", "truncate", "utimes", "write", "writeFile"].forEach(name => {

	fs[name + "Prom"] = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return new Promise((resolve, reject) => {

			fs[name].apply(fs, args.concat([function () {
				for (var _len2 = arguments.length, subargs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					subargs[_key2] = arguments[_key2];
				}

				let err = subargs.shift();

				if (err) {
					reject(err);
				} else {
					resolve.apply(undefined, subargs);
				}
			}]));
		});
	};
});

fs.mkdirProm = dir => {

	return fs.isDirectoryProm(dir).then(exists => {

		if (exists) {
			return Promise.resolve();
		} else {

			return new Promise((resolve, reject) => {

				fs.mkdir(dir, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	});
};

fs.rmdirProm = dir => {

	return fs.isDirectoryProm(dir).then(exists => {

		if (!exists) {
			return Promise.resolve();
		} else {

			return new Promise((resolve, reject) => {

				fs.rmdir(dir, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	});
};

fs.unlinkProm = file => {

	return fs.isFileProm(file).then(exists => {

		if (!exists) {
			return Promise.resolve();
		} else {

			return new Promise((resolve, reject) => {

				fs.unlink(file, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	});
};

fs.realpathProm = (path, options) => {

	return new Promise((resolve, reject) => {

		fs.realpath(path, options ? options : null, (err, result) => {

			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

// module

module.exports = fs;