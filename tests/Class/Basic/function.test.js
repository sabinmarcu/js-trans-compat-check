/*global describe it beforeEach*/

'use strict';

var expect = require('chai').expect;
var klasses = {
    "es6": require("./es6.class"),
    "coffee": require("./coffee.class"),
    "livescript": require("./livescript.class")
};

var makeTest = function(klass, type) {
    describe("Basic Class Function (type: " + klass.type + ")", function() {
        it("#type should be correct", function() {
            expect(klass.type).to.equal(type);
        });
        describe("singleton", function() {
            var x = klass.getInstance(), y = klass.getInstance();
            it("should have the same uuid", function() {
                expect(x.uuid).to.equal(y.uuid);
            });
            it("should have the same object", function() {
                expect(x).to.equal(y);
            });
        });
        describe("instances", function() {
            var x;
            beforeEach(function() {
                x = new klass();
            });

            describe("#truth", function() {
                it("should have the proper truth values (prop)", function() {
                    expect(x._truth).to.equal(42);
                    x._truth = 25;
                    expect(x._truth).to.equal(25);
                });
                it("should have the proper getter (define)", function() {
                    expect(x.truth).to.equal(42);
                });
                it("should have the proper setter (define)", function() {
                    expect(x.truth).to.equal(42);
                    x.truth = 25;
                    expect(x.truth).to.equal(25);
                });
            });

            describe("#myValue", function() {
                it("should have the proper truth values (prop)", function() {
                    expect(x.myvalue).to.equal(100);
                    x.myvalue = 25;
                    expect(x.myvalue).to.equal(25);
                });
                it("should have the proper truth values (methods)", function() {
                    expect(x.getMyValue()).to.equal(100);
                    x.setMyValue(25);
                    expect(x.getMyValue()).to.equal(25);
                });
            });
        });
    });
};

for (let type in klasses) {
    makeTest(klasses[type], type);
}

export default makeTest;
