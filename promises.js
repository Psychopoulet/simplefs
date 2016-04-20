
"use strict";

// const

const fs = require(require('path').join(__dirname, 'extends.js'));

// module

	// simplefs

	fs.isFileProm = function(file) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isFile(file, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {
						resolve(exists);
					}

				});
	
			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.isDirectoryProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {
				
				fs.isDirectory(dir, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {
						resolve(exists);
					}

				});
		
			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.mkdirpProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {
				
				fs.mkdirp(dir, function(err) {

					if (err) {
						reject(err);
					}
					else {
						resolve();
					}

				});
	
			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.rmdirpProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {
				
				fs.rmdirp(dir, function(err) {

					if (err) {
						reject(err);
					}
					else {
						resolve();
					}

				});
	
			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.concatFilesProm = function(files, encoding, separator) {

		return new Promise(function(resolve, reject) {

			try {

				fs.concatFiles(files, (encoding) ? encoding : null, (separator) ? separator : null, function(err, content) {

					if (err) {
						reject(err);
					}
					else {
						resolve(content);
					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.copyProm = function(origin, target) {

		return new Promise(function(resolve, reject) {

			try {

				fs.copy(origin, target, function(err) {

					if (err) {
						reject(err);
					}
					else {
						resolve();
					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.mooveProm = function(origin, target) {

		return new Promise(function(resolve, reject) {

			try {

				fs.moove(origin, target, function(err) {

					if (err) {
						reject(err);
					}
					else {
						resolve();
					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	// classical

	fs.writeFileProm = function(file, message, options) {

		return new Promise(function(resolve, reject) {

			try {

				fs.writeFile(file, message, (options) ? options : null, function(err) {

					if (err) {
						reject((err.message) ? err.message : err);
					}
					else {
						resolve();
					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.appendFileProm = function(file, message, options) {

		return new Promise(function(resolve, reject) {

			try {

				fs.appendFile(file, message, (options) ? options : null, function(err) {

					if (err) {
						reject((err.message) ? err.message : err);
					}
					else {
						resolve();
					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.readFileProm = function(file, options) {

		return new Promise(function(resolve, reject) {

			try {

				fs.readFile(file, (options) ? options : null, function(err, data) {

					if (err) {
						reject((err.message) ? err.message : err);
					}
					else {
						resolve(data);
					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.unlinkProm = function(file) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isFile(file, function(err, exists) {

					if (err) {
						reject(err);
					}
					else if (!exists) {
						resolve();
					}
					else {

						fs.unlink(file, function(err) {

							if (err) {
								reject((err.message) ? err.message : err);
							}
							else {
								resolve();
							}

						});

					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

module.exports = fs;
