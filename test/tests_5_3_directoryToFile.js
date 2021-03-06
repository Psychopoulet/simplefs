/*
	eslint no-sync: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const assert = require("assert");
	const { homedir } = require("os");

	// locals
	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const DIR_TESTBASE = join(homedir(), "testlvl1");
		const FILE_TEST = join(DIR_TESTBASE, "test.txt");
		const FILE_TEST2 = join(DIR_TESTBASE, "test2.txt");
	const DIR_TESTBASE2 = join(homedir(), "testlvl2");

// tests

describe("directoryToFile", () => {

	before(() => {

		if (!fs.isDirectorySync(DIR_TESTBASE)) {
			fs.mkdirSync(DIR_TESTBASE);
		}

			if (!fs.isFileSync(FILE_TEST)) {
				fs.writeFileSync(FILE_TEST, "test", "utf8");
			}

		if (!fs.isDirectorySync(DIR_TESTBASE2)) {
			fs.mkdirSync(DIR_TESTBASE2);
		}

	});

	after(() => {

		return fs.rmdirpProm(DIR_TESTBASE).then(() => {
			return fs.rmdirpProm(DIR_TESTBASE2);
		});

	});

	describe("sync", () => {

		afterEach(() => {

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

		});

		it("should check missing value", () => {

			assert.throws(() => {
				fs.directoryToFileSync();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToFileSync(__dirname);
			}, ReferenceError, "check missing \"file\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.directoryToFileSync(false, __filename);
			}, TypeError, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToFileSync(__dirname, false);
			}, TypeError, "check invalid \"file\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.directoryToFileSync("", __filename);
			}, Error, "check empty \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToFileSync(__dirname, "");
			}, Error, "check empty \"file\" value does not throw an error");

		});

		it("should check inexistant directory", () => {

			assert.throws(() => {
				fs.directoryToFileSync(join(__dirname, "rgvservseqrvserv"));
			}, "wrong \"directory\" does not throw an error");

		});

		it("should concat nothing", () => {

			assert.doesNotThrow(() => {
				fs.directoryToFileSync(DIR_TESTBASE2, FILE_TEST2);
			}, Error, "test files cannot be concatened");

			assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "test files cannot be concatened");

		});

		it("should concat test files into a file", () => {

			assert.doesNotThrow(() => {
				fs.directoryToFileSync(DIR_TESTBASE, FILE_TEST2);
			}, Error, "test files cannot be concatened");

			assert.strictEqual("test", fs.readFileSync(FILE_TEST2, "utf8"), "test files cannot be concatened");

		});

		it("should concat test files with pattern into a file", () => {

			assert.doesNotThrow(() => {
				fs.directoryToFileSync(DIR_TESTBASE, FILE_TEST2, " -- [{{filename}}] -- ");
			}, Error, "test files cannot be concatened");

			assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(FILE_TEST2, "utf8"), "test files with pattern cannot be concatened");

		});

	});

	describe("async", () => {

		afterEach(() => {

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

		});

		it("should check missing value", () => {

			assert.throws(() => {
				fs.directoryToFile();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname);
			}, ReferenceError, "check missing \"file\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname, __filename);
			}, ReferenceError, "check missing value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.directoryToFile(false, __filename, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname, false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"file\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname, __filename, false);
			}, TypeError, "check invalid value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.directoryToFile("", __filename, () => {
					// nothing to do here
				});
			}, Error, "check empty \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname, "", () => {
					// nothing to do here
				});
			}, Error, "check empty \"file\" value does not throw an error");

		});

		it("should check inexistant directory", (done) => {

			fs.directoryToFile(join(__dirname, "rgvservseqrvserv"), __filename, (err) => {

				assert.strictEqual(true, err instanceof Error, "check wrong \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check wrong \"directory\" value does not generate a valid error");

				done();

			});

		});

		it("should concat nothing", (done) => {

			fs.directoryToFile(DIR_TESTBASE2, FILE_TEST2, (err) => {

				assert.strictEqual(null, err, "empty directory cannot be concatened");
				assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "empty directory cannot be concatened");

				done();

			});

		});

		it("should concat test files into a file", (done) => {

			fs.directoryToFile(DIR_TESTBASE, FILE_TEST2, (err) => {

				assert.strictEqual(null, err, "concat test files generate an error");
				assert.strictEqual("string", typeof fs.readFileSync(FILE_TEST, "utf8"), "test files cannot be concatened");

				done();

			});

		});

		it("should concat test files with pattern into a file", (done) => {

			fs.directoryToFile(DIR_TESTBASE, FILE_TEST2, " -- [{{filename}}] -- ", (err) => {

				assert.strictEqual(null, err, "test files with pattern cannot be concatened");

				fs.readFile(FILE_TEST2, "utf8", (_err, content) => {

					assert.strictEqual(null, _err, "test files with pattern cannot be concatened");
					assert.strictEqual(" -- [test.txt] -- test", content, "test files with pattern cannot be concatened");

					done();

				});

			});

		});

	});

	describe("promise", () => {

		afterEach(() => {

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

		});

		it("should check missing value", (done) => {

			fs.directoryToFileProm().then(() => {
				done("check missing \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing \"directory\" value does not generate a valid error");

				fs.directoryToFileProm(__dirname).then(() => {
					done("check missing \"file\" value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof ReferenceError, "check missing \"file\"  value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check missing \"file\"  value does not generate a valid error");

					done();

				});

			});

		});

		it("should check invalid value", (done) => {

			fs.directoryToFileProm(false, __filename).then(() => {
				done("check invalid \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid \"directory\" value does not generate a valid error");

				fs.directoryToFileProm(__dirname, false).then(() => {
					done("check invalid \"file\" value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof TypeError, "check invalid \"file\" value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check invalid \"file\" value does not generate a valid error");

					done();

				});

			});

		});

		it("should check empty value", (done) => {

			fs.directoryToFileProm("", __filename).then(() => {
				done("check empty \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty \"directory\" value does not generate a valid error");

				fs.directoryToFileProm(__dirname, "").then(() => {
					done("check empty \"file\" value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof Error, "check empty \"file\" value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check empty \"file\" value does not generate a valid error");

					done();

				});

			});

		});

		it("should check inexistant directory", (done) => {

			fs.directoryToFileProm(join(__dirname, "rgvservseqrvserv"), __filename).then(() => {
				done("wrong \"directory\" does not throw an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "\"wrong \"directory\" does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "\"wrong \"directory\" does not generate a valid error");

				done();

			});

		});

		it("should concat nothing", () => {

			return fs.directoryToFileProm(DIR_TESTBASE2, FILE_TEST2).then(() => {
				assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "empty directory cannot be concatened");
				return Promise.resolve();
			});

		});

		it("should concat test files directory into a file", () => {

			return fs.directoryToFileProm(DIR_TESTBASE, FILE_TEST2).then(() => {

				return fs.readFileProm(FILE_TEST2, "utf8").then((content) => {

					assert.strictEqual("test", content, "test files directory cannot be concatened");
					return Promise.resolve();

				});

			});

		});

		it("should concat test files with pattern into a file", () => {

			return fs.directoryToFileProm(DIR_TESTBASE, FILE_TEST2, " -- [{{filename}}] -- ").then(() => {

				return fs.readFileProm(FILE_TEST2, "utf8").then((content) => {

					assert.strictEqual(" -- [test.txt] -- test", content, "test files directory cannot be concatened");
					return Promise.resolve();

				});

			});

		});

	});

});
