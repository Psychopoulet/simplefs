
"use strict";

// deps

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fs = require("fs");

var _require = require("path"),
    basename = _require.basename,
    join = _require.join;

var _require2 = require(join(__dirname, "_isFile.js")),
    isFile = _require2.isFile,
    isFileSync = _require2.isFileSync;

// private

// methods

/**
* Specific to "filesToString" method, read all files content
* @param {Array} files : files to read
* @param {string} encoding : encoding to use
* @param {string} separator : used to separate content (can be "")
* @param {string} content : content read
* @param {callback} callback : operation's result
* @returns {Promise} Operation's result
*/


function _readContent(files, encoding, separator, content, callback) {

	process.nextTick(function () {

		if (0 >= files.length) {
			callback(null, content);
		} else {

			var file = files.shift().trim();

			isFile(file, function (err, exists) {

				if (err) {
					callback(err);
				} else if (!exists) {
					callback(new Error("\"" + file + "\" does not exist"));
				} else {

					fs.readFile(file, encoding, function (_err, filecontent) {

						if (_err) {
							callback(_err);
						} else if (-1 < separator.indexOf("{{filename}}")) {

							_readContent(files, encoding, separator, content + separator.replace("{{filename}}", basename(file)) + filecontent, callback);
						} else {

							_readContent(files, encoding, separator, "" === content ? filecontent : content + separator + filecontent, callback);
						}
					});
				}
			});
		}
	});
}

/**
* Async filesToString
* @param {Array} files : files to read
* @param {string} encoding : encoding
* @param {string} separator : files separator
* @param {function|null} callback : operation's result
* @returns {void}
*/
function _filesToString(files, encoding, separator, callback) {

	if ("undefined" === typeof files) {
		throw new ReferenceError("missing \"files\" argument");
	} else if ("object" !== (typeof files === "undefined" ? "undefined" : _typeof(files)) || !(files instanceof Array)) {
		throw new TypeError("\"files\" argument is not an Array");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator && "undefined" === typeof encoding) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator && "function" !== typeof encoding) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		var _callback = callback;

		if ("undefined" === typeof _callback) {

			if ("undefined" === typeof separator) {
				_callback = encoding;
			} else {
				_callback = separator;
			}
		}

		process.nextTick(function () {

			_readContent(files, "string" === typeof encoding ? encoding.trim() : "utf8", "string" === typeof separator ? separator : " ", "", _callback);
		});
	}
}

// module

module.exports = {

	// async version

	"filesToString": _filesToString,

	// promise version

	"filesToStringProm": function filesToStringProm(files, encoding, separator) {

		return new Promise(function (resolve, reject) {

			_filesToString(files, encoding, separator, function (err, content) {
				return err ? reject(err) : resolve(content);
			});
		});
	},

	// sync version

	"filesToStringSync": function filesToStringSync(files, encoding, separator) {

		if ("undefined" === typeof files) {
			throw new ReferenceError("missing \"files\" argument");
		} else if ("object" !== (typeof files === "undefined" ? "undefined" : _typeof(files)) || !(files instanceof Array)) {
			throw new TypeError("\"files\" argument is not an Array");
		} else {

			var _encoding = "string" === typeof encoding ? encoding : null;
			var _separator = "string" === typeof separator ? separator : " ";

			var result = "";

			files.forEach(function (file, key) {

				var _file = file.trim();

				if (isFileSync(_file)) {

					if (-1 < _separator.indexOf("{{filename}}")) {
						result += _separator.replace("{{filename}}", basename(_file)) + fs.readFileSync(_file, _encoding);
					} else {
						result += 0 < key ? _separator + fs.readFileSync(_file, _encoding) : fs.readFileSync(_file, _encoding);
					}
				}
			});

			return result;
		}
	}

};