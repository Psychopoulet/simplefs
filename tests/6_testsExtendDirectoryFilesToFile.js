"use strict";

// deps

	/*const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtestBase = path.join(__dirname, "testlvl1"),
			_dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4"),
		_filetest = path.join(__dirname, "test.txt"),
		_filetest2 = path.join(__dirname, "test2.txt");*/

// tests

/*
describe("directoryFilesToFile", () => {

	let directoryTests = path.join(__dirname, "test"),
		test1 = path.join(directoryTests, "test1.txt"), test2 = path.join(directoryTests, "test2.txt");

	describe("sync", () => {

		before(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });
		after(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryFilesToFileSync(false, false); }, Error, "check invalid value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFileSync(directoryTests, false); }, Error, "not existing directory cannot be concatened");
		});

		it("should concat nothing", () => {
			assert.throws(() => { fs.directoryFilesToFileSync(directoryTests, _filetest); }, Error, "not existing directory cannot be concatened");
		});

		it("should concat test files", () => {

			fs.mkdirpSync(directoryTests);
			fs.directoryFilesToFileSync(directoryTests, _filetest);

			assert.strictEqual("string", typeof fs.readFileSync(_filetest, "utf8"), "test files cannot be concatened");
			assert.strictEqual("", fs.readFileSync(_filetest, "utf8"), "test files cannot be concatened");

		});

	});

	describe("async", () => {

		before(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });
		after(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });

		it("should check invalid value", (done) => {

			fs.directoryFilesToFile(false, false, (err) => {

				assert.notStrictEqual(null, err, "check invalid value does not generate an error");

				fs.directoryFilesToFile(directoryTests, false, (err) => {
					assert.notStrictEqual(null, err, "check invalid value does not generate an error");
					done();
				});

			});

		});

		it("should concat nothing", (done) => {

			fs.directoryFilesToFile(directoryTests, _filetest, (err) => {

				assert.strictEqual("This directory does not exist", err, "not existing directory cannot be concatened");
				done();

			});

		});

		it("should concat test files", (done) => {

			fs.mkdirpProm(directoryTests).then(() => {
				return fs.writeFile(test1, "");
			}).then(() => {

				fs.directoryFilesToFile(directoryTests, _filetest, (err) => {

					assert.strictEqual(null, err, "concat test files generate an error");
					assert.strictEqual("string", typeof fs.readFileSync(_filetest, "utf8"), "test files cannot be concatened");
					done();

				});

			}).catch(done);

		});

	});

	describe("promise", () => {

		before(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });
		after(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });

		it("should check invalid value", (done) => {

			fs.directoryFilesToFileProm(false, false).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");

				fs.directoryFilesToFileProm(directoryTests, false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
					done();
				});

			});

		});

		it("should concat nothing", (done) => {

			fs.directoryFilesToFileProm(directoryTests, test1).then(() => {
				done("should concat nothing does not generate an error");
			}).catch((err) => {
				assert.strictEqual("string", typeof err, "should concat nothing does not generate a valid error");
				done();
			});

		});

		it("should concat test one file", () => {

			return fs.mkdirpProm(directoryTests).then(() => {
				return fs.writeFileProm(test1, "test");
			}).then(() => {
				return fs.directoryFilesToFileProm(directoryTests, _filetest, "<>");
			}).then(() => {
				return fs.readFileProm(_filetest, "utf8");
			}).then((data) => {
				assert.strictEqual("test", data, "test files cannot be concatened");
			});

		});

		it("should concat test all files", () => {

			fs.mkdirpProm(directoryTests).then(() => {
				return fs.writeFileProm(test2, "test");
			}).then(() => {
				return fs.directoryFilesToFileProm(directoryTests, _filetest, "utf8", "<>");
			}).then((data) => {

				assert.strictEqual("string", typeof data, "test files cannot be concatened");
				assert.strictEqual("test<>test", data, "test files cannot be concatened");

			});

		});

	});

});*/
